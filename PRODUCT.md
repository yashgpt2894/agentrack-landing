# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/vanilla JS with self-hosted webfonts. No build step, no framework,
no CDN at runtime.

(delegated: the repository already decides it. `infyforge-site` ships hand-authored
static pages — `site/index.html` + `site/styles.css` + `site/main.js` with self-hosted
Geist woff2 files — and the live AgentRack site itself is served as static files
(`index.html`, `privacy.html`, `terms.html`, `agentrack-mvp.html`). The new surface
follows that same deployable-static-file convention, so a checkout can be dropped on
any static host unchanged.)

## Users

Three buyers, each already running agents in production, each arriving mid-evaluation
from a search, a peer referral, or a LinkedIn post. They are skeptical and time-poor.

- **CIO / CTO.** Agents were bought or built team by team, never centrally. Job: get a
  complete, always-current registry of every agent with a named owner.
- **CFO / the person who signs the AI line item.** AI spend rose with no attribution.
  Job: turn the LLM bill into cost per team, agent and use case, and get a euro figure
  for duplicated work.
- **Head of AI / Compliance, EMEA.** The EU AI Act high-risk obligations land in
  August 2026 and there is no audit trail. Job: produce continuous, export-ready
  documentation of what each agent does and what data it touches.

## Product Purpose

AgentRack finds every AI agent running inside an enterprise — who built it, what it
costs, where it overlaps — and turns that sprawl into one control plane. It exists
because agents multiply faster than central visibility. Success is a customer who can
name every agent in the organisation, name its owner, and act on the ones that are
duplicated, drifted or idle.

## Positioning

Agent **debt**, not agent **building**. AgentRack does not create agents and does not
sit in the request path of one. It governs the estate that already exists: semantic
redundancy detection across teams, continuous scope-drift monitoring against the
registered purpose, and token-level cost attribution. Pricing follows the same logic —
per agent monitored, not per human seat. The free agent audit is the wedge: the
customer keeps the findings whatever they decide.

## Operating Context

- The estate is heterogeneous by default: Claude, GPT-4o, Gemini, LangChain and CrewAI
  agents coexist, usually unregistered.
- Discovery reads what already exists — API logs, webhook registrations, LLM usage —
  rather than asking teams to register agents by hand. A scan surfaces **shadow agents**:
  running, unowned, unapproved.
- Named integrations: Azure, Google Workspace, Slack, ServiceNow, GitHub, MCP, generic API.
- Recurring artefacts: the **agent registry** (one row per agent: name, team, platform,
  monthly cost, calls, owner, status) and the **AI technical debt score** (0–100, higher
  is healthier). Status vocabulary: Healthy, Redundant, Scope drift, Idle.
- Remediation is presented as concrete actions with a euro value: consolidate a cluster,
  retire an idle agent, investigate drift.
- Evaluation happens before purchase: a free audit for the first 20 enterprise teams, a
  readout call, no rebuild and no data migration.

## Capabilities and Constraints

Confirmed capabilities: agent discovery; redundancy detection with a semantic-overlap
percentage; scope-drift monitoring; LLM cost attribution; agent lineage map; EU AI Act
readiness documentation. Setup is under 30 minutes with no agents to rebuild.

Constraints: there is no self-serve signup — every CTA leads to an audit request or a
conversation. Private beta, limited spots. Compliance framing is EMEA-first.

Terminology to keep exact: *agent estate*, *control plane*, *shadow agent*, *agent debt*,
*debt score*, *scope drift*, *redundancy cluster*, *recoverable spend*, *readout call*.

Explicitly undecided: customer logos, named case studies, uptime or security
certifications, and any post-beta general-availability date. None may be invented.

## Brand Commitments

- Name **AgentRack**, one word, capital R. Mark: three stacked bars, middle bar accented.
- Signature accent **#00D9C8** teal; text **#EEF2FF** on the incumbent near-black. Amber
  carries redundancy and waste, red carries scope drift. These are the brand's semantic
  colours and stay semantic, whatever ground the new surface chooses.
- Voice: plainly stated, numeric, unhurried, unhedged. Short declarative sentences.
  Existing lines worth keeping: "One rack. Every agent." and "Get the audit before the
  auditors do."
- Geographic anchor: Amsterdam, NL. The founder is named on the page.
- The user's binding instruction for this surface: **classy**, high quality, refined.
  The new design must not copy the incumbent site's look.

## Evidence on Hand

- Live marketing site `https://www.agentrack.io/`: hero, four sourced market statistics
  (Gartner 150k agents per Fortune 500 company by 2028; McKinsey 80% reporting risky
  live-agent behaviour; 65% saying adoption outruns understanding; 26% with a
  comprehensive AI governance policy), a control-plane preview, six capabilities, three
  buyer personas, a three-step onboarding, a founder quote, and an audit-request form.
- Live MVP demo `https://www.agentrack.io/agentrack-mvp.html`: five views (Overview,
  Agent registry, Redundancy, Drift monitor, Pricing) over a seeded estate of 16
  registered agents across 12 teams plus 2 shadow agents, with a debt score that moves
  when a cluster is resolved.
- Real numbers from that demo estate: 18 agents after a scan, 9 redundant pairs,
  4 drifted agents, €4,200/month recoverable spend, debt score 68/100.
- Real agent rows, purposes, owners, platforms and monthly costs (ProcureBot v2,
  SupplierScout, MeetingMind, NotesBot, StandupGPT, InvoiceAI, ChurnSense, HR Screener,
  ContractGuard, TicketTriage, LeadQualifier, DataDocBot, CampaignCopy, SpendAnalyzer,
  PolicyPal, AuditTrailGen, QuoteWizard, SlackDigest).
- Published pricing: Agent Audit (free, one-time), Growth (€1,500/month, up to 100
  agents), Enterprise (custom, annual, unlimited agents).
- Founder: Varun Kukreja, 13+ years selling and architecting enterprise software across
  EMEA, Amsterdam.
- Legal pages: privacy policy and terms of service, both dated 12 June 2026, both with
  real text that must survive the redesign.
- Contact channel: `hello@agentrack.io`.

Absent and not to be fabricated: customer logos, testimonials other than the founder's,
security certifications, funding announcements, headcount, uptime figures.

## Product Principles

1. **Show the estate, do not describe it.** A claim is cheaper to believe when a real
   registry row sits next to it.
2. **A number with a source beats an adjective.** Market claims carry the analyst's name
   or they do not appear.
3. **Sell the debt, not the dream.** The value is what AgentRack removes: duplicate
   spend, unowned agents, unprovable compliance.
4. **The audit is the doorway.** Nothing on the page may demand more commitment than
   requesting the free audit.
5. **Governance is a serious subject.** The surface earns trust by being exact and
   legible, never by being louder than the buyer's board.

## Accessibility & Inclusion

European enterprise audience, procurement-reviewed. Target WCAG 2.1 AA: body and
placeholder contrast at or above 4.5:1, visible keyboard focus on every control, full
keyboard operability of navigation and the audit form, and a static final state under
`prefers-reduced-motion`. All interface text in English.
