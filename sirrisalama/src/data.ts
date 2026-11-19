export type Status = 'New' | 'In review' | 'Support offered' | 'Closed'
export const STATUSES: Status[] = ['New', 'In review', 'Support offered', 'Closed']
export const CATEGORIES = [
  'Physical violence', 'Sexual violence', 'Emotional or verbal abuse', 'Economic abuse',
  'Online harassment', 'Female genital mutilation (FGM)', 'Child marriage', 'Something else',
]
export interface Msg { from: 'reporter' | 'responder'; text: string; at: string }
export interface Note { at: string; text: string }
export interface Case {
  ref: string; pin: string; category: string; description: string; danger: boolean
  date: string; status: Status; reporterUpdate: string; notes: Note[]; messages: Msg[]
}

/*
 * EMERGENCY NUMBERS — shown on the report form, the confirmation screen, the footer,
 * the support page and the USSD demo. Edit them here only.
 * BEFORE SENDING THIS BUILD OUT: phone each number from a Kenyan line, confirm it connects,
 * then fill in VERIFIED_ON with the date and who checked it.
 */
export const EMERGENCY_NUMBERS = ['999', '112']
export const VERIFIED_ON = '' // e.g. '2026-11-20, checked by A. Wanjiru'

/* Trusted partners: the only people who can read a report. All fictional in this test version. */
export const PARTNERS: [string, string][] = [
  ['Demo Recovery Centre: trained GBV caseworkers', 'Kituo cha Kupona (Onyesho): wahudumu waliofunzwa kuhusu ukatili wa kijinsia'],
  ['Demo Legal Aid Network: paralegals', 'Mtandao wa Msaada wa Kisheria (Onyesho): wasaidizi wa kisheria'],
  ['Demo Counselling Partners: licensed counsellors', 'Washirika wa Ushauri (Onyesho): washauri wenye leseni'],
]

const d = (n: number) => new Date(Date.now() - n * 864e5).toISOString()
export const SEED_CASES: Case[] = [
  { ref: 'SS-1001', pin: '4821', category: 'Emotional or verbal abuse', description: 'Sample: A partner controls who I speak to and threatens me when I go out.', danger: false, date: d(6), status: 'In review', reporterUpdate: 'A responder is reviewing your report. Support options will be shared here.', notes: [{ at: d(5), text: 'Sample note: offered counselling referral list.' }], messages: [{ from: 'responder', text: 'Hello, we received your report. Can you talk safely today?', at: d(5) }, { from: 'reporter', text: 'Yes, mostly in the mornings.', at: d(4) }] },
  { ref: 'SS-1002', pin: '7309', category: 'Physical violence', description: 'Sample: I was hurt last night and am afraid to go home.', danger: true, date: d(2), status: 'New', reporterUpdate: 'Your report was received.', notes: [], messages: [] },
  { ref: 'SS-1003', pin: '1156', category: 'Online harassment', description: 'Sample: Someone keeps sending threatening messages from fake accounts.', danger: false, date: d(11), status: 'Support offered', reporterUpdate: 'Support has been offered. A trusted contact point is listed below.', notes: [{ at: d(9), text: 'Sample note: advised on blocking and evidence saving.' }], messages: [] },
  { ref: 'SS-1004', pin: '9042', category: 'Economic abuse', description: 'Sample: My income is taken and I cannot buy food for my children.', danger: false, date: d(20), status: 'Closed', reporterUpdate: 'This case is closed. You can submit a new report any time.', notes: [], messages: [] },
  { ref: 'SS-1005', pin: '3377', category: 'Child marriage', description: 'Sample: My 15-year-old niece is being prepared to marry an older man next month.', danger: false, date: d(1), status: 'New', reporterUpdate: 'Your report was received.', notes: [], messages: [] },
]
export const SUPPORT = [
  ['Demo Support Line', 'Dial 0000 (fictional number)'],
  ['Demo Safe House', 'Fictional location — Example Town'],
  ['Demo Legal Aid Desk', 'Fictional — Mon–Fri'],
]
export const SW: Record<string, string> = {
  'New': 'Mpya', 'In review': 'Inakaguliwa', 'Support offered': 'Msaada umetolewa', 'Closed': 'Imefungwa',
  'Physical violence': 'Ukatili wa kimwili', 'Sexual violence': 'Ukatili wa kingono', 'Emotional or verbal abuse': 'Unyanyasaji wa kihisia au wa maneno',
  'Economic abuse': 'Unyanyasaji wa kiuchumi', 'Online harassment': 'Unyanyasaji mtandaoni',
  'Female genital mutilation (FGM)': 'Ukeketaji (FGM)', 'Child marriage': 'Ndoa za utotoni',
  'Something else': 'Jambo lingine',
  'Demo Support Line': 'Laini ya Msaada (Onyesho)', 'Dial 0000 (fictional number)': 'Piga 0000 (namba ya kubuni)',
  'Demo Safe House': 'Makazi Salama (Onyesho)', 'Fictional location — Example Town': 'Eneo la kubuni — Mji wa Mfano',
  'Demo Legal Aid Desk': 'Dawati la Msaada wa Kisheria (Onyesho)', 'Fictional — Mon–Fri': 'Ya kubuni — Jumatatu–Ijumaa',
}
