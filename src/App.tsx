import { useEffect, useState } from 'react';
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
import WhatsappProof from './components/WhatsappProof';
import { initialVariant, product, type Variant } from './data/product';
import { trackViewContent } from './lib/metaEvents';
import { useScrollDepth, useTimeOnPage, useExitIntent, useSectionViews } from './lib/useEngagement';

export default function App() {
  useScrollDepth();
  useTimeOnPage();
  useExitIntent();
  useSectionViews();

  // ولد ولا بنت: كيتختار فالهيرو وكيمشي مع الطلب باش يتصيفط الطقم الصحيح
  const [variant, setVariant] = useState<Variant>(initialVariant);

  useEffect(() => {
    trackViewContent(product.price);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-paper text-brand-ink selection:bg-brand-yellow selection:text-brand-ink">
      <AnnounceBar />
      <main>
        <Hero variant={variant} onVariantChange={setVariant} />
        <ProblemSolution />
        <PackContents />
        <Occasions />
        <WhatsappProof />
        <OrderForm variant={variant} onVariantChange={setVariant} />
        <Reviews />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
      <WhatsappButton />
    </div>
  );
}
