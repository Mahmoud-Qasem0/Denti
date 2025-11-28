import { Resend } from "resend";

// if (typeof process.env.RESEND_API_KEY === "string") {

// }

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;
