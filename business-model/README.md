# Business Model Toolkit

An interactive circular business model. The customer sits in the middle; eight
business functions surround them as pie slices. Clicking any slice — or the
customer in the centre — opens a panel with that function's worksheets and tools.

**Live URL:** `https://<user>.github.io/Startup-Game/business-model/`
(the root of this repo serves the Circuit Startup simulation, so this site lives
in its own folder).

Runs entirely in the browser: no backend, no build step, no external
dependencies, no fonts or scripts loaded from anywhere else.

## Files

| File | What it is |
|---|---|
| `index.html` | Page structure and the SVG icon sprite |
| `assets/data.js` | **All content.** Segments, copy, and the worksheet lists |
| `assets/app.js` | Draws the wheel, the card index, and the panel |
| `assets/styles.css` | Everything visual, including light and dark themes |
| `worksheets/` | Where the actual worksheet files go, one folder per segment |

---

## Adding a worksheet or tool

This is the whole process. You only ever touch `assets/data.js`.

**1. Put the file in the right folder.** One folder per segment already exists:

```
worksheets/customer/
worksheets/marketing/
worksheets/sales/
worksheets/operations/
worksheets/finance/
worksheets/accounting/
worksheets/human-resources/
worksheets/information-technology/
worksheets/rnd-innovation/
```

Any file type works — `.pdf`, `.docx`, `.xlsx`, `.pptx`, `.csv`. Use lowercase
filenames with hyphens instead of spaces (`positioning-statement.pdf`, not
`Positioning Statement.pdf`), because spaces have to be escaped in URLs.

**2. Point the entry at it** in `assets/data.js`. Find the segment, find the
resource, and add one `file:` line:

```js
{ title: 'Positioning Statement Worksheet', kind: 'Worksheet',
  desc: 'Fill-in-the-blank framework for who you serve and why you win.',
  file: 'worksheets/marketing/positioning-statement.pdf' },
```

The card immediately changes from a greyed-out "Coming soon" to a live
**Download PDF** link, and the segment's footer count updates itself.

**3. Commit and push.** GitHub Pages redeploys on its own.

### Linking to a tool instead of a file

Use `link:` for anything that lives elsewhere — a Google Sheet, an Airtable
base, a Notion page, a calculator on another site:

```js
{ title: 'Break-Even Analysis', kind: 'Calculator',
  desc: 'Fixed costs, contribution margin, and the volume that clears them.',
  link: 'https://docs.google.com/spreadsheets/d/…' },
```

Links open in a new tab. If an entry has both `file` and `link`, the file wins.

### Adding a brand new resource

Copy any existing entry into the same `resources: [ … ]` array. Only `title`,
`kind`, and `desc` are required — an entry with no `file` or `link` renders as
"Coming soon", which is a perfectly good way to publish a roadmap.

`kind` is just badge text. The ones already in use are Worksheet, Template,
Canvas, Calculator, Checklist, Playbook, Guide, and Tracker; anything short
works.

---

## Other things you can change without touching code

Everything below is in `assets/data.js`.

- **Site name and hero copy** — the `brand` block at the top.
- **Segment names, taglines, summaries, questions** — each segment object.
- **Segment colours** — the `color` field. The wheel derives its gradient,
  hover, panel header, and badge tints from that one value. Keep it dark enough
  for white label text to stay readable (roughly `#8x` or darker).
- **Wheel labels** — `lines` is the label on the wheel, split into up to two
  lines; `short` is the version used on phones, where there is less room.

## Changing the number of segments

The wheel divides 360° by however many entries are in `segments`, so adding a
ninth or dropping to six just works — the slices, gaps, labels, and keyboard
order all follow. New segments need an icon: add a `<symbol id="ic-…">` to the
sprite at the top of `index.html` (24×24 viewBox, stroked, `fill="none"`) and
reference its id in the segment's `icon` field.

## Replacing the blank profile image in the centre

The centre is drawn as SVG (a disc plus a generic silhouette) in the
`buildWheel()` function of `assets/app.js`, so it stays sharp at any size and
follows the light/dark theme. To use a real image instead, swap the two
`avatar-fg` shapes for:

```js
'<image href="assets/customer.jpg" x="328" y="282" width="144" height="144" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice"/>' +
```

## Notes on how it behaves

- **Deep links.** Opening a segment sets the URL hash (`…/business-model/#finance`),
  so you can link straight to one part of the model. Loading that URL opens the
  panel on arrival.
- **Keyboard.** Every slice is a real button: Tab to move through them, arrow
  keys to move around the wheel, Enter or Space to open, Esc to close.
- **Themes.** Follows the operating system by default; the toggle in the header
  overrides it and the choice is remembered.
- **Motion.** All animation is disabled for anyone with
  "reduce motion" turned on.
- **JavaScript is required** — the wheel and the card list are both built from
  `data.js` at load.

## Local development

No build step. Because the page loads `assets/*.js` as separate files, some
browsers block them over `file://`, so serve the folder instead:

```
npx http-server -p 8000        # from the repository root
# then open http://localhost:8000/business-model/
```
