// app/page.tsx
// SERVER COMPONENT - no "use client"

import HeroDescriptionsSection from "@/components/landing/hero-descriptions-section";
import HeroSection from "@/components/landing/hero-section";
import ImageTabs from "@/components/landing/image-tabs";
import { LandingAuthProvider } from "@/components/landing/landing-auth-provider";
import LandingScrollManager from "@/components/landing/landing-scroll-manager";
import SignUpSectionGate from "@/components/landing/sign-up-section-gate";

export default function Home() {
  return (
    <div className="flex flex-col">
      <LandingScrollManager />
      <main className="flex-1">
        <LandingAuthProvider>
          <HeroSection />
          {/* Hero Image Section with Tabs */}
          <ImageTabs />
          {/* Hero Descriptions Section*/}
          <HeroDescriptionsSection />
          {/* Sign Up Section */}
          <SignUpSectionGate />
        </LandingAuthProvider>
      </main>
    </div>
  );
}
