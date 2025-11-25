import ActivityOverview from "@/components/dashboard/ActivityOverview";
import DentalHealthOverview from "@/components/dashboard/DentalHealthOverview";
import MainActions from "@/components/dashboard/MainActions";
import ToothIcon from "@/components/dashboard/ToothIcon";
import Navbar from "@/components/Navbar";
import WelcomeSection from "@/components/WelcomeSection";
import { currentUser } from "@clerk/nextjs/server";
import { FC } from "react";

const DashboardPage: FC = async () => {
  const user = await currentUser();
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection
          badge="Online & Ready"
          desc="Your personal AI dental assistant is ready to help you maintain perfect oral health."
          icon={<ToothIcon />}
          title={`Good
            ${
              new Date().getHours() < 12
                ? "morning"
                : new Date().getHours() < 18
                ? "afternoon"
                : "evening"
            }
            , ${user?.firstName}!`}
        />
        <MainActions />
        <ActivityOverview />
      </div>
    </>
  );
};

export default DashboardPage;
