import React from "react";
import Link from "next/link";
import Navbar from "../Navbar";
import WelcomeSection from "../WelcomeSection";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { CrownIcon, LockIcon, MicIcon } from "lucide-react";

const ProPlanRequired = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Access Denied Section */}
        <WelcomeSection
          badge="Pro Feature"
          badgeIcon={<LockIcon className="w-4 h-4 text-primary" />}
          title="Voice Assistant Access Required"
          desc="Upgrade to AI Pro or AI Basic to unlock unlimited voice
                    consultations with our AI dental assistant."
          icon={<MicIcon className="w-16 h-16 text-primary" />}
        />

        {/* Upgrade Card */}
        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 max-w-2xl mx-auto">
          <CardContent className="relative p-8 text-center">
            <div className="w-20 h-20 bg-linear-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <LockIcon className="w-10 h-10 text-primary" />
            </div>

            <h3 className="text-2xl font-bold mb-4">Upgrade Required</h3>
            <p className="text-muted-foreground mb-6">
              The voice assistant feature is available to AI Pro and AI Basic
              subscribers. Get instant dental advice through natural voice
              conversations.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">24/7 voice consultations</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Professional dental guidance</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Instant pain relief advice</span>
              </div>
            </div>

            <Link href="/pro">
              <Button className="w-full bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CrownIcon className="mr-2 h-5 w-5" />
                Upgrade to Pro
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProPlanRequired;
