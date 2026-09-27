# Design

<!-- impeccable:design-schema 1 -->

## Mode

Persuade. The marketing surface. The product's own control plane is an Operate
surface and lives elsewhere; do not let its dashboard habits structure this page.

## Visual world

**The distribution board and its schedule.** An enterprise agent estate is a
building's electrical installation nobody finished documenting: every breaker
labelled by a different hand over years, some labels wrong, some circuits feeding
two rooms, some positions unlabelled and still live. Agent debt is exactly that
condition, and AgentRack is the electrician who traces every circuit and leaves a
correct schedule inside the door.

So the page is built as the enclosure, not as a picture of one. The hero is the
opened door: the enamel leaf carries the printed offer, the dead-front inside
carries the estate. Structure comes from the board's own grammar — the ruled
dead-front grid, engraved position strips, harmonic conductor colour, indicator
lamps, and the laminated procedure card.

### Refused, on purpose

Recorded so later work does not drift back:

- The dark neon-teal SaaS landing page this product already is. Distinctly not
  the ground, not the composition, and not the state vocabulary.
- Its predictable opposite: warm cream ground, high-contrast serif display,
  small tracked mono labels, broadsheet hairlines.
- Card grids as page structure. Every section is a ruled grid, a ruled rows list,
  or hairlines — never a field of equal rounded rectangles.
- The hero-metric template. Market statistics appear as a reference table with a
  source column, because the product's own principle is that a number without a
  source does not ship.
- Eyebrows and kickers. Headings carry their own weight.
- Unicode glyphs standing in for icons. The small icon set is authored SVG at one
  stroke weight.

## Colour strategy

Committed. One enamel field owns half the page; the interior plate owns the other
half. Saturated colour is a note, not decoration: teal marks AgentRack itself and
the primary action, amber marks redundancy and waste, red marks scope drift.

### Physical scene

An infrastructure lead and a compliance officer stand in a plant room on a Tuesday
morning. Fluorescent light on powder-coated enamel, dust in the louvres, a
laminated schedule inside the door that four people have written on. That scene
decides the palette: a light industrial ground, not a dark one.

| Token | Value | Use |
|---|---|---|
| `--field` | `#A9B79F` | the enamel leaf; the page's dominant ground |
| `--field-deep` | `#97A68C` | alternating runs of the same enamel |
| `--field-lift` | `#BAC6B0` | the raised ivory-adjacent panels |
| `--ink` | `#14161A` | printed and engraved black: headings, body, rules |
| `--ink-2` | `#3A4236` | secondary copy on enamel (4.9:1) |
| `--plate` | `#1B211D` | the dead-front interior |
| `--plate-2` | `#232A25` | rows and wells inside the dead-front |
| `--ivory` | `#EFEDE4` | label strips, procedure card, form |
| `--ivory-2` | `#DEDCCF` | engraved strip shading |
| `--lamp-live` | `#00D9C8` | the brand teal. AgentRack's own circuit, the primary action |
| `--lamp-warn` | `#F0A93C` | redundancy and recoverable spend |
| `--lamp-fault` | `#EC6A5E` | scope drift |

Teal is confined to fills and lamps. `#00D9C8` measures 1.2:1 against the enamel
field, so it is never text on enamel and never a focus ring there; on the plate it
measures 9.1:1. Focus rings are ink on enamel and teal on the plate.

## Type

One family, two widths: **Archivo** variable, self-hosted (`fonts/Archivo-var-*.woff2`),
`wdth 62–125` and `wght 100–900`. Chosen because a distribution board's lettering
and its printed schedule are the same grotesque at different widths — the engraved
position strips are condensed heavy caps, the schedule is normal width.

- Display: `wght 700`, `wdth 88`, tracking `-.028em`, line-height `.98`, max `5.25rem`.
- Engraved strips: `wdth 68`, `wght 600`, uppercase, tracking `.12em`, 11–12px.
- Body: `wght 400`, 17px, line-height `1.62`, measure 68ch.
- All figures `font-variant-numeric: tabular-nums`. No monospace face is used;
  mono would be a costume for a page whose data is already tabular.

## Signature interaction

**Tracing a circuit.** Requesting the discovery scan sweeps the board once, then
two unregistered positions light from dark and join the register as shadow agents
with no owner. Hovering or focusing a redundancy cluster draws its two conductors
to a common node before the row states change.

## Motion

One authored moment, the scan. Exponential ease-out (`cubic-bezier(.16,1,.3,1)`)
from an already-visible default; reveal-on-scroll is `IntersectionObserver` with a
visible fallback when JavaScript is off. All motion collapses to the static final
state under `prefers-reduced-motion: reduce`.

## Small screens

The world does not shrink; it re-proportions. Below 900px:

- **The header is one 62px row** (was 106px, two rows): brand, then a Menu button
  whose three bars reuse the brand mark. The links move into a full-width panel on
  the plate — 52px rows, hairline separators, the primary action as a teal block at
  the foot. Escape closes it and returns focus to the button; the panel contains the
  action the bar gives up.
- **Touch sizing is keyed to the pointer, not the width.** `@media (pointer: coarse)`
  raises every control to a 44px minimum, so a touch laptop gets it too. Nothing
  interactive is under 44x44 on a phone and nothing under 24x24 anywhere, which is
  WCAG 2.2 SC 2.5.8 at every width.
- **The register is disclosed, not truncated.** Six rows show, then a full-width
  "Show the other 12 agents" button. The discovery scan expands the register itself,
  because the two shadow agents it finds are the point.
- **A row becomes a record, not a table.** Name and state share the first line; the
  cluster note takes its own; the values follow on two lines, with small caps on the
  only two that are ambiguous without a header (Team, Owner). Row height 166px to 127px.
- **Reader text grows; engraved labels grow less.** Values go to 15.2px, readout
  details to 14px, body copy to 16px. The letterspaced micro-labels stay smaller
  because they are the world's engraving, not its reading matter.
- **The hinge becomes a plain 2px rule.** At 390px three knuckles read as three
  floating blocks; the door idea survives on the enamel/plate split alone.

Nothing is hidden on a phone that exists on a desktop: the two long register rows
are disclosed on demand, and the no-JavaScript fallback shows all of them at once.
