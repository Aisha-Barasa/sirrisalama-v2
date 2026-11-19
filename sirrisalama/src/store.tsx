import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Case, Msg, SEED_CASES, Status } from './data'

/*
 * Test-version storage: cases live in sessionStorage, which belongs to ONE browser tab.
 * - Survives a reload or typing a new address in the same tab (so /responders can see new reports).
 * - Is deleted when the tab is closed, or when Quick exit is pressed.
 * - Is never sent to a server.
 * The footer tells reporters exactly this. Change the footer if you change this.
 */
export const STORAGE_KEY = 'sirrisalama-test-cases'
const load = (): Case[] => {
  try { const s = sessionStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : SEED_CASES } catch { return SEED_CASES }
}

interface Store {
  cases: Case[]
  submit: (c: { category: string; description: string; danger: boolean }) => Case
  setStatus: (ref: string, s: Status) => void
  setReporterUpdate: (ref: string, t: string) => void
  addNote: (ref: string, t: string) => void
  addMessage: (ref: string, from: Msg['from'], t: string) => void
}
const Ctx = createContext<Store>(null!)
export const useCases = () => useContext(Ctx)

export function CaseProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<Case[]>(load)
  useEffect(() => { try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cases)) } catch { /* storage blocked: stays in memory */ } }, [cases])
  const patch = (ref: string, f: (c: Case) => Partial<Case>) =>
    setCases(cs => cs.map(c => (c.ref === ref ? { ...c, ...f(c) } : c)))
  const submit: Store['submit'] = input => {
    const n = 1000 + cases.length + 1
    const c: Case = {
      ...input, ref: `SS-${n}`, pin: String(Math.floor(1000 + Math.random() * 9000)),
      date: new Date().toISOString(), status: 'New',
      reporterUpdate: 'Your report was received.', notes: [], messages: [],
    }
    setCases(cs => [c, ...cs])
    return c
  }
  return (
    <Ctx.Provider value={{
      cases, submit,
      setStatus: (r, s) => patch(r, () => ({ status: s })),
      setReporterUpdate: (r, t) => patch(r, () => ({ reporterUpdate: t })),
      addMessage: (r, from, t) => patch(r, c => ({ messages: [...c.messages, { from, text: t, at: new Date().toISOString() }] })),
      addNote: (r, t) => patch(r, c => ({ notes: [{ at: new Date().toISOString(), text: t }, ...c.notes] })),
    }}>{children}</Ctx.Provider>
  )
}
