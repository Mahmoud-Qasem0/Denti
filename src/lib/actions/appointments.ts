"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        doctor: { select: { name: true, imageUrl: true } },
        user: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return appointments;
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

    const allUserAppointments = appointments.map((appointment) => {
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
    return allUserAppointments;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching user appointments:", error);
      // throw Error(error instanceof Error ? error.message : String(error));
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
