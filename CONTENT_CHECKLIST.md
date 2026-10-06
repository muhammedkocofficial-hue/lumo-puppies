# Real content needed before public launch

Keep all unknown facts blank. Do not fill TODOs with plausible examples.

| File                        | Required real information                                                                                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| src/data/site.ts            | Original logo; confirmed brand copy and actual process; international WhatsApp number; telephone; Instagram and Messenger HTTPS URLs; email; legal entity and address; registration only if applicable; approved public domain. |
| src/data/breeds.ts          | Confirm which breeds Lumo actually offers. Current Toy Poodle, Maltese and Bichon Frisé are educational examples, all offeredByLumo false. Approve descriptions and add real portraits.                                         |
| src/data/puppies.ts         | Taco's actual breed, sex, colour, date of birth, introduction, observed personality, photographs, video if available; all other real profiles; publication permission.                                                          |
| Puppy parents               | Real names, roles, details, portraits, proof of relationship and permission to publish.                                                                                                                                         |
| Puppy documents/development | Actual dated veterinary records, vaccination/microchip information only where appropriate and verified, care notes, applicable tests and actual outcomes. Redact private identifiers before upload. No medical guarantees.      |
| src/data/awards.ts          | Actual title, organiser, event, year, description, certificate and photographs. Keep verified false until checked.                                                                                                              |
| src/data/testimonials.ts    | Authentic quote, display name, city if approved, puppy name, date, real media and explicit publication consent. Both flags required.                                                                                            |
| src/data/team.ts            | Real names, roles, biographies, experience and approved portraits.                                                                                                                                                              |
| src/data/faq.ts             | Owner-approved answers reflecting the actual service and process.                                                                                                                                                               |

## Publish a puppy

Fill the existing record, add real images with alt text and inspect their crops. Set published true only after factual review. Mark individual evidence fields verified only when they are checked. Rebuild; the new profile then appears in listings, relevant breed pages and sitemap. Unpublished profiles expose no details beyond the known name on their holding route and stay noindex.

## Set contacts

WhatsApp: digits including country code. Telephone: international number. Instagram/Messenger: full verified HTTPS URLs. Email: actual monitored address. Blank strings remain hidden. Verify each on a phone before launch.

## Final release

- Supply all important real photographs, logo and verified contact channel(s).
- Approve the proposed editorial copy, brand principles and preparation steps as appropriate to Lumo.
- Confirm legal/company information and owner approval for publication.
- Set production origin in NEXT_PUBLIC_SITE_URL (or site.url).
- Set site.launchReady true only when content is complete. Run npm run check:content and npm run build.
- Check 390px/430px, iOS Safari and Android Chrome with the final assets and real links.

Awards, family stories and team profiles are optional: absence is preferable to invented proof. The built-in launch check covers machine-checkable essentials; it cannot verify whether a claim, consent or veterinary document is authentic.
