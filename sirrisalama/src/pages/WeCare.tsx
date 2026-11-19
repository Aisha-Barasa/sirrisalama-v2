import { useState } from 'react'
import { Lock, Eye, AlertTriangle, MessageCircle, EyeOff } from 'lucide-react'
import { LogoMark } from '../components/Logo'
import Chat from '../components/Chat'
import { useCases } from '../store'
import { useLang } from '../i18n'
import { STATUSES, Status } from '../data'

const tone: Record<Status, string> = { New: 'bg-clay text-white', 'In review': 'bg-teal text-white', 'Support offered': 'bg-marigold text-ink', Closed: 'bg-mist text-ink' }

export default function WeCare() {
  const { cases, setStatus, setReporterUpdate, addNote, addMessage } = useCases()
  const { t, x, date } = useLang()
  const [sel, setSel] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const c = cases.find(k => k.ref === sel)
  return (
    <div className="mx-auto max-w-6xl px-5 pt-8">
      <div className="flex items-center gap-3"><LogoMark size={40} /><div><h1 className="text-4xl">WeCare</h1><p className="text-sm text-teal">{t('Responder dashboard, fictional test data', 'Dashibodi ya wahudumu, data ya majaribio ya kubuni')}</p></div></div>
      <div className="mt-6 flex gap-3 rounded-2xl border-2 border-teal bg-white p-4 text-sm">
        <EyeOff className="shrink-0 text-teal" size={20} aria-hidden="true" />
        <div>
          <p className="font-medium">{t('Reporters never see this dashboard.', 'Waripoti hawaioni dashibodi hii kamwe.')}</p>
          <p className="mt-1">{t('It sits at its own address, is not linked from the public site and needs a sign-in. Test version: reports made in this browser tab appear here at once. They are kept in this tab only and are deleted when it closes or someone presses Quick exit.', 'Ipo kwenye anwani yake, haijaunganishwa na tovuti ya umma na inahitaji kuingia. Toleo la majaribio: ripoti zinazotolewa kwenye kichupo hiki zinaonekana hapa papo hapo. Zinahifadhiwa kwenye kichupo hiki pekee na zinafutwa kinapofungwa au mtu akibonyeza Toka haraka.')}</p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATUSES.map(s => <div key={s} className="border-l-4 border-clay pl-4"><p className="font-display text-4xl">{cases.filter(k => k.status === s).length}</p><p className="text-sm">{x(s)}</p></div>)}
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <section className="lg:col-span-2" aria-label={t('Case list', 'Orodha ya kesi')}>
          <h2 className="mb-3 text-2xl">{t('Cases', 'Kesi')}</h2>
          <ul className="divide-y divide-ink/10 rounded-2xl bg-white">
            {cases.map(k => (
              <li key={k.ref}><button onClick={() => setSel(k.ref)} className={`w-full p-4 text-left ${sel === k.ref ? 'bg-marigold/40' : 'hover:bg-mist/50'}`}>
                <div className="flex items-center justify-between"><span className="font-medium">{k.ref}{k.danger && <AlertTriangle size={14} className="ml-2 inline text-clay" aria-label={t('Immediate danger', 'Hatari ya haraka')} />}</span>
                  <span className={`rounded-full px-3 py-0.5 text-xs ${tone[k.status]}`}>{x(k.status)}</span></div>
                <p className="mt-1 text-sm">{x(k.category)}</p>
                <p className="flex justify-between text-xs text-teal"><span>{date(k.date)}</span>{k.messages.length > 0 && <span className="flex items-center gap-1"><MessageCircle size={12} />{k.messages.length}</span>}</p>
              </button></li>))}
          </ul>
        </section>
        <section className="lg:col-span-3" aria-label={t('Case details', 'Maelezo ya kesi')}>
          {!c ? <p className="rounded-2xl bg-marigold/30 p-8">{t('Select a case to see its details.', 'Chagua kesi kuona maelezo.')}</p> : (
            <div>
              <h2 className="text-3xl">{c.ref}</h2>
              <p className="text-sm text-teal">{x(c.category)} · {date(c.date)}{c.danger && ' · ' + t('Reporter said: immediate danger', 'Muripoti alisema: hatari ya haraka')}</p>
              <p className="mt-4 rounded-2xl bg-white p-5">{c.description}</p>
              <label className="label mt-6" htmlFor="st">{t('Case status', 'Hali ya kesi')}</label>
              <select id="st" className="field max-w-xs" value={c.status} onChange={e => setStatus(c.ref, e.target.value as Status)}>{STATUSES.map(s => <option key={s} value={s}>{x(s)}</option>)}</select>
              <div className="mt-6 rounded-2xl border border-teal p-5">
                <h3 className="flex items-center gap-2 text-xl"><Eye size={18} /> {t('Visible to reporter', 'Inaonekana kwa muripoti')}</h3>
                <p className="text-xs">{t('The reporter sees the status, this message and the conversation below.', 'Muripoti huona hali, ujumbe huu na mazungumzo yaliyo chini.')}</p>
                <textarea className="field mt-3" rows={2} value={c.reporterUpdate} onChange={e => setReporterUpdate(c.ref, e.target.value)} aria-label={t('Status message to reporter', 'Ujumbe wa hali kwa muripoti')} />
                <h4 className="mb-2 mt-5 flex items-center gap-2 font-medium"><MessageCircle size={16} /> {t('Conversation with reporter', 'Mazungumzo na muripoti')}</h4>
                <Chat messages={c.messages} me="responder" onSend={m => addMessage(c.ref, 'responder', m)} />
              </div>
              <div className="mt-4 rounded-2xl bg-ink p-5 text-white">
                <h3 className="flex items-center gap-2 text-xl"><Lock size={18} /> {t('Internal notes: never shown to reporter', 'Maelezo ya ndani: hayaonekani kwa muripoti kamwe')}</h3>
                <form className="mt-3 flex gap-2" onSubmit={e => { e.preventDefault(); if (note.trim()) { addNote(c.ref, note.trim()); setNote('') } }}>
                  <input className="field text-ink" value={note} onChange={e => setNote(e.target.value)} placeholder={t('Add an internal note', 'Ongeza maelezo ya ndani')} aria-label={t('Internal note', 'Maelezo ya ndani')} />
                  <button className="btn bg-clay text-white">{t('Add', 'Ongeza')}</button></form>
                <ul className="mt-3 space-y-2 text-sm">{c.notes.length === 0 && <li className="text-marigold">{t('No notes yet.', 'Hakuna maelezo bado.')}</li>}
                  {c.notes.map((n, i) => <li key={i} className="rounded-xl bg-white/10 p-3"><span className="text-xs text-marigold">{date(n.at)}</span><br />{n.text}</li>)}</ul>
              </div>
            </div>)}
        </section>
      </div>
    </div>
  )
}
