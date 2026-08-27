import Image from "next/image";
import { Check, Trophy, Users, Shield, TrendingUp, Lock, Mountain } from "lucide-react";
import Link from "next/link";

export function AssessmentSidebar() {
  return (
    <div className="w-full lg:w-[25vw] bg-[#0c0c0c] flex flex-col h-full relative overflow-hidden border-r border-white/5">
      {/* Top Logo */}
      <div className="p-6 pb-2 relative z-10">
        <Link href="/" className="flex items-center gap-3 group w-fit">
          <img src="/logo.png" alt="Fab Fit Performance Logo" className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
        </Link>
      </div>

      <div className="px-6 pb-6 flex-1 flex flex-col relative z-10">
        {/* Headings */}
        <div className="mt-2 mb-4">
          <h1 className="font-heading font-black text-2xl xl:text-3xl text-white uppercase leading-[0.95] tracking-tight">
            Online Coaching
            <br />
            <span className="text-primary">Application</span>
          </h1>
        </div>

        {/* Text descriptions */}
        <div className="space-y-3 text-zinc-400 text-xs xl:text-sm leading-relaxed max-w-sm mb-4">
          <p>
            With over 15 years of experience in health and fitness, I&apos;m here to help you achieve sustainable and long-lasting results.
          </p>
          <p>
            Please fill out this application so I can understand you better and create the perfect plan for your goals.
          </p>
        </div>

        {/* Coach Image (Absolute positioned behind some elements or relative) */}
        <div className="relative -mx-6 -my-6 h-[200px] xl:h-[260px] overflow-hidden pointer-events-none flex justify-center mt-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent z-10" />
          {/* Using public image, adjust path if needed */}
          <img 
            src="/coach-dhiraj.png" 
            alt="Coach" 
            className="w-auto h-full object-contain opacity-80"
          />
        </div>

        {/* Why this step card */}
        <div className="mt-auto relative z-20">
          <div className="bg-[#151515] border border-white/10 rounded-xl p-4 mb-4">
            <div className="flex gap-3">
              <div className="mt-0.5">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-primary font-bold text-xs tracking-wide uppercase mb-1">Why this step?</h3>
                <p className="text-zinc-400 text-[10px] xl:text-xs leading-relaxed">
                  The more accurate your information, the better and more personalized your program will be.
                </p>
              </div>
            </div>
          </div>

          {/* Stats icons */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="flex flex-col items-center text-center gap-1.5">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-primary">
                <Trophy className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[9px] font-bold">15+</span>
                <span className="text-zinc-500 text-[7px] uppercase leading-tight">Years Exp</span>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-primary">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[9px] font-bold">1000+</span>
                <span className="text-zinc-500 text-[7px] uppercase leading-tight">Clients</span>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-primary">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[9px] font-bold">Science</span>
                <span className="text-zinc-500 text-[7px] uppercase leading-tight">Based</span>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-primary">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[9px] font-bold">Result</span>
                <span className="text-zinc-500 text-[7px] uppercase leading-tight">Driven</span>
              </div>
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-center gap-2 text-zinc-500 text-[10px] xl:text-xs">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <p>Your information is 100% secure and will never be shared.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
