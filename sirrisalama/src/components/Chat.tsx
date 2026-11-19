import { useState } from 'react'
import { Send } from 'lucide-react'
import { Msg } from '../data'
import { useLang } from '../i18n'

export default function Chat({ messages, me, onSend }: { messages: Msg[]; me: Msg['from']; onSend: (t: string) => void }) {
  const { t, time } = useLang()
  const [v, setV] = useState('')
  const who = (f: Msg['from']) => (f === me ? t('You', 'Wewe') : f === 'responder' ? t('Responder', 'Mhudumu') : t('Reporter', 'Muripoti'))
  return (
    <div>
      <ul className="max-h-72 space-y-2 overflow-auto rounded-2xl bg-mist/60 p-3" aria-live="polite">
        {messages.length === 0 && <li className="p-2 text-sm">{t('No messages yet.', 'Hakuna ujumbe bado.')}</li>}
        {messages.map((m, i) => (
          <li key={i} className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${m.from === me ? 'ml-auto bg-ink text-white' : 'bg-white'}`}>
            <span className={`block text-xs ${m.from === me ? 'text-marigold' : 'text-teal'}`}>{who(m.from)} · {time(m.at)}</span>{m.text}
          </li>
        ))}
      </ul>
      <form className="mt-3 flex gap-2" onSubmit={e => { e.preventDefault(); if (v.trim()) { onSend(v.trim()); setV('') } }}>
        <input className="field" value={v} onChange={e => setV(e.target.value)} placeholder={t('Write a message', 'Andika ujumbe')} aria-label={t('Message', 'Ujumbe')} />
        <button className="btn-primary" aria-label={t('Send', 'Tuma')}><Send size={18} /></button>
      </form>
    </div>
  )
}
