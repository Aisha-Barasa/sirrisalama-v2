# SirriSalama: guide for testers

Thank you for testing. This is a prototype. Every service, partner and phone number other than the
emergency numbers is fictional. Please do not enter real details about real people.

## Two parts, two addresses
1. **Public site** (what a survivor sees): open the address you were given.
2. **Responder dashboard (WeCare)**: add `/responders` to the end of the same address, **in the same
   browser tab**. Sign in with:
   - Username: `responder`
   - Password: `wecare-test`

WeCare is not linked anywhere on the public site, on purpose: a survivor on a shared phone should never
stumble into it.

## Why "same tab"?
Nothing is sent to a server. Reports are kept in the browser tab, so the dashboard can only see reports
made in that tab. Closing the tab, or pressing Quick exit, deletes everything.

## Things to try
- Make a report and choose **"Yes, I am in danger now"**. The emergency notice appears at once.
- Find the new concern types: **FGM** and **Child marriage**.
- Read "Who reads your report" and "What happens next". Is it clear?
- Make a report, then open `/responders`, sign in, change its status and send a message.
  Then go back to the public site, open **Follow up** and enter your reference and PIN.
- Press **Quick exit** (bottom right), or press Shift three times. Then press Back.
- Try the basic-phone demo on **USSD demo**: dial, press 1 to report, answer "Yes" to danger.
- Switch between English and Kiswahili (top right).

Existing test case: reference `SS-1001`, PIN `4821`.

## Please tell us
- Anything that confused you, or that you think could put a survivor at risk.
- Wording that feels cold, unclear or wrong, in either language.
- The phone and browser you used.
