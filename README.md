# Personal academic website

Plain HTML/CSS/JS — no build step. Open `index.html` in a browser, or serve locally:

```bash
cd personal-site
python3 -m http.server 8899
```

## Editing content

Everything lives in **`js/data.js`** — no HTML editing needed for content:

| What | Where |
|---|---|
| Name, role, headline, subhead, email, Scholar/GitHub/ORCID | `PROFILE` |
| The 3 hero numbers | `METRICS` |
| Closed-loop stages (`detail` on hover/tap, `phase` = comp/exp color) + center label | `LOOP` / `LOOP_NOTE` / `LOOP_CENTER` |
| About paragraph | `ABOUT` |
| "Work with me" invitation (headline, pitch, what-I-bring, CTA) | `WORKWITHME` |
| Research directions (4 pillars) | `PROJECTS` |
| Publications | `PUBLICATIONS` (`first:` = 1st/co-1st badge; `selected:` = homepage; `image:`+`imageCaption:` = figure) |
| News timeline | `NEWS` |
| Education, projects, skills, honors, patents | `CV` |

Notes:
- Your name is bolded in author lists automatically — only exact `"J. Kim"`
  tokens match, so `S. J. Kim` / `J. H. Kim` are never falsely bolded
  (`HIGHLIGHT_AUTHOR` at the bottom of `data.js`).
- The homepage shows metrics + closed loop + directions + `selected` papers;
  `/publications.html` lists all entries grouped by year.
- Leave `github` / `orcid` as `""` in `PROFILE` and those links auto-hide.
- **Fill in `PROFILE.scholar`** (marked `TODO`) with your real Google Scholar URL.

### Photo, figures & PDF (drop-in — no code changes)

- **Profile photo** → save as `assets/portrait.jpg`. It swaps in over the "JK"
  monogram automatically once the file exists (square image works best).
- **Publication figures** → put an image in `assets/pubs/` and point a
  publication's `image:` field at it (with an optional `imageCaption:`). The
  figure shows under that paper on the homepage (for `selected` entries).
  The flagship Nature Communications figure is already wired up as an example.
- **CV PDF** → save as `assets/cv.pdf` (the Download button on `cv.html` links to it).
- Theme colors → CSS variables at the top of `css/style.css`.

### Interactive bits (all pure JS, low-maintenance)

- **Closed-loop diagram** — hover/tap a stage to reveal its one-line detail.
- **Publications-per-year chart** — bars are derived from `PUBLICATIONS`; click a
  year to jump to it in the list (resets the filter to All and highlights the year).
- **Publications filter** — All / First-author / Featured chips re-render the list.
- **Scroll reveal** — sections fade up as they enter view (respects reduced-motion).
- **Scroll progress bar** + **light/dark toggle** (remembered per browser).

Prefer a fully static site? Delete `setupReveal()`, `setupProgress()`,
`setupPubFilter()`, and the loop's hover handlers from `js/main.js` — the
content still renders from `js/data.js` exactly the same.

## Deploying to GitHub Pages

```bash
cd personal-site
git init && git add -A && git commit -m "Initial site"
# create a repo named <username>.github.io on GitHub, then:
git remote add origin git@github.com:<username>/<username>.github.io.git
git push -u origin main
```

Enable Pages in the repo settings (Deploy from branch → `main` → `/`).
The site will be live at `https://<username>.github.io`.
