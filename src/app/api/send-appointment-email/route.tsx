import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";
import resend from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price,
    } = body;

    // validate Required Fields
    if (!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
      return NextResponse.json(
        { error: "Missing Required Fields" },
        { status: 400 }
      );
    }

    //send Email
    const { data, error } = await resend.emails.send({
      from: "Denti <onboarding@resend.dev>",
      to: [userEmail],
      subject: "Appointment Confirmation - Denti",
      react: (
        <AppointmentConfirmationEmail
          doctorName={doctorName}
          appointmentDate={appointmentDate}
          appointmentTime={appointmentTime}
          appointmentType={appointmentType}
          duration={duration}
          price={price}
        />
      ),
    });

    if (error) {
      console.log("Resend Error", error);
    return NextResponse.json({ error: "Failed to send Email" }, { status: 500 });
    }

    return NextResponse.json({
      message: "Email Sent Successfully",
      emailId: data?.id,
    });
  } catch (error) {
    console.log("Email Sending Error", error);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}

