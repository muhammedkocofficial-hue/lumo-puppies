# Netlify — static deployment

Status: prepared locally, NOT deployed. The site exports pure static files, so it does not need paid functions, a database or a Next.js server. Netlify plan quotas still apply; no promise of unlimited free usage.

## Build on Windows

Complete the content/asset checklists first. Configure NEXT_PUBLIC_SITE_URL with your actual Netlify/custom HTTPS origin. Turn site.launchReady on only after the real content is approved.

```powershell
Set-Location "$env:USERPROFILE\Desktop\lumo-puppies"
npm install
npm run lint
npm run build
```

1. Sign in to Netlify and choose its manual deploy / drag-and-drop option.
2. Upload the generated `Desktop\lumo-puppies\out` folder, not the source folder or .next.
3. Open every main page and test actual contact links on your phone.

If the Netlify URL is not known beforehand, keep launchReady false for the first upload, then set the assigned origin, approve content and rebuild/upload once. Do not repeatedly publish during development.

## Optional Git-connected deployment

Push this project to your own Git repository and connect it in Netlify. Use `npm run build` and publish directory `out`, as set in netlify.toml. Set NEXT_PUBLIC_SITE_URL in Netlify's build environment and NODE_VERSION=22. No runtime adapter is needed: NETLIFY_NEXT_PLUGIN_SKIP=true is configured. Do not change publish to .next or enable a server runtime. Leave the normal static 404 behaviour; do not add an SPA catch-all redirect to index.html.

Every content change requires a fresh build. Keep node_modules, .next and local work out of Git. Commit package-lock.json. No API keys are required.

Reference: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [Netlify static Next.js deployment](https://www.netlify.com/knowledge-base/deploy-your-v0-app-to-netlify/).
