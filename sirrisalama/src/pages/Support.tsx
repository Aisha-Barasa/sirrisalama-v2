import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Scale, Stethoscope, Home, Wallet, ShieldCheck, Phone, Clock } from 'lucide-react'
import { useLang } from '../i18n'
import Emergency from '../components/Emergency'

type P = [string, string]
interface Svc { name: P; desc: P; hours: P; contact: string }
interface Cat { id: string; icon: typeof Brain; title: P; blurb: P; services: Svc[] }

const CATS: Cat[] = [
  { id: 'mental', icon: Brain, title: ['Mental health', 'Afya ya akili'], blurb: ['Someone to listen, without judgement. Healing is not a straight line.', 'Mtu wa kukusikiliza bila kukuhukumu. Kupona hakufuati mstari mnyoofu.'], services: [
    { name: ['Listening Circle (Demo)', 'Duara la Kusikiliza (Onyesho)'], desc: ['Free, confidential phone counselling with a trained counsellor.', 'Ushauri nasaha wa simu bila malipo na wa siri na mshauri aliyefunzwa.'], hours: ['Daily 08:00–20:00', 'Kila siku 08:00–20:00'], contact: '0000 101' },
    { name: ['Healing Together Groups (Demo)', 'Vikundi vya Kuponya Pamoja (Onyesho)'], desc: ['Small peer support groups for survivors, led by a facilitator.', 'Vikundi vidogo vya usaidizi kwa waathirika, vinavyoongozwa na msimamizi.'], hours: ['Wednesdays 16:00', 'Jumatano 16:00'], contact: '0000 102' } ] },
  { id: 'legal', icon: Scale, title: ['Legal help', 'Msaada wa kisheria'], blurb: ['Understand your rights and your options, at your own pace.', 'Elewa haki zako na chaguo ulizonazo, kwa kasi yako mwenyewe.'], services: [
    { name: ['Free Legal Aid Desk (Demo)', 'Dawati la Msaada wa Kisheria (Onyesho)'], desc: ['Advice on protection orders, reporting to the police and child custody.', 'Ushauri kuhusu amri za ulinzi, kuripoti polisi na malezi ya watoto.'], hours: ['Mon–Fri 09:00–17:00', 'Jumatatu–Ijumaa 09:00–17:00'], contact: '0000 201' },
    { name: ['Court Companions (Demo)', 'Wasindikizaji Mahakamani (Onyesho)'], desc: ['A trained volunteer goes with you to a police station or court.', 'Mjitolea aliyefunzwa anaongozana nawe kituo cha polisi au mahakamani.'], hours: ['By appointment', 'Kwa miadi'], contact: '0000 202' } ] },
  { id: 'medical', icon: Stethoscope, title: ['Medical care', 'Huduma ya afya'], blurb: ['Confidential care. Getting help early, ideally within 72 hours, matters.', 'Huduma ya siri. Kupata msaada mapema, ikiwezekana ndani ya saa 72, ni muhimu.'], services: [
    { name: ['Survivor Health Clinic (Demo)', 'Kliniki ya Afya kwa Waathirika (Onyesho)'], desc: ['Treatment of injuries, emergency contraception and infection prevention.', 'Matibabu ya majeraha, uzazi wa dharura na kinga dhidi ya maambukizi.'], hours: ['Open 24 hours', 'Wazi saa 24'], contact: '0000 301' },
    { name: ['Mobile Health Outreach (Demo)', 'Huduma ya Afya Inayotembea (Onyesho)'], desc: ['A nurse-led van visiting communities each week.', 'Gari linaloongozwa na muuguzi linalotembelea jamii kila wiki.'], hours: ['Weekly, see local notice', 'Kila wiki, ona tangazo la eneo'], contact: '0000 302' } ] },
  { id: 'shelter', icon: Home, title: ['Safe shelter', 'Makazi salama'], blurb: ['A safe place to stay while you decide what comes next.', 'Mahali salama pa kukaa unapoamua hatua inayofuata.'], services: [
    { name: ['Safe House (Demo)', 'Makazi Salama (Onyesho)'], desc: ['Temporary, confidential accommodation for you and your children.', 'Malazi ya muda na ya siri kwako na watoto wako.'], hours: ['Open 24 hours', 'Wazi saa 24'], contact: '0000 401' },
    { name: ['Emergency Transport Fund (Demo)', 'Mfuko wa Usafiri wa Dharura (Onyesho)'], desc: ['Help to travel safely to a shelter or relative.', 'Msaada wa kusafiri kwa usalama hadi makazi salama au kwa ndugu.'], hours: ['Daily 07:00–21:00', 'Kila siku 07:00–21:00'], contact: '0000 402' } ] },
  { id: 'money', icon: Wallet, title: ['Money and work', 'Pesa na kazi'], blurb: ['Independence makes leaving safer. Start with small, steady steps.', 'Uhuru wa kifedha hufanya kuondoka kuwe salama zaidi. Anza na hatua ndogo na thabiti.'], services: [
    { name: ['Livelihood Starter Programme (Demo)', 'Mpango wa Kuanzisha Kipato (Onyesho)'], desc: ['Skills training and small start-up grants.', 'Mafunzo ya ujuzi na ruzuku ndogo za kuanzisha biashara.'], hours: ['Mon–Fri 09:00–16:00', 'Jumatatu–Ijumaa 09:00–16:00'], contact: '0000 501' },
    { name: ['Savings Circles (Demo)', 'Vikundi vya Akiba (Onyesho)'], desc: ['Women-led savings groups with money-management support.', 'Vikundi vya akiba vinavyoongozwa na wanawake, vyenye usaidizi wa kusimamia pesa.'], hours: ['Monthly meetings', 'Mikutano ya kila mwezi'], contact: '0000 502' } ] },
  { id: 'digital', icon: ShieldCheck, title: ['Digital safety', 'Usalama mtandaoni'], blurb: ['Help with online harassment, stalking and securing your accounts.', 'Msaada kuhusu unyanyasaji mtandaoni, kufuatiliwa na kulinda akaunti zako.'], services: [
    { name: ['Digital Safety Helpdesk (Demo)', 'Dawati la Usalama Mtandaoni (Onyesho)'], desc: ['Blocking, reporting and saving evidence of harassing messages.', 'Kuzuia, kuripoti na kuhifadhi ushahidi wa jumbe za unyanyasaji.'], hours: ['Mon–Sat 08:00–18:00', 'Jumatatu–Jumamosi 08:00–18:00'], contact: '0000 601' },
    { name: ['Safe Phone Check (Demo)', 'Ukaguzi wa Simu Salama (Onyesho)'], desc: ['Check your phone for tracking apps and weak passwords.', 'Kagua simu yako kwa programu za kukufuatilia na nywila dhaifu.'], hours: ['By appointment', 'Kwa miadi'], contact: '0000 602' } ] },
]

