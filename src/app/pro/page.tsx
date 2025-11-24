import Navbar from "@/components/Navbar";
import WelcomeSection from "@/components/WelcomeSection";
import { PricingTable } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { CrownIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { FC } from "react";

const ProPage: FC = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return (
    <>
      <Navbar />
      <div className="py-8 pt-24 max-w-7xl mx-auto px-6">
        <WelcomeSection
          title="Unlock Premium AI Dental Care"
          desc="Get unlimited AI consultations, advanced features, and priority support to take your dental health to the next level."
          badge="Upgrade to Pro"
          icon={<CrownIcon className="w-16 h-16 text-primary" />}
        />

        {/* Pricing section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your dental care needs. All plans
              include secure access and bank-level encryption.
            </p>
          </div>

          <PricingTable />
        </div>
      </div>
    </>
  );
};

export default ProPage;
