# LUMO PUPPIES — final redesign QA

Completed locally on 12 September 2026 in the existing Desktop/lumo-puppies project. The approved redesign, routing, central content architecture, static export and publication gates were preserved.

## Mobile and visual refinements

- Reviewed 390px and 430px first: campaign opening, intentional headline wraps, readable supporting labels, CTA spacing, numbered principles, breed chapters, portrait layouts, about and footer.
- Tightened mobile section spacing and care/about headlines without flattening the asymmetric composition.
- Full-screen menu preserves scroll position, traps keyboard focus, restores focus on dismissal and keeps the close control reachable on short screens. Tested 568px and 1100px screen heights, repeated open/close, Escape and route navigation.
- Mobile contact actions and gallery navigation checked. Gallery snapping does not replace native page scrolling. Safe-area CSS is present; physical notch behavior has not been tested on a device.
- Desktop checked at 768px, 1100px and 1440px. No horizontal overflow found.

## Motion

- One small IntersectionObserver enhancement; no new animation package.
- Below-fold content reveals once. Server-rendered content starts visible.
- Reduced motion removes reveal transforms and animation delays; live preference changes reset pending elements. Menu dismissal becomes immediate.
- No-JavaScript content visibility and primary navigation links checked.

## Verification

- 48 production route/viewport combinations passed, including the expected 404.
- 11 internal link targets checked; one H1 per route, no broken images or overflow.
- No JavaScript page errors recorded during the QA run.
- Mobile gallery, form validity, media source selection and populated puppy/profile/award/family/team layouts passed using explicitly labelled synthetic fixtures outside the project export. No fixture content was added to the public site.
- 10 evidence/publication gate tests passed.
- Final npm run build passed: 15 generated static pages. ESLint passed.

## Performance observations

Local production browser checks, without network or CPU throttling: home CLS 0.0026 at 390px and 0.0027 at 430px; maximum observed across checked routes/viewports 0.0479. Home LCP was 308ms and 324ms respectively. These are local lab observations, not field or physical-phone measurements.

Home loaded script bodies totalled 469,779 bytes through the uncompressed QA server; separately compressing exported home script files with gzip totalled 181,811 bytes. No heavy motion library or video was introduced. Actual photo weight and final subject crops must be rechecked when real assets are supplied. Fonts remain local, and non-hero media uses the existing lazy-loading structure.

## Remaining real content

Real hero/mobile crops, puppy photography and verified profiles, Lumo Standard imagery, team portraits and biographies, awards evidence, consented family stories, official contact details, brand logo and legal/site details remain TODO. The asset checklist includes dimensions and focal-point guidance. No fabricated evidence or generated puppy photography was added. Launch remains disabled/noindex until the required material is supplied and verified.

Local preview: http://127.0.0.1:3000/

Raw checks: qa-results.json. Screenshots beside this report include final-* production pages and clearly labelled fixture-* layout tests.
