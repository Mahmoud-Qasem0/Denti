import Navbar from "@/components/Navbar";
import FeaturedCards from "@/components/voice/FeaturedCards";
import ProPlanRequired from "@/components/voice/ProPlanRequired";
import VapiWedgit from "@/components/voice/VapiWedgit";
import WelcomeSection from "@/components/WelcomeSection";
import { auth } from "@clerk/nextjs/server";
import { MicIcon } from "lucide-react";
import { FC } from "react";

const voicePage: FC = async () => {
  const { has } = await auth();

  const hasProPlan = has({ plan: "ai_pro" }) || has({ plan: "ai_basic" });

  if (!hasProPlan) return <ProPlanRequired />;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-24 py-8 px-6">
        <WelcomeSection
          title="AI Voice Assistant"
          desc="Talk to your AI dental assistant using natural voice commands. Get instant advice and
            professional guidance."
          badge="Voice Assistant Ready"
          icon={<MicIcon className="w-16 h-16 text-primary" />}
        />
        <FeaturedCards />
      </div>
      <VapiWedgit />
    </div>
  );
};

export default voicePage;
