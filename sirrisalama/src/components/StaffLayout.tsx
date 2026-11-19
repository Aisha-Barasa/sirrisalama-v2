import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Lock, LogOut } from 'lucide-react'
import { LogoMark } from './Logo'
import { useLang } from '../i18n'
import QuickExit from './QuickExit'

/*
 * Responder area at /responders. Not linked from any public page.
 * IMPORTANT: this sign-in is a front-end stand-in for testing only. Anyone who reads the
 * source code can find the demo credentials. A live service needs real server-side
 * authentication, per-person accounts and a separate address (e.g. a staff subdomain).
 */
const DEMO_USER = 'responder'
const DEMO_PASS = 'wecare-test'
const AUTH_KEY = 'sirrisalama-staff'
const isIn = () => { try { return sessionStorage.getItem(AUTH_KEY) === '1' } catch { return false } }

export default function StaffLayout() {
  const { t, lang, setLang } = useLang()
  const [signedIn, setSignedIn] = useState(isIn)
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [err, setErr] = useState(false)

  const signIn = (e: React.FormEvent) => {
    e.preventDefault()
    const ok = u.trim().toLowerCase() === DEMO_USER && p === DEMO_PASS
    setErr(!ok)
    if (ok) { try { sessionStorage.setItem(AUTH_KEY, '1') } catch { /* ignore */ } setSignedIn(true); setP('') }
  }
  const signOut = () => { try { sessionStorage.removeItem(AUTH_KEY) } catch { /* ignore */ } setSignedIn(false); setU('') }

  return (
    <div className="min-h-screen bg-mist/50 pb-28">
      <header className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3"><span className="rounded-full bg-white p-1"><LogoMark size={30} /></span>
            <div className="leading-tight"><p className="font-display text-xl">WeCare</p><p className="text-xs text-marigold">{t('For trusted partners only', 'Kwa washirika wanaoaminika pekee')}</p></div></div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-full border border-white/40 p-0.5 text-xs font-bold" role="group" aria-label="Language">
              {(['en', 'sw'] as const).map(l => <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-3 py-1 ${lang === l ? 'bg-clay text-white' : ''}`}>{l.toUpperCase()}</button>)}
            </div>
            {signedIn && <button onClick={signOut} className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"><LogOut size={16} />{t('Sign out', 'Toka')}</button>}
          </div>
        </div>
      </header>
      {signedIn ? <Outlet /> : (
        <form onSubmit={signIn} className="mx-auto mt-16 max-w-sm px-5">
          <Lock className="text-teal" size={32} aria-hidden="true" />
          <h1 className="mt-3 text-3xl">{t('Responder sign-in', 'Kuingia kwa wahudumu')}</h1>
          <p className="mt-2 text-sm text-ink/80">{t('This area is for trained staff at partner organisations. Reporters never see it.', 'Eneo hili ni la wahudumu waliofunzwa katika mashirika washirika. Waripoti hawalioni kamwe.')}</p>
          <label className="label mt-6" htmlFor="u">{t('Username', 'Jina la mtumiaji')}</label>
          <input id="u" className="field" autoComplete="username" value={u} onChange={e => setU(e.target.value)} />
          <label className="label mt-4" htmlFor="pw">{t('Password', 'Nenosiri')}</label>
          <input id="pw" type="password" className="field" autoComplete="current-password" value={p} onChange={e => setP(e.target.value)} />
          {err && <p role="alert" className="mt-3 text-sm font-medium text-clay">{t('Username or password not recognised.', 'Jina la mtumiaji au nenosiri halitambuliki.')}</p>}
          <button className="btn-primary mt-6 w-full" disabled={!u || !p}>{t('Sign in', 'Ingia')}</button>
          <p className="mt-4 rounded-xl bg-marigold/40 p-3 text-xs">{t('Testing the prototype? The test sign-in details are in the testing guide you were sent.', 'Unajaribu mfano huu? Taarifa za kuingia za majaribio zipo kwenye mwongozo wa majaribio uliotumiwa.')}</p>
        </form>
      )}
      <QuickExit />
    </div>
  )
}
