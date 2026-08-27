import Link from "next/link";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="FabFit Logo" className="h-16 md:h-20 w-auto object-contain" />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Built on strength, refined by science. The premium destination for elite fitness and recovery.
            </p>
          </div>

          {/* Visit */}
          <div>
            <h4 className="font-heading font-bold text-text-primary mb-4">Visit</h4>
            <address className="not-italic text-text-secondary text-sm space-y-1">
              <p>62C, 6th Floor, Supermart 1</p>
              <p>DLF Phase-4, Gurgaon</p>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading font-bold text-text-primary mb-4">Hours</h4>
            <div className="text-text-secondary text-sm space-y-1">
              <p>Mon – Sat · 6:00 – 22:00</p>
              <p>Sunday · 7:00 – 12:00</p>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-bold text-text-primary mb-4">Connect</h4>
            <div className="text-text-secondary text-sm flex flex-col gap-2">
              <a href="tel:+919220393004" className="hover:text-primary transition-colors">+91 92203 93004</a>
              <a href="#" className="hover:text-primary transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-primary transition-colors">@eliteperformance</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p>© {new Date().getFullYear()} Elite Performance. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
