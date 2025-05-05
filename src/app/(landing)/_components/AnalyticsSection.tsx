"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function AnalyticsSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <motion.div
          className="w-full md:w-1/2 border-2 rounded-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/analytics-ss.png"
            alt="Portly Analytics Dashboard"
            width={600}
            height={400}
            className="rounded-2xl shadow-xl w-full h-auto"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold font-manrope">
            Understand your reach with powerful analytics
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-manrope">
            Portly tracks what matters: profile views, project clicks, and social link engagement.
            Know exactly what your audience cares about and optimize your portfolio to drive more interaction.
          </p>
          <Button className="h-12 px-6 text-base"> <Link href={'/signup'}>Get started for free</Link></Button>
        </motion.div>

      </div>
    </section>
  );
}

export default AnalyticsSection;
