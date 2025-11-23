import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";
import AdminDashboardClient from "./AdminDashboardClient";

const AdminPage: FC = async () => {
  const user = await currentUser();

  // user is not logged in
  if (!user) redirect("/");

  const adminEmail = process.env.ADMIN_EMAIL;

  const userEmail = user.emailAddresses[0]?.emailAddress;
  console.log(adminEmail)

  // user is not the admin
  if (
    typeof adminEmail === "undefined" ||
    !adminEmail ||
    userEmail !== adminEmail
  ) {
    redirect("/dashboard");
  }

  return <AdminDashboardClient />;
};

export default AdminPage;
