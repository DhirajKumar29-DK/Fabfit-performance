"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/dummy";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const [heroSlides, setHeroSlides] = useState(homeData.heroSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch dynamic heroes from backend
    const fetchHeroes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/heroes`);
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          // Filter for active ones and sort by displayOrder
          const activeHeroes = result.data
            .filter((h: any) => h.status === 'ACTIVE')
            .sort((a: any, b: any) => {
              const orderA = typeof a.displayOrder === 'number' ? a.displayOrder : Number(a.displayOrder || 0);
              const orderB = typeof b.displayOrder === 'number' ? b.displayOrder : Number(b.displayOrder || 0);
              return orderA - orderB;
            });

          if (activeHeroes.length > 0) {
            // Map backend schema to frontend format
            const dynamicSlides = activeHeroes.map((h: any) => ({
              id: h.id,
              badge: h.badge || '',
              headingLine1: h.title,
              headingLine2: h.subtitle,
              description: h.description,
              primaryCTA: h.primaryButtonText,
              secondaryCTA: h.secondaryButtonText,
              src: h.backgroundImage,
              type: "image" // Backend currently only supports images
            }));

            setHeroSlides(dynamicSlides);
          }
        }
      } catch (error) {
        console.error("Failed to fetch dynamic heroes, falling back to static dummy data", error);
      }
    };

    fetchHeroes();
  }, []);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 4000); // 4 seconds for a relaxed pace

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const slide = heroSlides[currentSlide];

  // If somehow no slide exists, don't break the page
  if (!slide) return null;

  return (
    <section id="home" className="relative h-[90vh] min-h-[650px] max-h-[900px] flex items-center bg-[#070709] overflow-hidden">

      {/* Dynamic Backgrounds (Images & Videos) */}
      <AnimatePresence>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-full relative">
            {slide.type === "video" ? (
              <>
                <video
                  src={slide.src || undefined}
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-40 brightness-[0.4]"
                />
                <video
                  src={slide.src || undefined}
                  autoPlay muted loop playsInline
                  className="relative w-full h-full object-contain object-center z-10 brightness-[0.8]"
                />
              </>
            ) : (
              <>
                <img
                  src={slide.src || undefined}
                  alt="Hero Slide Background"
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30 brightness-[0.3]"
                />
                <img
                  src={slide.src || undefined}
                  alt="Hero Slide"
                  className="relative w-full h-full object-contain object-center z-10 brightness-[0.85] drop-shadow-2xl"
                />
              </>
            )}

            {/* Extra gradient overlays for vertical blending and text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30 z-10" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="container relative z-20 mx-auto px-4 md:px-8">
        <div className="max-w-2xl relative h-[400px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-0 w-full"
            >
              {/* Eyebrow */}
              <div className="text-primary text-sm font-bold tracking-widest mb-4">
                {slide.badge}
              </div>

              {/* Headings */}
              <h1 className="font-heading text-5xl md:text-7xl lg:text-[80px] font-black text-white leading-[1.05] mb-6">
                {slide.headingLine1} <br />
                <span className="text-primary">{slide.headingLine2}</span>
              </h1>

              {/* Description */}
              <p className="text-zinc-300 text-lg md:text-xl mb-10 leading-relaxed max-w-lg font-medium">
                {slide.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/assessment"
                  target="_blank"
                  className="group inline-flex items-center justify-center h-12 px-8 bg-primary text-black font-bold tracking-wide transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] rounded-[4px]"
                >
                  {slide.primaryCTA}
                  <ArrowRight className="ml-2 h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/#programs"
                  className="inline-flex items-center justify-center h-12 px-8 border border-zinc-600 text-white font-bold tracking-wide transition-all hover:bg-white/10 hover:border-white rounded-[4px]"
                >
                  {slide.secondaryCTA}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 w-full z-20">
        <div className="container mx-auto px-4 md:px-8 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${index === currentSlide ? "w-12 bg-primary" : "w-6 bg-white/20 hover:bg-white/40"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
