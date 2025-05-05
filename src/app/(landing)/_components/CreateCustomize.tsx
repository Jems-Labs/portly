"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

function CreateCustomize() {
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
            src="/profile-ss.png"
            alt="Portly Profile Screenshot"
            width={600}
            height={400}
            className="rounded-2xl shadow-xl w-full h-auto"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold font-manrope">
            Create and customize your Portly in minutes
          </h2>
          <p className="text-muted-foreground text-lg font-manrope">
            Portly is built for creators and founders who want more than a basic link list.
            Showcase your story, build your brand, and make every link count.
          </p>
         
            <Button className="h-12 px-6 text-base"> <Link href={'/signup'}>Get started for free</Link></Button>
          
        </motion.div>

      </div>
    </section>
  );
}

export default CreateCustomize;
