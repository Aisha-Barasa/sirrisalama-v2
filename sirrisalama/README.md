# SirriSalama — Together with you

Prototype GBV reporting and support platform for testing. **All services and partners are fictional.**
Reports are kept in the browser tab only (sessionStorage): they survive a reload, are never sent to a
server, and are deleted when the tab closes or Quick exit is pressed.

## Setup
```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # type-check + production build
```
Stack: React 18, Vite, TypeScript, Tailwind CSS 3, React Router 6, lucide-react.

## Routes
Public (what reporters see, all with the Quick exit button):
- `/` landing · `/report` anonymous report · `/follow` follow-up and chat (reference + PIN)
- `/support` support finder · `/ussd` simulated phone, fictional code `*555#`

Responder area (not linked from any public page, sign-in required):
- `/responders` WeCare dashboard. Test sign-in: `responder` / `wecare-test`
- The old `/wecare` address now redirects to the home page.

Seeded follow-up credentials: `SS-1001` / PIN `4821`.

## Safety features
- **Quick exit**: fixed button on every page, or press Shift three times. Blanks the screen, clears the
  tab's storage and replaces the page with a Google search, so Back does not return. Destination in
  `src/components/QuickExit.tsx`. All in-app links use `replace` so the site leaves one Back entry.
- **Emergency numbers**: one list in `src/data.ts` (`EMERGENCY_NUMBERS`). Phone each one and fill in
  `VERIFIED_ON` before any build goes out.
- **Who reads a report / what happens next**: `src/components/WhoSees.tsx`, partners in `src/data.ts`.
- `<meta name="referrer" content="no-referrer">` so the exit destination does not learn where you came from.

## Not production security
The responder sign-in is a front-end stand-in. The credentials are visible in the source code. A live
service needs server-side authentication, individual accounts and audit logs, and the dashboard on a
separate staff address (e.g. a subdomain).

## Design
Colours: Ink `#12343B`, Teal `#1F6F78`, Clay `#C4472B`, Marigold `#F4B942`, Mist `#DCE8E2` (page sand `#F7F1E8`). Fonts: Fraunces (headings), Plus Jakarta Sans (body).
Translations: inline `t('English','Kiswahili')` pairs from `src/i18n.tsx`; shared labels in the `SW` map in `src/data.ts`. Shared state: `src/store.tsx`.
