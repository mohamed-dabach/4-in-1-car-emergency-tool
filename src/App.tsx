import { useEffect } from 'react';
import AnnounceBar from './components/AnnounceBar';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Occasions from './components/Occasions';
import OrderForm from './components/OrderForm';
import PackContents from './components/PackContents';
import ProblemSolution from './components/ProblemSolution';
import Reviews from './components/Reviews';
import StickyCta from './components/StickyCta';
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
    <div className="min-h-screen overflow-x-hidden bg-brand-paper text-brand-ink selection:bg-brand-yellow selection:text-brand-ink">
      <AnnounceBar />
      <main>
        <Hero />
        <ProblemSolution />
        <PackContents />
        <Occasions />
        <OrderForm />
        <Reviews />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
      <WhatsappButton />
    </div>
  );
}
