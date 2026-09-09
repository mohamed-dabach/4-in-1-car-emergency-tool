import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { features } from '../data/product';
import { Section } from './ui';

const accentText = {
  yellow: 'text-brand-yellow',
  cyan: 'text-brand-cyan',
  red: 'text-red-400',
} as const;

const accentGlow = {
  yellow: 'shadow-[0_20px_60px_-25px_rgba(255,215,0,0.55)]',
  cyan: 'shadow-[0_20px_60px_-25px_rgba(0,229,255,0.55)]',
  red: 'shadow-[0_20px_60px_-25px_rgba(230,57,70,0.55)]',
} as const;

export default function Features() {
  return (
    <Section id="features" className="pt-0">
      <div className="flex flex-col gap-14 lg:gap-24">
        {features.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="grid items-center gap-6 lg:grid-cols-2 lg:gap-14"
          >
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <img
                src={f.image}
                alt={f.alt}
                loading="lazy"
                width={1200}
                height={900}
                className={`w-full rounded-3xl border border-white/10 object-cover ${accentGlow[f.accent]}`}
              />
            </div>
            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <span className={`text-sm font-black ${accentText[f.accent]}`}>{f.eyebrow}</span>
              <h3 className="mt-2 text-2xl leading-snug font-black text-white sm:text-3xl">
                {f.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">{f.desc}</p>
              <ul className="mt-5 space-y-3">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm font-bold text-slate-200 sm:text-base">
                    <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${accentText[f.accent]}`} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
