import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { VisitorTracker } from "@/components/VisitorTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata = {
  title: "Premium Performance",
  description: "Elite Fitness and Performance Coaching",
};

import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`ui-theme ${inter.variable} ${archivo.variable} antialiased flex flex-col min-h-screen`}>
        <VisitorTracker />
        <SmoothScroll>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
