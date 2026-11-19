import { useState } from 'react'
import { useCases } from '../store'
import { useLang } from '../i18n'
import { CATEGORIES, SUPPORT, EMERGENCY_NUMBERS } from '../data'

const CODE = '*555#'
const [E1, E2] = EMERGENCY_NUMBERS
type Scr = 'main' | 'cat' | 'danger' | 'urgent' | 'confirm' | 'done' | 'ref' | 'pin' | 'result' | 'support' | 'safety' | 'exit'
interface St { scr: Scr; input: string; msg: string; hist: Scr[]; cat: string; danger: boolean; ref: string; last: string }
const init: St = { scr: 'main', input: '', msg: '', hist: [], cat: '', danger: false, ref: '', last: '' }

export default function Ussd() {
  const { cases, submit } = useCases()
  const { t, x } = useLang()
  const [s, setS] = useState<St>(init)
  const [dialed, setDialed] = useState(false)
  const go = (scr: Scr, p: Partial<St> = {}) => setS(o => ({ ...o, ...p, scr, input: '', msg: '', hist: [...o.hist, o.scr] }))
  const bad = () => setS({ ...s, input: '', msg: 'ERR' })

  const note: Record<Scr, string> = {
    main: t('The main menu. Every USSD session starts from a short numbered list.', 'Menyu kuu. Kila kikao cha USSD huanza na orodha fupi yenye namba.'),
    cat: t('Reporting step 1: choose a concern category by number.', 'Hatua ya 1 ya kuripoti: chagua aina ya tatizo kwa namba.'),
    danger: t('Reporting step 2: a basic safety question. No names or locations are asked.', 'Hatua ya 2: swali la msingi la usalama. Hakuna jina wala eneo linaloulizwa.'),
    urgent: t('Shown straight away when someone says they are in danger. The service cannot send help, so it says so and gives the emergency numbers.', 'Huonyeshwa papo hapo mtu akisema yuko hatarini. Huduma haiwezi kutuma msaada, kwa hiyo inasema hivyo na kutoa namba za dharura.'),
    confirm: t('Reporting step 3: confirm before anything is sent.', 'Hatua ya 3: thibitisha kabla ya kutuma.'),
    done: t('A test case is created. A responder signed in on this device can see it, and it can be followed up here.', 'Kesi ya majaribio imeundwa. Mhudumu aliyeingia kwenye kifaa hiki anaweza kuiona, na inaweza kufuatiliwa hapa.'),
    ref: t('Follow-up step 1: enter a case reference number (digits only).', 'Hatua ya 1 ya kufuatilia: weka namba ya kesi (tarakimu tu).'),
    pin: t('Follow-up step 2: enter the 4-digit PIN. Try synthetic credentials 1001 / 4821.', 'Hatua ya 2: weka PIN ya tarakimu 4. Jaribu 1001 / 4821.'),
    result: t('Only reporter-visible information is shown. Internal notes never appear.', 'Taarifa zinazoonekana kwa muripoti pekee ndizo zinaonyeshwa. Maelezo ya ndani hayaonekani kamwe.'),
    support: t('A fictional list of support services.', 'Orodha ya kubuni ya huduma za msaada.'),
    safety: t('Short safety tips, short enough to read on a basic phone.', 'Vidokezo vifupi vya usalama vinavyosomeka kwenye simu ya kawaida.'),
    exit: t('The session ends.', 'Kikao kinaisha.'),
  }
  const text = (): string => {
    switch (s.scr) {
      case 'main': return t('SirriSalama\n1. Make a report\n2. Follow up on a report\n3. Find support\n4. Safety information\n5. Exit', 'SirriSalama\n1. Toa ripoti\n2. Fuatilia ripoti\n3. Pata msaada\n4. Taarifa za usalama\n5. Toka')
      case 'cat': return t('What happened?\n', 'Nini kilitokea?\n') + CATEGORIES.map((c, i) => `${i + 1}. ${x(c)}`).join('\n')
      case 'danger': return t('Are you in danger right now?\n1. Yes\n2. No', 'Je, uko hatarini sasa hivi?\n1. Ndiyo\n2. Hapana')
      case 'urgent': return t(`This service cannot send help.\nIn danger now? Call ${E1} or ${E2}.\n1. Continue report\n2. Exit`, `Huduma hii haiwezi kutuma msaada.\nUko hatarini sasa? Piga ${E1} au ${E2}.\n1. Endelea na ripoti\n2. Toka`)
      case 'confirm': return t(`Send report?\n${s.cat}\nDanger: ${s.danger ? 'Yes' : 'No'}\n1. Confirm\n2. Cancel`, `Tuma ripoti?\n${x(s.cat)}\nHatari: ${s.danger ? 'Ndiyo' : 'Hapana'}\n1. Thibitisha\n2. Ghairi`)
      case 'done': return t(`Report received.\nRef: ${s.last.split('/')[0]}\nPIN: ${s.last.split('/')[1]}\nSave both. (Demo)`, `Ripoti imepokelewa.\nNamba: ${s.last.split('/')[0]}\nPIN: ${s.last.split('/')[1]}\nHifadhi zote. (Onyesho)`)
      case 'ref': return t('Enter case reference number (e.g. 1001):', 'Weka namba ya kesi (mf. 1001):')
      case 'pin': return t('Enter your 4-digit PIN:', 'Weka PIN yako ya tarakimu 4:')
      case 'result': {
        const c = cases.find(k => k.ref === `SS-${s.ref}` && k.pin === s.last)
        if (!c) return t('Reference or PIN not found. Check and try again.', 'Namba au PIN haipatikani. Angalia na ujaribu tena.')
        const n = c.messages.filter(m => m.from === 'responder').length
        return t(`Case ${c.ref}\nStatus: ${c.status}\n${c.reporterUpdate}\nResponder messages: ${n} (read on web: Follow up)`, `Kesi ${c.ref}\nHali: ${x(c.status)}\n${c.reporterUpdate}\nUjumbe wa mhudumu: ${n} (soma kwenye wavuti: Fuatilia)`)
      }
      case 'support': return t('Find support (demo)\n', 'Pata msaada (onyesho)\n') + SUPPORT.map(r => `${x(r[0])}: ${x(r[1])}`).join('\n')
      case 'safety': return t(`Safety information\n- Go to a trusted place\n- Keep key numbers memorised\n- In danger? Call ${E1} or ${E2}`, `Taarifa za usalama\n- Nenda mahali unapoamini\n- Kariri namba muhimu\n- Uko hatarini? Piga ${E1} au ${E2}`)
      case 'exit': return t('Session ended. Thank you.', 'Kikao kimeisha. Asante.')
    }
  }
  const send = () => {
    const n = parseInt(s.input), v = s.input
    if (s.scr === 'main') {
      const m: Record<number, Scr> = { 1: 'cat', 2: 'ref', 3: 'support', 4: 'safety', 5: 'exit' }
      return m[n] ? go(m[n]) : bad()
    }
    if (s.scr === 'cat') return n >= 1 && n <= CATEGORIES.length ? go('danger', { cat: CATEGORIES[n - 1] }) : bad()
    if (s.scr === 'danger') return n === 1 ? go('urgent', { danger: true }) : n === 2 ? go('confirm', { danger: false }) : bad()
    if (s.scr === 'urgent') return n === 1 ? go('confirm') : n === 2 ? go('exit') : bad()
    if (s.scr === 'confirm') {
      if (n === 1) { const c = submit({ category: s.cat, description: 'Sample: report made through the USSD demonstration.', danger: s.danger }); return go('done', { last: `${c.ref}/${c.pin}` }) }
      return n === 2 ? setS(init) : bad()
    }
    if (s.scr === 'ref') return v ? go('pin', { ref: v }) : bad()
    if (s.scr === 'pin') return go('result', { last: v })
  }
  const key = (k: string) => { if (dialed && s.scr !== 'exit' && s.input.length < 8) setS({ ...s, input: s.input + k, msg: '' }) }
  const back = () => setS(o => o.hist.length ? { ...o, scr: o.hist[o.hist.length - 1], hist: o.hist.slice(0, -1), input: '', msg: '' } : o)
  const reset = () => { setS(init); setDialed(false) }

  const btn = 'rounded-lg bg-mist py-3 text-lg font-bold text-ink active:bg-marigold'
  return (
    <div className="mx-auto max-w-6xl px-5 pt-6">
      <h1 className="text-4xl md:text-5xl">{t('Try it on a basic phone.', 'Jaribu kwenye simu ya kawaida.')}</h1>
      <p className="mt-3 inline-block rounded-full bg-ink px-4 py-2 text-sm text-white">{t('Interactive demonstration — not connected to a live telecom network.', 'Onyesho shirikishi — halijaunganishwa na mtandao halisi wa simu.')}</p>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-2">
        <div className="mx-auto w-72 rounded-[2.5rem] bg-ink p-5 shadow-2xl">
          <div className="h-56 overflow-auto rounded-xl bg-[#d8e3c8] p-3 font-mono text-xs leading-snug text-black">
            {dialed ? <><pre className="whitespace-pre-wrap font-mono">{text()}</pre>
              {s.msg && <p className="mt-1 font-bold">{t('Invalid choice.', 'Chaguo si sahihi.')}</p>}
              {s.scr !== 'exit' && <p className="mt-2 border-t border-black/30 pt-1">&gt; {s.input}<span className="animate-pulse">_</span></p>}</>
              : <p>{t('Fictional short code:', 'Namba fupi ya kubuni:')}<br /><b>{CODE}</b><br />{t('Press Dial to start.', 'Bonyeza Piga kuanza.')}</p>}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <button className={`${btn} col-span-3 !bg-clay text-white`} onClick={dialed ? send : () => setDialed(true)}>{dialed ? t('Send', 'Tuma') : `${t('Dial', 'Piga')} ${CODE}`}</button>
            {['1','2','3','4','5','6','7','8','9','*','0','#'].map(k => <button key={k} className={btn} onClick={() => key(k)}>{k}</button>)}
            <button className={`${btn} text-sm`} onClick={back}>{t('Back', 'Rudi')}</button>
            <button className={`${btn} text-sm`} onClick={() => dialed && setS(init)}>{t('Main Menu', 'Menyu Kuu')}</button>
            <button className={`${btn} text-sm`} onClick={reset}>{t('Reset', 'Weka upya')}</button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl">{t('What this screen shows', 'Skrini hii inaonyesha nini')}</h2>
          <p className="mt-2 rounded-2xl bg-marigold/40 p-5">{dialed ? note[s.scr] : t(`Dial the fictional code ${CODE}. No real USSD service exists.`, `Piga namba ya kubuni ${CODE}. Hakuna huduma halisi ya USSD.`)}</p>
          <h2 className="mt-8 text-2xl">{t('Try these paths', 'Jaribu njia hizi')}</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>{t('Report: 1, choose a concern, answer the safety question, confirm. Then sign in to the responder dashboard in this tab to see it (address in the testing guide).', 'Ripoti: 1, chagua tatizo, jibu swali la usalama, thibitisha. Kisha ingia kwenye dashibodi ya wahudumu kwenye kichupo hiki kuiona (anwani ipo kwenye mwongozo wa majaribio).')}</li>
            <li>{t('Follow up: 2, then reference 1001, PIN 4821 (synthetic). New demo reports work too.', 'Fuatilia: 2, kisha namba 1001, PIN 4821 (ya kubuni). Ripoti mpya za onyesho pia zinafanya kazi.')}</li>
            <li>{t('Type a number with the keypad and press Send.', 'Andika namba kwa kibodi kisha bonyeza Tuma.')}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
