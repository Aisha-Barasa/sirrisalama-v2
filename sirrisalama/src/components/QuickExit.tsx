import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useLang } from '../i18n'

/* Where Quick exit lands. A neutral, everyday page. */
export const QUICK_EXIT_URL = 'https://www.google.com/search?q=weather+today'

export function quickExit() {
  // 1. Blank the screen at once, before anything else can paint.
  document.documentElement.style.background = '#fff'
  document.body.style.display = 'none'
  document.title = 'Google'
  // 2. Delete everything this site kept in the tab (reports, sign-in, chats).
  try { sessionStorage.clear() } catch { /* ignore */ }
  // 3. Replace this history entry, so Back does not return here.
  window.location.replace(QUICK_EXIT_URL)
}

export default function QuickExit() {
  const { t } = useLang()
  // Keyboard shortcut: press Shift three times within a second.
  useEffect(() => {
    let hits: number[] = []
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Shift' || e.repeat) return
      const now = Date.now()
      hits = [...hits.filter(h => now - h < 1000), now]
      if (hits.length >= 3) quickExit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <button type="button" onClick={quickExit}
      className="quick-exit fixed right-3 z-50 flex items-center gap-2 rounded-full bg-clay py-3 pl-4 pr-5 text-base font-bold text-white shadow-lg ring-4 ring-white hover:bg-[#a83a22] md:right-6"
      aria-label={t('Quick exit: leave this site now and clear this tab', 'Toka haraka: ondoka sasa na ufute kichupo hiki')}>
      <X size={20} strokeWidth={3} aria-hidden="true" />
      <span>{t('Quick exit', 'Toka haraka')}</span>
    </button>
  )
}
