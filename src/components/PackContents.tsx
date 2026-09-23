import { Gift } from 'lucide-react';
import { packItems, product } from '../data/product';
import { CtaButton, Section, SectionHeading } from './ui';

export default function PackContents() {
  return (
    <Section id="pack" className="splash">
      <SectionHeading eyebrow="📦 كلشي فكولي واحد" title="أشنو كيوصلك بالضبط فالطقم؟" />
      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {packItems.map(({ icon: Icon, title, desc, image, alt, badge }) => (
          <article key={title} className="flex items-center gap-3 rounded-3xl border border-brand-ink/10 bg-white p-3 shadow-sm">
            <img src={image} alt={alt} width={360} height={280} loading="lazy" decoding="async" className="h-28 w-28 shrink-0 rounded-2xl object-cover sm:h-32 sm:w-32" />
            <div className="min-w-0">
              <h3 className="flex items-center gap-1.5 text-base font-black text-brand-ink sm:text-lg">
                <Icon className="h-5 w-5 shrink-0 text-brand-cyan" /> {title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-brand-ink/70">{desc}</p>
              {badge && (
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-yellow px-2.5 py-0.5 text-xs font-black text-brand-ink">
                  <Gift className="h-3.5 w-3.5" /> {badge}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 text-center">
        <CtaButton location="pack_contents" label="بغيت الطقم كامل" className="max-w-md">
          بغيت الطقم كامل ب {product.price} {product.currency}
        </CtaButton>
      </div>
    </Section>
  );
}
