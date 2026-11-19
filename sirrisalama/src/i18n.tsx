import { createContext, useContext, useState, ReactNode } from 'react'
import { SW } from './data'

export type Lang = 'en' | 'sw'
interface L {
  lang: Lang; setLang: (l: Lang) => void
  t: (en: string, sw: string) => string
  x: (en: string) => string
  date: (s: string) => string
  time: (s: string) => string
}
const Ctx = createContext<L>(null!)
export const useLang = () => useContext(Ctx)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const loc = lang === 'sw' ? 'sw-KE' : 'en-GB'
  const v: L = {
    lang, setLang,
    t: (en, sw) => (lang === 'sw' ? sw : en),
    x: en => (lang === 'sw' ? SW[en] ?? en : en),
    date: s => new Date(s).toLocaleDateString(loc, { day: 'numeric', month: 'short', year: 'numeric' }),
    time: s => new Date(s).toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' }),
  }
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>
}
