import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Process from '@/components/Process';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import ContactCTA from '@/components/ContactCTA';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import StarField from '@/components/StarField';

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <StarField />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Process />
        <Services />
        <Benefits />
        <Pricing />
        <Testimonials />
        <FAQ />
        <ContactCTA />
        <ContactForm />
        <Footer />
      </div>
    </main>
  );
}