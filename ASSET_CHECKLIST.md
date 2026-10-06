# Lumo photography & asset checklist

Production photographs must be real and approved for publication. The owner subsequently authorised illustrative AI examples for the local design preview; these are labelled, stored in public/media/examples and blocked from launch. Never use illustrative material as documentary evidence. Use natural daylight, quiet backgrounds, warm human interaction and uncluttered framing. Supply WebP/AVIF images in sRGB; aim for roughly 80–200 KB on mobile and 200–350 KB for a large desktop hero. Confirm visually after compression.

| Folder / filename                                                | Dimensions / ratio                                      | Mobile framing / photograph needed                                                                                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| public/brand/lumo-original.png; lumo-official.webp | Original 1402×1122 ratio, web copy 700px wide | Supplied official logo now installed in header, menu and footer. Original is preserved unchanged. |
| public/media/hero/hero-mobile-poster.webp                        | 1080×1080, 1:1                                            | Independently framed real puppy and/or gentle human interaction. Keep eyes, face, body and hands clear of all edges. Subject inside middle 75%. |
| public/media/hero/hero-desktop-poster.webp                       | 2400×1050, 16:7                                          | Real Lumo puppy in natural light, quiet interior, space around face; separate desktop composition.                                              |
| public/media/hero/hero-mobile.mp4 (optional future enhancement)  | 720×960, 3:4, H.264, 5–8s                               | Real footage, no sound requirement. Not automatically loaded by V1. Prefer image hero.                                                          |
| public/media/hero/hero-desktop.mp4 (optional future enhancement) | 1600×1000, 8:5                                          | Matching genuine footage; V1 does not fetch this file.                                                                                          |
| public/media/puppies/puppy-taco-01.webp                          | 1200×1500, 4:5                                          | Real Taco's full portrait. Do not identify a substitute dog as Taco.                                                                            |
| public/media/puppies/puppy-taco-02.webp                          | 1200×1500, 4:5                                          | Real Taco at eye level, relaxed detail or supervised interaction.                                                                               |
| public/media/puppies/puppy-taco-03.webp                          | 1200×1500, 4:5                                          | Real full-body portrait in familiar surroundings, all paws visible.                                                                             |
| public/media/puppies/puppy-taco-mobile-01.webp                   | 780×975, 4:5                                            | Use only if the original requires a separate crop. Set mobileSrc and mobileFocalPosition.                                                       |
| public/media/puppies/puppy-taco.mp4 (optional)                   | 720×900, 4:5                                            | Actual behaviour, short unforced clip; provide matching poster. Controls/preload=none in gallery.                                               |
| public/media/breeds/breed-toy-poodle-hero.webp                   | 1200×1500, 4:5                                          | Actual, correctly identified Toy Poodle, owner-approved. No implication of current puppy availability.                                          |
| public/media/breeds/breed-maltese-hero.webp                      | 1200×1500, 4:5                                          | Actual, correctly identified Maltese. Keep complete face and feet in crop.                                                                      |
| public/media/breeds/breed-bichon-frise-hero.webp                 | 1200×1500, 4:5                                          | Actual, correctly identified Bichon Frisé.                                                                                                      |
| public/media/families/family-01.webp                             | 1200×1500, 4:5                                          | Consenting real family with their own puppy. Keep people/puppy together in mobile frame.                                                        |
| public/media/families/family-01.mp4 (optional)                   | 720×900, 4:5                                            | Authentic short story with written publication consent; matching poster and transcript/captions if speech.                                      |
| public/media/awards/award-01.webp                                | 1600×1200, 4:3                                          | Genuine event / award, readable context. Do not use a decorative trophy as evidence.                                                            |
| public/media/awards/certificate-01.pdf                           | Original legible PDF                                    | Actual certificate, verified and appropriately redacted. Link in awards data.                                                                   |
| public/media/team/team-founder.webp                              | 1200×1500, 4:5                                          | Real founder portrait, natural environment; publish name and role only when verified.                                                           |
| public/media/about/about-lumo.webp                               | 1440×1200, 6:5                                          | Actual Lumo space and care setting. Separate mobile crop if needed.                                                                             |
| public/media/about/about-lumo-mobile.webp                        | 960×768, 5:4                                            | Real environment with a meaningful subject, no cropped faces or hands.                                                                          |

Repeat puppy filenames per actual slug. Extra records can live under public/media/puppies/{slug}/ with descriptive filenames. Obtain privacy approval before making any record public.

## Wiring a photograph

Set desktopSrc (e.g. /media/hero/hero-desktop-poster.webp), mobileSrc, Turkish alt, width, height, aspectRatio, mobileAspectRatio, focalPosition and mobileFocalPosition on the relevant MediaAsset. Focal positions use CSS values such as 50% 40%. Asset dimensions reserve space before download. Avoid relying on object-cover alone: supply a separate mobile photograph where required.

The official logo was supplied on 16 September 2026 and is installed. Real documentary photography remains pending. Illustrative AI examples are visibly labelled and are not actual Lumo puppies, families, awards or premises.


## Campaign edition — additional art direction

The approved second-phase layout uses a media-first opening. Supply a separately composed **square mobile hero** and **panoramic desktop hero**, as updated above. Keep the entire puppy face, body and interacting hands in the central 75% of each image. Do not crop a desktop panorama to make the phone asset. On short screens the media area is capped at 46svh; check that variant as well. Headline and actions stay outside the photograph.

Add these real Lumo images to public/media/standard/ and wire them into standardMedia in src/data/editorial.ts:

| File | Dimensions | Actual subject |
|---|---|---|
| standard-saglik.webp | 1200×1500, 4:5 | Genuine documented care context. Do not stage an examination or suggest a veterinary partnership that does not exist. |
| standard-bakim.webp | 1200×1500, 4:5 | An actual everyday care moment in Lumo's environment. |
| standard-karakter.webp | 1200×1500, 4:5 | A real puppy behaving naturally; observed character is documented separately. |
| standard-iletisim.webp | 1200×1500, 4:5 | Real, consenting people interacting; no fabricated customer story. |

Large editorial puppy portraits now run edge to edge on mobile. Keep eyes and paws inside the frame; 1200×1500 remains the preferred source ratio. Family stories and team portraits use the same careful 4:5 framing. Award feature images use 4:3 with an optional secondary genuine detail photograph. No new asset has been invented or substituted for evidence.
