"use server";
import { INewDoctor } from "@/components/admin/AddDoctorDialog";
import { prisma } from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const getDoctors = async () => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: { Appointment: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.Appointment,
    }));
  } catch (error) {
    console.log("Error in fetct doctors", error);
    throw Error("Failed to fetct doctors");
  }
};

export const createDoctor = async (input: INewDoctor) => {
  try {
    if (!input.name || !input.email)
      throw new Error("Name and Email is required");

    const doctor = await prisma.doctor.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender),
      },
    });
    revalidatePath("/admin");
    return doctor;
  } catch (error) {
    console.log("Error in create new doctor", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "p2002")
        throw new Error("A Doctor with this Email already exists");
    }

    throw new Error("Failed to create new doctor");
  }
};

interface IUpdateDoctorInput extends Partial<INewDoctor> {
  id: string;
}

export const updateDoctor = async (input: IUpdateDoctorInput) => {
  try {
    // validate
    if (!input.name || !input.email)
      throw new Error("Name and email are Required");

    const currentDoctor = await prisma.doctor.findUnique({
      where: { id: input.id },
      select: { email: true },
    });

    if (!currentDoctor) throw new Error("Doctor Not Found");

    // if email is changing, check if new email already exists
    if (input.email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: input.email },
      });

      if (existingDoctor)
        throw new Error("Doctor with this email is already exists in system");
    }

    const doctor = await prisma.doctor.update({
      where: {
        id: input.id,
      },
      data: {
        // ...input
        name: input.name,
        email: input.email,
        phone: input.phone,
        speciality: input.speciality,
        gender: input.gender,
        isActive: input.isActive,
      },
    });
    return doctor;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "p2025")
        throw new Error("Failed to Update Doctor: Doctor not Found");

      throw new Error("Failed to Update Doctor");
    }
  }
};
export const getAvailableDoctors = async () => {
  try {
    const availableDoctors = await prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { Appointment: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return availableDoctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.Appointment,
    }));
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "p2025") throw new Error(error.message);

      throw new Error("Failed to Fetching Available Doctors");
    }
  }
};
