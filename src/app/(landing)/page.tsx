import Navbar from "@/components/Navbar";
import React from "react";
import Hero from "./_components/Hero";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero />
      <div></div>
    </div>
  );
}

export default Landing;
