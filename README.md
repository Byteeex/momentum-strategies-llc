# Momentum Strategies LLC website

The source for the Momentum Strategies LLC website. The static page lives in `dist/`; the interactive navigation is a React, TypeScript, Tailwind CSS, and Motion component in `components/ui/` and `src/`.

## Local development

```bash
npm ci
npm run build
```

Serve the `dist/` directory with any static HTTP server. The build updates `dist/react/`.

## Deployment

Pushing to `main` runs the GitHub Pages workflow, builds the interactive navigation, and publishes `dist/`. The project uses relative asset URLs so it works under the repository path.

## Icon sources

Agency and SBA program symbols in the animated strip and cards are adapted from [Lucide](https://lucide.dev/icons) and used under the ISC license in [dist/assets/LUCIDE-LICENSE.txt](dist/assets/LUCIDE-LICENSE.txt). They are descriptive icons, not official agency seals or certification badges. Agency and program names do not imply endorsement or certification of Momentum Strategies.
