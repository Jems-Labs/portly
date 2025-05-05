import React from "react";
import Hero from "./_components/Hero";
import { Separator } from "@/components/ui/separator";
import CreateCustomize from "./_components/CreateCustomize";
import CardSection from "./_components/CardSection";
import AnalyticsSection from "./_components/AnalyticsSection";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Separator />
      <CreateCustomize />
      <Separator />
      <CardSection />
      <Separator />
      <AnalyticsSection />
    </div>
  );
}

export default Landing;
