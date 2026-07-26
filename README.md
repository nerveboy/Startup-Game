# ⚡ Circuit Startup — Electronics Store Simulation (Porter edition)

A classroom business simulation for college student teams: start an electronics
store with **$30,000**, survive **12 monthly turns**, and finish with the highest
business valuation. Runs entirely in the browser — no backend, no login, no build
step, no external dependencies.

**Play it:** open `index.html` in any modern browser, or visit the GitHub Pages
URL for this repository.

## Two editions

| Edition | Path | URL | Notes |
|---|---|---|---|
| **Classroom** | `index.html` | `/Startup-Game/` | The version to send students. Stable. |
| **Deluxe** | `deluxe/index.html` | `/Startup-Game/deluxe/` | Same game, richer presentation. For future use. |

Both run the **identical game engine** — the deluxe edition splices in the exact
same `<script id="engine">` block, so the economics, balance, and random seeding
are byte-for-byte the same and a given team/store name yields the same playthrough
in either. Only the presentation layer differs.

The deluxe edition adds: a custom SVG icon set, an interactive **Porter 2×2
matrix** that highlights your quadrant live during setup, a waterfall-style demand
stack with proportional contribution bars, radial gauges for reputation and
strategy clarity, a sticky financial HUD, a 12-month seasonality timeline strip,
an animated cash chart with area gradient and crosshair tooltip, animated counters,
floating spend/earn feedback, and confetti on the victory screen. It respects
`prefers-reduced-motion` and is verified free of horizontal overflow on mobile.

## For instructors

- One 45-minute class period: teams play in parallel (one laptop per team,
  25–35 minutes per playthrough) and write their final valuation on the board.
- Setup is built around **Porter's Generic Strategies**: teams choose a
  competitive advantage (low-cost operator vs. premium experience) and a market
  scope (broad vs. focused niche), mapping to Cost Leadership, Differentiation,
  Cost Focus, or Differentiation Focus. All four quadrants are viable when
  played coherently.
- A **strategy coherence** mechanic tracks whether monthly decisions match the
  declared positioning. Consistent play earns a growing demand bonus; drifting
  ("a discount store booking influencers") pushes the clarity meter toward
  **Stuck in the middle** (−10% demand), and the end screen delivers a Porter
  verdict on how they actually executed.
- Demand is fully transparent: a live projection panel itemizes every demand
  multiplier during the decision phase, results reconcile against projections
  (random variation ±10%, disclosed up front), and a next-month preview flags
  seasonality shifts, expiring boosts, and scheduled payments.
- Financing: family & friends (0% but callable), bank loan (8% APR, 12 equal
  payments, exact payment shown before signing), investor pitch (cash for
  equity), crowdfunding, and liquidation sales.
- Cash ≤ $0 at any point = bankruptcy (with a recap and lesson).
- Survivors get a valuation = cash + (avg. last-3-months profit × 10) +
  inventory & assets − debt (bank + family), × ownership kept. Badges and a
  per-strategy note keep cross-quadrant comparison honest.
- Ends with reflection questions generated from the team's actual playthrough,
  including one tied to Porter and their coherence history.

Randomness is seeded from the team + store name, the first month is event-free,
and no negative events land back-to-back in the opening months, so no team can
draw an unwinnable game.

## Development

Everything lives in `index.html`. The game engine is the first `<script>` block
(pure logic, no DOM) so it can be extracted and simulated headlessly; the UI is
the second block. To update: edit, commit, push — GitHub Pages redeploys
automatically.
