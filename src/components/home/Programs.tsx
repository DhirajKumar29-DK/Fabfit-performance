"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { homeData } from "@/data/dummy";

// --- SVG Icons ---
// Main Cards
const BodyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M19.07 9.5a1 1 0 0 0-1.41-1.41L15 10.75V8a6 6 0 0 0-6-6v0a6 6 0 0 0-6 6v2.75l-2.66-2.66a1 1 0 0 0-1.41 1.41L3 13.5v5a2 2 0 0 0 2 2h2"/><path d="M17 20.5h2a2 2 0 0 0 2-2v-5l4.07-4.07a1 1 0 0 0 0-1.42Z"/></svg>;
const DumbbellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14.4 14.4-4.8-4.8"/><path d="M6 12 12 6"/><path d="M14.4 14.4 12 16.8l-4.8-4.8 2.4-2.4"/><path d="m16.8 12-4.8-4.8 2.4-2.4 4.8 4.8z"/><path d="m18 15.6 2.4-2.4"/><path d="m3.6 8.4 2.4-2.4"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const LaptopIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>;

// Stage Prep Features
const ClipboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14h6"/><path d="M9 10h6"/></svg>;
const UtensilsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>;
const FigureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 10v12"/><path d="M12 14c2.5 0 5-1.5 6-3.5"/><path d="M12 14c-2.5 0-5-1.5-6-3.5"/><path d="M12 4c2.5 0 5 1.5 6 3.5"/><path d="M12 4c-2.5 0-5 1.5-6 3.5"/></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;

// Footer Features
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const UserCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>;
const BarChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>;
const MessageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const AwardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;

const getIcon = (type: string) => {
  switch (type) {
    case 'body': return <BodyIcon />;
    case 'dumbbell': return <DumbbellIcon />;
    case 'user': return <UserIcon />;
    case 'laptop': return <LaptopIcon />;
    case 'clipboard': return <ClipboardIcon />;
    case 'utensils': return <UtensilsIcon />;
    case 'figure': return <FigureIcon />;
    case 'calendar': return <CalendarIcon />;
    case 'target': return <TargetIcon />;
    case 'user-check': return <UserCheckIcon />;
    case 'bar-chart': return <BarChartIcon />;
    case 'message': return <MessageIcon />;
    case 'award': return <AwardIcon />;
    default: return <UserIcon />;
  }
};

export function Programs() {
  const { programs } = homeData;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section ref={sectionRef} id="programs" className="bg-[#050505] relative overflow-hidden py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        
        {/* Header Block */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-8 h-[1px] bg-primary/40"></div>
            <span className="text-primary font-bold text-[10px] tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]">
              {programs.badge}
            </span>
            <div className="w-8 h-[1px] bg-primary/40"></div>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black leading-tight uppercase tracking-tighter mb-3">
            <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">{programs.headingLine1}</span> <br/>
            <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">{programs.headingLine2}</span> <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">{programs.headingLine3}</span>
          </h2>
          
          <p className="text-zinc-400 text-[13px] md:text-sm font-medium max-w-xl mx-auto leading-relaxed">
            {programs.subHeader}
          </p>
        </motion.div>

        {/* 4-Card Grid Block */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {programs.mainCards.map((card) => (
            <motion.div 
              key={card.id}
              variants={itemVariants}
              className="bg-[#0a0a0a] border border-zinc-800/60 rounded-xl overflow-hidden flex flex-col group hover:border-primary/50 transition-colors duration-500"
            >
              <div className="relative h-[320px] w-full overflow-hidden">
                <img src={card.image} alt={card.titleLine1} className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]"></div>
                
                {/* Neon Icon Circle */}
                <div className="absolute top-6 left-6 w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:bg-primary group-hover:text-black transition-colors duration-500 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
                  {getIcon(card.iconType)}
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col pt-0 z-10 -mt-6">
                <h3 className="font-black text-2xl tracking-tighter uppercase leading-none mb-3">
                  <span className="block text-white mb-1">{card.titleLine1}</span>
                  <span className="block text-primary">{card.titleLine2}</span>
                </h3>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed flex-1">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Wide Competition Prep Card Block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-[#0a0a0a] border border-zinc-800/60 hover:border-primary/50 transition-colors duration-500 rounded-xl overflow-hidden flex flex-col lg:flex-row mb-8 group"
        >
          {/* Left Image */}
          <div className="relative w-full lg:w-[40%] h-64 lg:h-auto">
            <img src={programs.stagePrep.image} alt={programs.stagePrep.titleLine1} className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] hidden lg:block"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] block lg:hidden"></div>
            
            <div className="absolute top-6 left-6 w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:bg-primary group-hover:text-black transition-colors duration-500 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
              <AwardIcon />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[60%] p-8 lg:p-12 flex flex-col justify-center relative z-10 lg:-ml-12">
            <h3 className="font-black text-3xl md:text-4xl tracking-tighter uppercase mb-4">
              <span className="text-white">{programs.stagePrep.titleLine1} </span>
              <span className="text-primary">{programs.stagePrep.titleLine2}</span>
            </h3>
            <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-2xl mb-8">
              {programs.stagePrep.description}
            </p>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {programs.stagePrep.features.map((feature: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                      {getIcon(feature.iconType)}
                    </div>
                    <span className="text-zinc-300 font-bold text-[10px] uppercase leading-tight">
                      <span className="block">{feature.text1}</span>
                      <span className="block">{feature.text2}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Features Strip Block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-[#0a0a0a] border border-zinc-800/60 rounded-xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {programs.footerFeatures.map((feat) => (
              <div key={feat.id} className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-center lg:items-start xl:items-center gap-4 group cursor-pointer text-center md:text-left lg:text-center xl:text-left">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-primary group-hover:border-primary group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
                  {getIcon(feat.iconType)}
                </div>
                <div>
                  <h4 className="text-white font-black text-[11px] tracking-widest uppercase mb-1 group-hover:text-primary transition-colors">{feat.title}</h4>
                  <p className="text-zinc-500 text-[10px] font-medium leading-relaxed max-w-[160px] mx-auto xl:mx-0">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
