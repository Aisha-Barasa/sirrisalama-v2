import { Users } from 'lucide-react'
import { PARTNERS } from '../data'
import { useLang } from '../i18n'

/* Who reads a report, and what happens after it is sent. Used on the landing page and the report form. */
export default function WhoSees({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useLang()
  const steps = [
    t('You send the report. You get a case reference and a 4-digit PIN. Write them down somewhere safe.', 'Unatuma ripoti. Unapata namba ya kesi na PIN ya tarakimu 4. Ziandike mahali salama.'),
    t('A trained responder from one of our trusted partners reads it. This is not instant: no one is watching the screen around the clock.', 'Mhudumu aliyefunzwa kutoka kwa mmoja wa washirika wetu wanaoaminika anaisoma. Hii si papo hapo: hakuna anayeangalia skrini saa zote.'),
    t('They update your case status and may send you a message with support options.', 'Wanasasisha hali ya kesi yako na wanaweza kukutumia ujumbe wenye chaguo za msaada.'),
    t('You check back when it is safe, on the Follow up page or by phone (USSD), using your reference and PIN.', 'Unarudi kuangalia ukiwa salama, kwenye ukurasa wa Fuatilia au kwa simu (USSD), ukitumia namba ya kesi na PIN.'),
    t('You decide which support, if any, to take up. Responders cannot contact you first: they do not know who you are.', 'Wewe ndiye unaamua msaada upi wa kuchukua, kama upo. Wahudumu hawawezi kukutafuta kwanza: hawakujui.'),
  ]
  return (
    <div className={`rounded-3xl bg-mist ${compact ? 'p-5' : 'p-8 md:p-12'}`}>
      <div className={`grid gap-8 ${compact ? '' : 'md:grid-cols-2'}`}>
        <div>
          <h2 className={`flex items-center gap-2 ${compact ? 'text-xl' : 'text-3xl'}`}><Users size={compact ? 20 : 26} className="text-teal" aria-hidden="true" />{t('Who reads your report', 'Nani anasoma ripoti yako')}</h2>
          <p className="mt-2 text-sm md:text-base">{t('Only trained responders at trusted partner organisations. They see what you wrote and the type of concern. They never see your name or number, because we never ask for them.', 'Wahudumu waliofunzwa katika mashirika washirika wanaoaminika pekee. Wanaona ulichoandika na aina ya tatizo. Hawaoni jina wala namba yako, kwa sababu hatuziulizi kamwe.')}</p>
          <ul className="mt-3 space-y-1 text-sm">
            {PARTNERS.map(([en, sw]) => <li key={en} className="border-l-2 border-teal pl-3">{lang === 'sw' ? sw : en}</li>)}
          </ul>
          <p className="mt-3 text-xs text-ink/70">{t('Test version: these partners are fictional. Right now the only person who can read a report is someone signed in to the responder dashboard on this same device.', 'Toleo la majaribio: washirika hawa ni wa kubuni. Kwa sasa anayeweza kusoma ripoti ni mtu aliyeingia kwenye dashibodi ya wahudumu kwenye kifaa hiki hiki pekee.')}</p>
        </div>
        <div>
          <h2 className={compact ? 'text-xl' : 'text-3xl'}>{t('What happens next', 'Kinachofuata')}</h2>
          <ol className="mt-3 space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm md:text-base">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">{i + 1}</span>
                <span>{s}</span>
              </li>))}
          </ol>
        </div>
      </div>
    </div>
  )
}
