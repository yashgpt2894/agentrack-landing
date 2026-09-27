# AgentRack — marketing site

A static rebuild of `agentrack.io`: same product truth, a different visual world.

**Live:** https://yashgpt2894.github.io/agentrack-landing/

This is an independent design rebuild, not the official AgentRack site. The official
site is https://www.agentrack.io/. Product facts, pricing and the founder's note are
carried over from there; the design is not.

## Run it

No build step, no dependencies. Serve the folder and open `index.html`:

```
python3 -m http.server 8412
```

Then visit <http://127.0.0.1:8412/>. Opening `index.html` from the filesystem
also works, though the self-hosted fonts need a server in some browsers.

## Files

| Path | What it is |
|---|---|
| `index.html` | The marketing page: hero, market figures, the registry board, six capabilities, three buyers, onboarding, the founder's note, pricing, the audit request. |
| `privacy.html`, `terms.html` | The two legal pages, carried over from the live site. |
| `styles.css` | Every token, layout rule and component. Rationale lives in `DESIGN.md`. |
| `main.js` | The discovery scan, registry filters, circuit trace, audit form, reveal-on-scroll. |
| `fonts/` | Archivo variable (latin + latin-ext), self-hosted. No CDN at runtime. |
| `assets/mark.svg` | The favicon, using the brand's own mark. |
| `PRODUCT.md` | Captured product truth: users, positioning, capabilities, evidence, undecided facts. |
| `DESIGN.md` | The committed visual world: palette, type, interaction, motion. |

## What works without JavaScript

Everything renders. The registry lists the 16 registered agents with all their
figures; the two unregistered agents stay off it, and a note says so. The
discovery scan, the filters, the circuit trace and the form need JavaScript.

## The audit form

Posts `{ email, source }` as JSON to `https://formspree.io/f/xkoaqaen`, the same
endpoint the live site uses. There is no backend in this repository.

## Mobile

The header collapses to one 62px row with a Menu panel; touch targets are 44px
wherever the pointer is coarse; the register shows six rows with a "Show the other
12 agents" button, and the discovery scan expands it. See `DESIGN.md` for the full
account. Without JavaScript the header falls back to a scrollable nav row and the
register shows every row at once.

## Verified

- No console errors and no failed requests at 1440, 1280, 768, 390 and 360 px.
- No horizontal overflow at any of those widths.
- No interactive target under 44x44 on a phone, and none under 24x24 at any width
  (WCAG 2.2 SC 2.5.8).
- Menu opens, traps nothing, closes on Escape and returns focus; the register
  disclosure, the scan and the filters were all exercised through the browser.
- Every text token pair meets WCAG AA contrast; the pairs were measured, not eyeballed.
- Keyboard: visible focus rings, scan and filters are real buttons, filter chips
  carry `aria-pressed`, the scan status is a live region.
- `prefers-reduced-motion: reduce` renders the final state of every animation.
