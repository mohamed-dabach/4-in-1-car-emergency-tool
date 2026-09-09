import { motion } from 'motion/react';
import { benefits } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function Benefits() {
  return (
    <Section id="benefits" className="border-t border-white/5">
      <SectionHeading
        eyebrow="جهاز واحد · 4 خدمات"
        title="كل ما تحتاجو فالطريق فجهاز واحد"
        sub="بلا ما تشري 4 حوايج مختلفين وتعمّر بيهم البوات."
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {benefits.map((b, i) => (
          <motion.article
            key={b.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-right sm:flex-col sm:gap-0 sm:p-5"
          >
            <span className="absolute -top-3 left-2 text-4xl font-black text-white/[0.06] sm:left-3 sm:text-5xl">
              {b.num}
            </span>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-cyan/15 text-brand-cyan sm:mb-4">
              <b.icon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 text-lg font-black text-white">{b.title}</h3>
              <p className="mb-3 text-sm leading-relaxed text-slate-400">{b.desc}</p>
              <span
                dir="ltr"
                className="inline-block rounded-lg bg-brand-yellow/15 px-2.5 py-1 text-sm font-black text-brand-yellow"
              >
                {b.stat}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
