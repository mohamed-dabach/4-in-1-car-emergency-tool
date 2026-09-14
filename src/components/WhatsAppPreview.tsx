import { Section, SectionHeading } from './ui';
import ImageLightbox from './ImageLightbox';

const showPreview = import.meta.env.DEV || import.meta.env.VITE_SHOW_CHAT_PLACEHOLDERS === 'true';

export default function WhatsAppPreview() {
  // We now show this section to everyone as we have real screenshots.
  // If you still want to hide it in prod, you can uncomment the next line:
  // if (!showPreview) return null;

  return (
    <Section id="whatsapp-preview" className="border-t border-amber-400/20 bg-amber-400/[0.04]">
      <SectionHeading
        eyebrow="آراء الزبناء"
        title="محادثات حقيقية من زبناء ديالنا"
        sub="شوف شنو كيقولو الكليان اللي جربو المنتج."
      />
      <div className="mx-auto flex w-full max-w-5xl snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pt-2 px-4 sm:px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <figure key={num} className="w-[75%] sm:w-[45%] lg:w-[32%] shrink-0 snap-center rounded-2xl border border-amber-300/30 bg-white p-2 shadow-sm transition-transform hover:scale-[1.02]">
            <ImageLightbox src={`/preview-assets/whatsapp-${num}.png`} alt={`محادثة ${num}`} className="block h-full w-full">
              <img src={`/preview-assets/whatsapp-${num}.png`} alt={`محادثة ${num}`} width="640" height="1138" loading="lazy" className="w-full rounded-xl object-cover" />
            </ImageLightbox>
          </figure>
        ))}
      </div>
    </Section>
  );
}
