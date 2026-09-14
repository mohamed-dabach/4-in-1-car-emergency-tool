import { useEffect } from 'react';
import AnnounceBar from './components/AnnounceBar';
import Benefits from './components/Benefits';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Hero from './components/Hero';
import OrderForm from './components/OrderForm';
import ProductProof from './components/ProductProof';
import StickyCta from './components/StickyCta';
import WhatsAppPreview from './components/WhatsAppPreview';
import WhatsappButton from './components/WhatsappButton';
import { product } from './data/product';
import { trackViewContent } from './lib/metaEvents';
import { useScrollDepth, useTimeOnPage, useExitIntent, useSectionViews } from './lib/useEngagement';

export default function App() {
  useScrollDepth();
  useTimeOnPage();
  useExitIntent();
  useSectionViews();

  useEffect(() => {
    trackViewContent(product.price);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-navy text-white selection:bg-brand-yellow selection:text-brand-navy">
      <AnnounceBar />
      <main>
        <Hero />
        <Benefits />
        <ProductProof />
        <OrderForm />
        <WhatsAppPreview />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
      <WhatsappButton />
    </div>
  );
}
