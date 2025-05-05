"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

function CardSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">


        <motion.div
          className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold font-manrope">
            Share your card anywhere
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-manrope">
            Instantly generate a beautiful shareable card with your photo, role, QR code,
            and your Portly link — perfect for events, resumes, or sharing offline.
          </p>

          <Button className="h-12 px-6 text-base"> <Link href={'/signup'}>Get started for free</Link></Button>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 border-2 rounded-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image
            src="/card-ss.png"
            alt="Downloadable Portly Card"
            width={600}
            height={400}
            className="rounded-2xl shadow-xl w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default CardSection;
