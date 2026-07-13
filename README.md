# ⚡ Circuit Startup — Electronics Store Simulation

A classroom business simulation for college student teams: start an electronics
store with **$20,000**, survive **12 monthly turns**, and finish with the highest
business valuation. Runs entirely in the browser — no backend, no login, no build
step, no external dependencies.

**Play it:** open `index.html` in any modern browser, or visit the GitHub Pages
URL for this repository.

## For instructors

- One 45-minute class period: teams play in parallel (one laptop per team,
  25–35 minutes per playthrough) and write their final valuation on the board.
- Three market segments (budget / mainstream / high-end) with deliberately
  different economics, each viable with a different strategy:
  - **Budget** — volume and cost control
  - **Mainstream** — marketing timing and the holiday season
  - **High-end** — inventory discipline, trained staff, and reputation
- Cash ≤ $0 at any point = bankruptcy (with a recap and lesson).
- Survivors get a valuation = cash + (avg. last-3-months profit × 10) +
  inventory & assets − debt, × ownership kept. Badges and a per-segment note
  keep cross-segment comparison honest.
- Ends with reflection questions generated from the team's actual playthrough.

Randomness is seeded from the team + store name, the first month is event-free,
and no negative events land back-to-back in the opening months, so no team can
draw an unwinnable game.

## Development

Everything lives in `index.html`. The game engine is the first `<script>` block
(pure logic, no DOM) so it can be extracted and simulated headlessly; the UI is
the second block. To update: edit, commit, push — GitHub Pages redeploys
automatically.
