"use server";

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
