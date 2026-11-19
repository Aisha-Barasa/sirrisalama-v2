import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useCases } from '../store'
import { useLang } from '../i18n'
import { CATEGORIES, Case } from '../data'
import Emergency from '../components/Emergency'
import WhoSees from '../components/WhoSees'

export default function Report() {
  const { submit } = useCases()
  const { t, x } = useLang()
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [danger, setDanger] = useState<boolean | null>(null)
  const [done, setDone] = useState<Case | null>(null)
  const ready = category && description.trim().length > 4 && danger !== null

  if (done) return (
    <div className="mx-auto max-w-2xl px-5 pt-10">
      {done.danger && <div className="mb-8"><Emergency tone="alert" live /></div>}
      <CheckCircle2 className="text-clay" size={40} />
      <h1 className="mt-4 text-4xl">{t('Thank you for telling us.', 'Asante kwa kutuambia.')}</h1>
      <p className="mt-3">{t('Your report was received. Please save these two details. We cannot recover them because we do not know who you are.', 'Ripoti yako imepokelewa. Tafadhali hifadhi taarifa hizi mbili. Hatuwezi kuzirejesha kwa sababu hatukujui.')}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5"><p className="label">{t('Case reference', 'Namba ya kesi')}</p><p className="font-display text-3xl">{done.ref}</p></div>
        <div className="rounded-2xl bg-white p-5"><p className="label">{t('Follow-up PIN', 'PIN ya ufuatiliaji')}</p><p className="font-display text-3xl">{done.pin}</p></div>
      </div>
      <p className="mt-4 rounded-2xl border border-ink/20 bg-white p-4 text-sm">{t('Test version: this reference and PIN only work in this browser tab. They are deleted when you close the tab or press Quick exit.', 'Toleo la majaribio: namba hii na PIN zinafanya kazi kwenye kichupo hiki cha kivinjari pekee. Zinafutwa ukifunga kichupo au ukibonyeza Toka haraka.')}</p>
      <div className="mt-8"><WhoSees compact /></div>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/follow" replace className="btn-primary">{t('Follow up on my case', 'Fuatilia kesi yangu')}</Link>
        <Link to="/support" replace className="btn-soft">{t('Find support', 'Pata msaada')}</Link>
        <button className="btn-soft" onClick={() => { setDone(null); setCategory(''); setDescription(''); setDanger(null) }}>{t('Make another report', 'Toa ripoti nyingine')}</button>
      </div>
    </div>
  )

  return (
    <form className="mx-auto max-w-2xl px-5 pt-10" onSubmit={e => { e.preventDefault(); if (ready) setDone(submit({ category, description, danger: danger! })) }}>
      <h1 className="text-4xl md:text-5xl">{t('Tell us what is happening.', 'Tuambie kinachoendelea.')}</h1>
      <p className="mt-3 text-ink/80">{t('Take your time. We do not ask for your name or contact details.', 'Chukua muda wako. Hatuulizi jina wala mawasiliano yako.')}</p>

      <fieldset className="mt-8"><legend className="label">{t('Are you in danger right now?', 'Je, uko hatarini sasa hivi?')}</legend>
        <div className="flex flex-col gap-3 sm:flex-row">{([[t('Yes, I am in danger now', 'Ndiyo, niko hatarini sasa'), true], [t('No, not right now', 'Hapana, si kwa sasa'), false]] as const).map(([l, v]) => (
          <label key={String(v)} className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-sm font-medium ${danger === v ? (v ? 'border-clay bg-white' : 'border-teal bg-marigold/50') : 'border-ink/20 bg-white'}`}>
            <input type="radio" name="danger" className="mr-2 accent-[#1F6F78]" checked={danger === v} onChange={() => setDanger(v)} />{l}
          </label>))}</div>
        {danger === true && (
          <div className="mt-4">
            <Emergency tone="alert" live />
            <p className="mt-3 text-sm">{t('You can still finish and send this report. A responder will read it later, not right away.', 'Bado unaweza kumaliza na kutuma ripoti hii. Mhudumu ataisoma baadaye, si papo hapo.')}</p>
          </div>)}
      </fieldset>

      <div className="mt-8"><label className="label" htmlFor="cat">{t('What kind of concern is it?', 'Ni aina gani ya tatizo?')}</label>
        <p className="-mt-1 mb-2 text-sm text-ink/70">{t('It is okay not to be sure. Choose “Something else” if nothing fits.', 'Si lazima uwe na uhakika. Chagua “Jambo lingine” kama hakuna kinachofaa.')}</p>
        <select id="cat" className="field" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">{t('Pick what feels closest', 'Chagua kinachokaribia zaidi')}</option>{CATEGORIES.map(c => <option key={c} value={c}>{x(c)}</option>)}
        </select></div>
      <div className="mt-6"><label className="label" htmlFor="desc">{t('In a few words, what happened?', 'Kwa maneno machache, nini kilitokea?')}</label>
        <textarea id="desc" rows={5} className="field" value={description} onChange={e => setDescription(e.target.value)} placeholder={t('Share only what you feel comfortable sharing.', 'Shiriki tu unachojisikia vizuri kushiriki.')} /></div>

      <div className="mt-8"><WhoSees compact /></div>
      <button type="submit" disabled={!ready} className="btn-primary mt-8 disabled:opacity-40">{t('Send report privately', 'Tuma ripoti kwa siri')}</button>
    </form>
  )
}
