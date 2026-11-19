import { Link, NavLink, Outlet } from 'react-router-dom'
import { Logo } from './Logo'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useLang } from '../i18n'
import QuickExit from './QuickExit'
import Emergency from './Emergency'

/*
 * Public layout: what a survivor sees. The responder dashboard is deliberately NOT linked
 * anywhere in here. It lives at /responders behind a sign-in (see StaffLayout.tsx).
 * All links use `replace`, so the site takes up one entry in the Back history.
 */
export default function Layout() {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useLang()
  const links = [['/report', t('Report', 'Ripoti')], ['/follow', t('Follow up', 'Fuatilia')], ['/support', t('Support', 'Msaada')], ['/ussd', t('USSD demo', 'Onyesho la USSD')]]
  const cls = ({ isActive }: { isActive: boolean }) => `rounded-full px-4 py-2 text-sm font-medium ${isActive ? 'bg-ink text-white' : 'hover:bg-marigold/40'}`
  const toggle = (
    <div className="flex rounded-full border border-ink/30 p-0.5 text-xs font-bold" role="group" aria-label="Language">
      {(['en', 'sw'] as const).map(l => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-3 py-1 ${lang === l ? 'bg-clay text-white' : ''}`}>{l === 'en' ? 'EN' : 'SW'}</button>
      ))}
    </div>
  )
  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-5">
        <Link to="/" replace aria-label="SirriSalama home"><Logo /></Link>
        <nav className="hidden gap-1 md:flex">{links.map(([to, l]) => <NavLink key={to} to={to} replace className={cls}>{l}</NavLink>)}</nav>
        <div className="flex items-center gap-3">{toggle}
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button></div>
      </header>
      {open && <nav className="mx-5 mb-4 flex flex-col gap-1 md:hidden" onClick={() => setOpen(false)}>{links.map(([to, l]) => <NavLink key={to} to={to} replace className={cls}>{l}</NavLink>)}</nav>}
      <main className="flex-1"><Outlet /></main>
      <footer className="mt-20 bg-ink px-5 pb-20 pt-10 text-sm text-white">
        <div className="mx-auto max-w-6xl">
          <Emergency />
                    <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Logo light />
            <p className="max-w-md text-white/85">{t('Test version. What you type stays in this browser tab only and is deleted when you close it or press Quick exit.', 'Toleo la majaribio. Unachoandika kinabaki kwenye kichupo hiki pekee na kinafutwa ukikifunga au ukibonyeza Toka haraka.')}</p>
          </div>
        </div>
      </footer>
      <QuickExit />
    </div>
  )
}
