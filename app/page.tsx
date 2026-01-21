import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { FloatingEyes } from '@/components/animations/FloatingEyes';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Videos } from '@/components/sections/Videos';
import { Reviews } from '@/components/sections/Reviews';
import { FAQ } from '@/components/sections/FAQ';
import { Location } from '@/components/sections/Location';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      {/* Floating Eyes Background Effect */}
      <FloatingEyes />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Services />
        <Videos />
        <Reviews />
        <FAQ />
        <Location />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating CTA Buttons */}
      <FloatingCTA />
    </>
  );
}
