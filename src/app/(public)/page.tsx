import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { About } from "@/components/home/About";
import { Coaches } from "@/components/home/Coaches";
import { Trainers } from "@/components/home/Trainers";
import { Services } from "@/components/home/Services";
import { Programs } from "@/components/home/Programs";
import { Transformations } from "@/components/home/Transformations";
import { ClientTestimonials } from "@/components/home/ClientTestimonials";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Membership } from "@/components/home/Membership";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Stats />
      <About />
      <Programs />
      <Services />
      <Coaches />
      <Trainers />
      <Transformations />
      <ClientTestimonials />
      <Membership />
      <GalleryPreview />
      <Contact />
    </div>
  );
}
