"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { AppointmentStatus } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformAppointment = (appointment: any) => {
  return {
    ...appointment,
    patientName: `${appointment.user.firstName || ""} ${
      appointment.user.lastName || ""
    }`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date.toISOString().split("T")[0],
  };
};

export async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        doctor: { select: { name: true, imageUrl: true } },
        user: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return appointments.map(transformAppointment);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching appointments");
    }
  }
}

export async function getUserAppointments() {
  try {
    // get authenticated user from Clerk
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in to view appointments");

    // find user by clerkId from authenticated session
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user)
      throw new Error(
        "User not found. Please ensure your account is properly set up."
      );

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
      },
      include: {
        doctor: { select: { name: true, imageUrl: true } },
        user: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    const allUserAppointment = appointments.map((appointment) => {
      return {
        ...appointment,
        patientName: `${appointment.user.firstName || ""} ${
          appointment.user.lastName || ""
        }`.trim(),
        patientEmail: appointment.user.email,
        doctorName: appointment.doctor.name,
        doctorImageUrl: appointment.doctor.imageUrl || "",
        date: appointment.date.toISOString().split("T")[0],
      };
    });

    return allUserAppointment;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching user appointments:", error);
      return [];
    }
  }
}

export async function getUserAppointmentStats() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in");

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) throw new Error("User not found");

    // these calls will run in parallel, instead of waiting each other
    const [totalCount, completedCount] = await Promise.all([
      prisma.appointment.count({
        where: { userId: user.id },
      }),
      prisma.appointment.count({
        where: {
          userId: user.id,
          status: "COMPLETED",
        },
      }),
    ]);
    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching user appointments");
      return { totalAppointments: 0, completedAppointments: 0 };
    }
  }
}

export async function getBookedTimeSlots(dentistId: string, date: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: dentistId,
        date: new Date(date),
        status: {
          in: ["COMPLETED", "CONFIRMED"],
        },
      },
      select: { time: true },
    });

    return appointments.map((appointment) => appointment.time);
  } catch (error) {
    console.log("error Fetching Booked Time Slots", error);
    return [];
  }
}

interface BookAppointmentInput {
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}
export async function bookAppointment(input: BookAppointmentInput) {
  try {
    const { userId } = await auth();

    console.log("Authenticated userId:", userId);
    if (!userId)
      throw new Error("You must be logged in to book an appointment");

    if (!input.doctorId || !input.date || !input.time) {
      throw new Error("Doctor, date, and time are required");
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    console.log("User found in DB:", user);
    console.log("User found in DB:", user);
    if (!user)
      throw new Error(
        "User not found. Please ensure your account is properly set up."
      );

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId: input.doctorId,
        date: new Date(input.date),
        time: input.time,
        reason: input.reason || "General consultation",
        status: "CONFIRMED",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
    });

    return transformAppointment(appointment);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Full error details:", error);
      throw new Error(error.message);
    }
  }
}

export async function updateAppointmentStatus(input: {
  id: string;
  status: AppointmentStatus;
}) {
  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: input.id,
      },
      data: { status: input.status },
    });

    return appointment;
  } catch (error) {
    console.error("Error Updating Appointment:", error);
    throw new Error(`Failed to Update Appointment: ${error}`);
  }
}
