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
