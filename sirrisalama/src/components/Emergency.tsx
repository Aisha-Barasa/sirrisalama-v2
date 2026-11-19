import { Phone } from 'lucide-react'
import { EMERGENCY_NUMBERS } from '../data'
import { useLang } from '../i18n'

/*
 * The one place that says "this site cannot send help".
 * tone="alert": solid clay panel, used straight after someone picks "Yes, I am in danger now".
 * tone="calm":  white panel with clay border, used in the footer and on the support page.
 */
export default function Emergency({ tone = 'calm', live = false }: { tone?: 'alert' | 'calm'; live?: boolean }) {
  const { t } = useLang()
  const alert = tone === 'alert'
  const [a, b] = EMERGENCY_NUMBERS
  return (
    <div role={live ? 'alert' : undefined}
      className={`rounded-2xl p-5 ${alert ? 'bg-clay text-white' : 'border-2 border-clay bg-white text-ink'}`}>
      <p className="font-display text-xl font-semibold leading-snug md:text-2xl">
        {t('This website cannot send help.', 'Tovuti hii haiwezi kutuma msaada.')}
      </p>
      <p className="mt-1 text-base">
        {t(`If you are in danger now, call ${a} or ${b}.`, `Ukiwa hatarini sasa hivi, piga ${a} au ${b}.`)}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {EMERGENCY_NUMBERS.map(n => (
          <a key={n} href={`tel:${n}`}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-bold ${alert ? 'bg-white text-clay' : 'bg-clay text-white'}`}>
            <Phone size={18} aria-hidden="true" /> {t('Call', 'Piga')} {n}
          </a>
        ))}
      </div>
    </div>
  )
}
