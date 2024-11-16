import React from "react";
import Link from 'next/link';
import { h1, main } from "framer-motion/client";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle ,Video ,ClipboardPlus,BriefcaseMedical} from "lucide-react";


export default function Conditions () {
    return (
        <main>
            <header className="mb-12 flex justify-between items-center">
            <div className="text-6xl font-semibold">
            Smart <span className="text-blue-500">Ambulance</span>
          </div>
        <div className="w-8 h-8 bg-white flex items-center justify-center">
          <Link href={"/condition"} className="bg-white">
            <Button variant="ghost" size="icon" className="bg-white">
              <ArrowLeftCircle className="h-24 w-24 bg-white text-blue-500 rounded-full" />
              <span className="sr-only">Go back</span>
            </Button>
          </Link>
        </div>
      </header>

            <h1 className="text-6xl text-black text-center mt-20 font-bold">Condition?</h1>
            <h3 className="text-3xl text-black text-center mt-8 font-light">Select the patient condition</h3>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-12 px-10 mt-28">
            <div>
                <Link href="/camera-feed">
                <div className="bg-red-600 h-96 rounded-xl text-center py-24 font-semibold text-white">
                    <Video className="mx-auto h-28 w-28"/>
                    <h3 className="text-5xl pt-16">Camera</h3>
                </div>
                </Link>
            </div>

            <div className="  ">
                <Link href="/medical-interface">
                <div className="bg-yellow-500 h-96 rounded-xl text-center py-24 font-semibold text-white">
                    <ClipboardPlus className="mx-auto h-32 w-32"/>
                    <h3 className="text-5xl pt-16">Status Repost</h3>
                </div>
                </Link>
            </div>

            <div>
                <Link href="/#">
                <div className="bg-green-500 h-96 rounded-xl text-center py-24 font-semibold text-white">
                    <BriefcaseMedical className="mx-auto h-28 w-28"/>
                    <h3 className="text-5xl pt-16">Record Patient Data</h3>
                </div>
                </Link>
            </div>
        </div>
        </main>
    );
}