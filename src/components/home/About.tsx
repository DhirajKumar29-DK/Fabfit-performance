"use client";

import { homeData } from "@/data/dummy";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 1, ease: "easeOut" as const }
  },
};

export function About() {
  const { intro } = homeData;

  return (
    <section id="about" className="py-12 md:py-16 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-primary text-[13px] font-black tracking-widest uppercase mb-6">
              {intro.badge}
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="font-heading text-5xl md:text-6xl lg:text-[72px] font-black text-white leading-[0.95] tracking-tight uppercase mb-8">
              {intro.headingLine1} <br />
              <span className="text-primary">{intro.headingLine2}</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-medium">
              {intro.description}
            </motion.p>

            {/* Checklist */}
            <motion.ul variants={containerVariants} className="space-y-4 mb-12">
              {intro.checklist.map((item, i) => (
                <motion.li variants={itemVariants} key={i} className="flex items-center gap-4 text-white text-lg font-bold">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-black">
                    <Check className="w-4 h-4 stroke-[4]" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants}>
              <Link
                href="/#about"
                className="group inline-flex items-center justify-center h-14 px-10 bg-primary text-black text-sm font-black tracking-wide uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(var(--primary-rgb),0.25)] hover:bg-white rounded-[4px]"
              >
                {intro.cta}
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Images (3 image bento grid) */}
          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Dotted Pattern Background */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              transition={{ duration: 1.5 }}
              className="absolute -top-10 -right-10 w-40 h-40 text-primary pointer-events-none" 
              style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '20px 20px' }} 
            />
            
            <div className="relative grid grid-cols-2 gap-4 h-[600px] z-10">
              {/* Main Tall Image */}
              <motion.div variants={imageVariants} className="col-span-1 h-full rounded-sm overflow-hidden relative group shadow-2xl shadow-black/20">
                <img 
                  src={intro.images[0]} 
                  alt="Gym Facility" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              {/* Right column stacked images */}
              <div className="col-span-1 flex flex-col gap-4 h-full">
                <motion.div variants={imageVariants} className="flex-1 rounded-sm overflow-hidden relative group shadow-xl shadow-black/15">
                  <img 
                    src={intro.images[1]} 
                    alt="Training" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                <motion.div variants={imageVariants} className="flex-1 rounded-sm overflow-hidden relative group shadow-xl shadow-black/15">
                  <img 
                    src={intro.images[2]} 
                    alt="Pushing Sled" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
