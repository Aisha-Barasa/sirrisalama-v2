import { useState } from 'react'
import { Eye, MessageCircle } from 'lucide-react'
import Chat from '../components/Chat'
import { useCases } from '../store'
import { useLang } from '../i18n'

export default function Follow() {
  const { cases, addMessage } = useCases()
  const { t, x, date } = useLang()
  const [ref, setRef] = useState('')
  const [pin, setPin] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const [err, setErr] = useState(false)
  const c = cases.find(k => k.ref === open)

  const enter = (e: React.FormEvent) => {
    e.preventDefault()
    const id = ref.trim().toUpperCase().replace(/^(SS-)?/, 'SS-')
    const found = cases.find(k => k.ref === id && k.pin === pin.trim())
    setErr(!found); setOpen(found ? found.ref : null)
  }
  if (!c) return (
    <form className="mx-auto max-w-md px-5 pt-10" onSubmit={enter}>
      <h1 className="text-4xl md:text-5xl">{t('Follow up on your case', 'Fuatilia kesi yako')}</h1>
      <p className="mt-3 text-ink/80">{t('Enter the reference and PIN you were given. Demo: SS-1001 and 4821.', 'Weka namba ya kesi na PIN uliyopewa. Onyesho: SS-1001 na 4821.')}</p>
      <label className="label mt-8" htmlFor="r">{t('Case reference (e.g. SS-1001)', 'Namba ya kesi (mf. SS-1001)')}</label>
      <input id="r" className="field" value={ref} onChange={e => setRef(e.target.value)} />
      <label className="label mt-5" htmlFor="p">PIN</label>
      <input id="p" className="field" inputMode="numeric" maxLength={4} value={pin} onChange={e => setPin(e.target.value)} />
      {err && <p role="alert" className="mt-3 text-sm font-medium text-clay">{t('Reference or PIN not found. Check and try again.', 'Namba ya kesi au PIN haikupatikana. Angalia na ujaribu tena.')}</p>}
      <button className="btn-primary mt-6" disabled={!ref || !pin}>{t('Open case', 'Fungua kesi')}</button>
    </form>
  )
  return (
    <div className="mx-auto max-w-2xl px-5 pt-10">
      <p className="text-sm text-teal">{date(c.date)}</p>
      <h1 className="text-4xl">{c.ref}</h1>
      <p className="mt-1">{x(c.category)}</p>
      <div className="mt-6 rounded-2xl border border-teal p-5">
        <h2 className="flex items-center gap-2 text-xl"><Eye size={18} /> {t('Status', 'Hali ya kesi')}: {x(c.status)}</h2>
        <p className="mt-2 text-sm">{c.reporterUpdate}</p>
      </div>
      <h2 className="mb-3 mt-8 flex items-center gap-2 text-2xl"><MessageCircle size={22} className="text-clay" /> {t('Conversation with a responder', 'Mazungumzo na mhudumu')}</h2>
      <Chat messages={c.messages} me="reporter" onSend={m => addMessage(c.ref, 'reporter', m)} />
      <p className="mt-4 text-xs">{t('Only this status, the message above and your conversation are shown here. Internal responder notes are never visible to you. Responders cannot contact you first. Check back here when it is safe.', 'Hali hii, ujumbe ulio juu na mazungumzo yako pekee ndivyo vinavyoonekana hapa. Maelezo ya ndani ya wahudumu hayaonekani kwako kamwe. Wahudumu hawawezi kukutafuta kwanza. Rudi hapa ukiwa salama.')}</p>
      <div className="mt-6 flex gap-2"><button className="btn-soft" onClick={() => { setOpen(null); setPin('') }}>{t('Leave case', 'Toka kwenye kesi')}</button></div>
    </div>
  )
}
