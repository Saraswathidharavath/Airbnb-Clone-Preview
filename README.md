# Airbnb Listing Page Clone

## Stack
Plain HTML/CSS/JS, no build step required. Deploys as a static site on Vercel/Netlify/GitHub Pages
by pointing at this folder (`index.html` is the entry point).

Chosen deliberately over a framework for this scope: three views, no server state, and pixel-level
CSS control is easier to iterate on directly than through a component abstraction layer.

## What's implemented
- **Listing page** — sticky header, title bar with share/save, 5-tile photo grid (1 large + 4 small,
  Airbnb's classic layout), host summary, highlights, description, amenities grid, reviews section
  with rating bars, and a sticky booking card with price breakdown.
- **Photo tour** (`#photoTour`) — full-screen overlay opened from "Show all photos" or any grid tile,
  alternating single/pair photo rows, closes on the ✕ button or `Escape`, returns focus to the
  triggering element on close.
- **Lightbox** (`#lightbox`) — single-photo viewer opened from any photo tour image. Prev/Next arrows,
  `←`/`→` keyboard navigation, `Escape` to close, disabled-state styling at the first/last photo,
  photo counter, focus moves to the close button on open and back to the trigger on close.

## ⚠️ Important limitation — please read before scoring
This was built **without live/browser access to the reference URL**
(`https://airbnb-clone-umber-two.vercel.app`) — the assistant's sandboxed environment couldn't reach
it (blocked by the site's robots.txt / network allowlist). The user later pasted the actual rendered
text content of the reference listing page ("Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"), which
was used to rebuild the listing page's copy and section structure to match the real reference —
guest-favourite banner, highlights, "Where you'll sleep," full amenities/reviews/location/host/
things-to-know/nearby-listings sections, and the booking card's real price/dates all reflect the
actual reference content.

What's still **not** verified against the reference: exact colors, spacing, font sizes, photo
assets, and animation timing/easing, since no visual/DOM access was available. So this is a
**content-accurate, visually best-effort recreation**, not a pixel-diffed match.

To actually hit "pixel-perfect," run this through an AI coding agent **with live browser access**
(Claude Code with a browser/Playwright MCP, Cursor, etc.) and iterate:

1. Open the reference and this clone side by side (or screenshot-diff them).
2. Have the agent inspect computed styles on the reference (font sizes, exact color hex values,
   spacing, border-radius, shadow values, breakpoints) and patch `styles.css` to match.
3. Replace the gradient placeholders in `script.js` / `index.html` with the actual listing photos
   from the reference (or your own licensed stock photos — don't scrape/hotlink the reference's
   asset URLs directly, re-host your own).
4. Record the animation timings/easing on the reference (gallery hover scale, photo-tour open
   transition, lightbox image transition) and match the `transition`/`animation` values in
   `styles.css`.
5. Re-test keyboard nav and focus order against the reference with a screen reader or the
   accessibility inspector.

## Files
- `index.html` — page structure for all three views
- `styles.css` — all styling, animations, focus states
- `script.js` — photo tour + lightbox interactivity, keyboard nav, focus management
- `architecture.dot` / `architecture-diagram.png` — production-scale system architecture diagram
- `PROMPT_LOG.md` — sequence of prompts used to build this