export default function Support() {
  const { t } = useLang()
  const [id, setId] = useState('mental')
  const p = (a: P) => t(a[0], a[1])
  const cat = CATS.find(c => c.id === id)!
  return (
    <div className="mx-auto max-w-6xl px-5 pt-6">
      <h1 className="text-4xl md:text-6xl">{t('Support, when you are ready.', 'Msaada, ukiwa tayari.')}</h1>
      <p className="mt-3 max-w-xl text-ink/80">{t('Choose the kind of help you are looking for. You can use any of these without making a report. All services shown here are fictional examples.', 'Chagua aina ya msaada unaotafuta. Unaweza kutumia yoyote bila kutoa ripoti. Huduma zote zinazoonyeshwa hapa ni mifano ya kubuni.')}</p>
      <div className="mt-6 max-w-2xl"><Emergency /></div>
      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex flex-wrap gap-2 md:flex-col" role="tablist" aria-label={t('Support types', 'Aina za msaada')}>
            {CATS.map(c => { const Icon = c.icon; const on = c.id === id; return (
              <button key={c.id} role="tab" aria-selected={on} onClick={() => setId(c.id)}
                className={`flex items-center gap-3 rounded-full px-5 py-3 text-left text-sm font-medium transition ${on ? 'bg-ink text-white' : 'bg-marigold/30 hover:bg-marigold/60'}`}>
                <Icon size={18} className={on ? 'text-marigold' : 'text-teal'} />{p(c.title)}
              </button>) })}
          </div>
        </div>
        <section className="md:col-span-8" aria-live="polite">
          <h2 className="text-3xl md:text-4xl">{p(cat.title)}</h2>
          <p className="mt-2 max-w-lg text-ink/80">{p(cat.blurb)}</p>
          <ul className="mt-6 space-y-4">
            {cat.services.map((s, i) => (
              <li key={i} className={`rounded-2xl bg-white p-6 ${i % 2 ? 'md:ml-10' : ''}`}>
                <h3 className="text-xl">{p(s.name)}</h3>
                <p className="mt-2 text-sm">{p(s.desc)}</p>
                <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-teal">
                  <span className="flex items-center gap-2"><Clock size={16} />{p(s.hours)}</span>
                  <span className="flex items-center gap-2"><Phone size={16} />{s.contact} <em className="text-xs not-italic text-ink/60">({t('fictional', 'ya kubuni')})</em></span>
                </p>
              </li>))}
          </ul>
          <div className="mt-8 rounded-3xl bg-mist p-6">
            <p className="font-display text-xl">{t('Not sure what you need?', 'Huna uhakika unahitaji nini?')}</p>
            <p className="mt-1 text-sm">{t('Make a private report and a responder can help you find the right support.', 'Toa ripoti ya siri na mhudumu anaweza kukusaidia kupata msaada unaofaa.')}</p>
            <Link to="/report" replace className="btn-primary mt-4">{t('Make a private report', 'Toa ripoti ya siri')}</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
