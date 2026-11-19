import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, HeartHandshake, Smartphone } from 'lucide-react'
import Heart3D from '../components/Heart3D'
import { useLang } from '../i18n'
import WhoSees from '../components/WhoSees'

export default function Landing() {
  const { t } = useLang()
  const points = [
    [ShieldCheck, t('Anonymous by design', 'Bila kujulikana'), t('No name, no phone number, no email needed to report.', 'Hakuna jina, namba ya simu wala barua pepe inayohitajika kuripoti.')],
    [HeartHandshake, t('Followed by people', 'Unafuatiliwa na watu'), t('Responders update your case and talk with you. You check in with a reference and PIN.', 'Wahudumu wanasasisha kesi yako na kuzungumza nawe. Unaingia kwa namba ya kesi na PIN.')],
    [Smartphone, t('Works on any phone', 'Inafanya kazi kwenye simu yoyote'), t('A USSD path is illustrated for people without a smartphone.', 'Njia ya USSD imeonyeshwa kwa watu wasio na simu janja.')],
  ] as const
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-8 md:grid-cols-12 md:pt-16">
        <div className="md:col-span-7">
          <h1 className="text-5xl leading-[1.05] md:text-7xl">{t('You do not have to carry this alone.', 'Huhitaji kubeba mzigo huu peke yako.')}</h1>
          <p className="mt-6 max-w-lg text-lg text-ink/80">{t('SirriSalama is a safe place to report gender-based violence and get support, without giving your name.', 'SirriSalama ni mahali salama pa kuripoti ukatili wa kijinsia na kupata msaada, bila kutoa jina lako.')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link replace to="/report" className="btn-primary">{t('Make a private report', 'Toa ripoti ya siri')} <ArrowRight size={18} /></Link>
            <Link replace to="/support" className="btn-soft">{t('Find support', 'Pata msaada')}</Link>
            <Link replace to="/follow" className="btn-soft">{t('Follow up on my case', 'Fuatilia kesi yangu')}</Link>
          </div>
        </div>
        <div className="md:col-span-5 md:translate-y-8"><Heart3D /></div>
      </section>
      <section className="mx-auto mt-24 grid max-w-6xl gap-10 px-5 md:grid-cols-3">
        {points.map(([Icon, h, d], i) => (
          <div key={i} className={i === 1 ? 'md:mt-12' : i === 2 ? 'md:mt-24' : ''}>
            <Icon className="text-clay" size={28} strokeWidth={1.75} />
            <h2 className="mt-3 text-2xl">{h}</h2><p className="mt-2 text-ink/80">{d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto mt-24 max-w-6xl px-5">
        <WhoSees />
        <div className="mt-8 flex flex-wrap items-center gap-3 md:ml-12">
          <Link replace to="/report" className="btn-primary">{t('Make a private report', 'Toa ripoti ya siri')}</Link>
          <Link replace to="/ussd" className="btn-soft">{t('Try the basic-phone demo', 'Jaribu onyesho la simu ya kawaida')}</Link>
        </div>
      </section>
    </>
  )
}
