# LUMO PUPPIES

Mobile-first Turkish editorial website. Next.js App Router, TypeScript, Tailwind CSS, ESLint, npm. Entire site exports to static HTML in `out/`. No database, API, server actions, CMS, checkout or runtime hosting dependency.

## Local use (PowerShell)

```powershell
Set-Location "$env:USERPROFILE\Desktop\lumo-puppies"
npm install
npm run dev
```

Open http://127.0.0.1:3000. Stop with Ctrl+C. If your environment prevents npm cache writes, append `--cache .\work\npm-cache` to npm install.

## Checks

```powershell
npm run lint
npm run typecheck
npm run check:content
npm run build
```

Build generates every route, custom 404, robots.txt and sitemap.xml. Rebuild after changing data or media. Production export does not support arbitrary new slugs without rebuilding.

## Edit content

- `src/data/site.ts`: editorial copy, approved contact channels, canonical origin, logo and global media; publication switch.
- `src/data/breeds.ts`: educational breed guides, sources, actual availability flag and photography.
- `src/data/puppies.ts`: profiles, photographs, records, parents and publication flags.
- `src/data/awards.ts`, `testimonials.ts`, `team.ts`, `faq.ts`: their named content.
- `src/types/content.ts`: field definitions.
- `src/app/globals.css`: design tokens, mobile-first composition, responsive and reduced-motion rules.

No verified puppy details were supplied. Taco is an unpublished data record, omitted from listings and sitemap, with a noindex holding page. Its only supplied fact is its name. Breed guides describe general traits and do not assert Lumo availability. No invented reviews, people, health records or awards are displayed.

Read CONTENT_CHECKLIST.md and ASSET_CHECKLIST.md before launch. Source copy is proposed brand positioning, not evidence of operational practices. Approve it with the business owner.

## Media and evidence

`MediaAsset` supports separate desktop/mobile sources, focal positions, ratios, dimensions and alt text. `Media` emits a native picture element; the mobile source replaces the desktop source before download. Gallery uses native swipe/scroll snap, keyboard scrolling and explicit previous/next controls. Videos are opt-in and load only when played. Hero is deliberately image-first; no video is fetched automatically.

Use real Lumo media, set meaningful Turkish alt text and inspect both 390px and 430px crops. Blank assets show labeled typographic holding spaces. These are not substitute documentary evidence. Set the original logo path only after placing the file at public/brand/lumo-logo.png.

Proof, awards and team render only when verified. Family stories require verified AND consent. A published puppy is not a blanket verification of its records: each parent, development note and document has its own verified flag. Adding data never bypasses those checks.

## Contact

Blank channels render no fake links. Once an actual email is configured, the minimal form opens the user's email application; it does not claim server delivery. Other configured channels link directly to WhatsApp, telephone, Instagram or Messenger. There is no form backend. The mobile contact bar disappears near contact sections/footer and on the contact route. It respects the bottom safe area.

## Launch and indexing

`site.launchReady` is false until the real material is supplied and approved. Crawling/indexing remain disabled; the sitemap contains no invented host when the domain is blank. Set NEXT_PUBLIC_SITE_URL to the exact HTTPS production origin, complete the checklists, then set launchReady true and rebuild. The content check fails for missing launch essentials. Search/OG/X titles and descriptions are per route; set real social imagery only when available. No fake company address or LocalBusiness schema is emitted.

## Visual QA

Validated browser viewports: 390×844, 430×932, 768×1024 and 1440×1000. See QA_REPORT.md for measured checks and remaining launch limitations. Desktop Chromium emulation cannot certify a physical iPhone/Android device; repeat the short device checklist after real media is added.

## Deployment

See DEPLOY_NETLIFY.md. Nothing has been published. Fonts are bundled locally and retain their package OFL licenses. Asset/image licenses must be supplied for uploaded real material.


## Campaign redesign (phase two)

The technical foundation and publication gates remain unchanged. Additional campaign copy and the four principle-image slots live in src/data/editorial.ts. The recomposed visual system is in src/app/globals.css; the shared motion language is in src/app/motion.css. No motion dependency was added.

The centred header opens a full-screen native dialog at all widths. Its close transition is short, body locking preserves the original scroll position, and the close control stays available on short screens. Reduced motion disables the sequence and closes immediately. Native touch scrolling and gallery snapping remain intact.

The small Motion component observes only below-fold marked content. Server-rendered content starts visible. With JavaScript unavailable or reduced motion enabled, no reveal state hides content. Desktop-only sticky reading columns are ordinary CSS; phone sections scroll normally.

The previous visual source is preserved in work/phase-one-design/. This backup is excluded from TypeScript and lint. See REDESIGN_QA.md for the final responsive, motion and production checks. No fictional layout fixtures are stored in public/ or exported.
