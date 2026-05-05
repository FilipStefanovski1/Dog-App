# Dogger by Filip

A Vue 3 app built for a university assignment. It uses the Dog CEO API to show dog breeds and a random image for each one.

## What it does

There are three pages:

- **Home** - shows all dog breeds in a card grid. Click one to go to the detail page.
- **Detail page** - shows the breed name and a random photo of that breed.
- **Categories** - groups breeds by size (small, medium, large) and by where they're from (Europe, Asia, etc.).

## Tech used

- Vue 3 + Composition API
- Vue Router
- TanStack Query (for fetching and caching)
- PrimeVue (UI components)
- Vite

## How to run

```bash
npm install
npm run dev
```

Opens on http://localhost:5173

## Notes

- Breed images are cached so revisiting a breed shows the same image
- The categories page cross-checks the local breed mappings against the actual API, so unknown breeds fall into a "Mixed / Unknown" section
- Page transitions and image fade-in are handled with Vue's Transition component and CSS
