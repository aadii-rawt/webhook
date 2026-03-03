"use client"
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* <Header /> */}

      {/* hero section */}
      <div className="flex flex-col items-center justify-center py-16 w-full min-h-screen">
        <h2 className="text-5xl font-semibold mb-4 font-ubuntu">Capture every webhook in real time.</h2>
        <p className="text-lg text-center max-w-2xl font-google-sans">
          WebHook is a powerful tool for managing your webhooks with ease.
        </p>
       <Link href={"webhook"} className="bg-[#EB3678] cursor-pointer font-medium px-4 py-2 rounded-3xl my-8">Create Webhook</Link>
      </div>
    </div>
  );
}
