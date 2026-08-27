import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { About } from "@/components/home/About";
import { Coaches } from "@/components/home/Coaches";
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
      <Transformations />
      <ClientTestimonials />
      <Membership />
      <GalleryPreview />
      <Contact />
    </div>
  );
}
