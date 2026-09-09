import { specs } from '../data/product';
import { Section, SectionHeading } from './ui';

export default function Specs() {
  return (
    <Section id="specs" className="pt-0">
      <SectionHeading eyebrow="المواصفات" title="التفاصيل التقنية" />
      <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-right text-sm sm:text-base">
            <tbody>
              {specs.map(([k, v], i) => (
                <tr key={k} className={i % 2 ? 'bg-white/[0.02]' : 'bg-white/[0.05]'}>
                  <th scope="row" className="w-1/2 px-4 py-3 font-bold text-slate-400">
                    {k}
                  </th>
                  <td className="px-4 py-3 font-black text-white">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <img
          src="/images/box-specs.webp"
          alt="ملصق المواصفات على علبة المنتج"
          loading="lazy"
          width={1200}
          height={900}
          className="w-full rounded-2xl border border-white/10 object-cover"
        />
      </div>
    </Section>
  );
}
