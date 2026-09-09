import AnnounceBar from './components/AnnounceBar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import PainPoints from './components/PainPoints';
import Compatibility from './components/Compatibility';
import Features from './components/Features';
import Safety from './components/Safety';
import InTheBox from './components/InTheBox';
import RealPhotos from './components/RealPhotos';
import Specs from './components/Specs';
import Steps from './components/Steps';
import Reviews from './components/Reviews';
import Faq from './components/Faq';
import OrderForm from './components/OrderForm';
import StickyCta from './components/StickyCta';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-navy text-white selection:bg-brand-yellow selection:text-brand-navy">
      <AnnounceBar />
      <main>
        <Hero />
        <Benefits />
        <PainPoints />
        <Features />
        <Compatibility />
        <Safety />
        <InTheBox />
        <RealPhotos />
        <Specs />
        <Steps />
        <Reviews />
        <Faq />
        <OrderForm />
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
}
