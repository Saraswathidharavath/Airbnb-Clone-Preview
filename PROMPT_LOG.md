# AI-Assisted Development — Prompt Log

Model used: Claude (Anthropic), chat interface with code-execution tools.

> Note: this session did not have live browser access to the reference URL. The prompt sequence
> below reflects what was actually run in this environment. **If you continue this project in
> Claude Code / Cursor with browser access**, insert a "pixel-diff against reference" loop between
> steps 3 and 4 (see suggested prompts at the bottom).

## Session 1 — scaffold

1. "Build a pixel-perfect clone of [reference Airbnb listing page]. Three views: listing page,
   full-screen photo tour, single-photo lightbox with prev/next and keyboard arrow navigation.
   Desktop only. Include an architecture diagram for a production-scale vacation-rental
   marketplace."
2. (Assistant attempted to fetch the reference URL directly; blocked by robots.txt / sandboxed
   network.) → Pivoted to building from known Airbnb UI conventions, and flagged the limitation
   explicitly rather than guessing silently.
3. "Scaffold `index.html` with: sticky header (logo, nav tabs, host/globe/account menu), title bar
   (title, rating/reviews/superhost/location, share/save), 5-tile photo grid (1 large + 4 small),
   two-column body (details + sticky booking card), photo tour overlay markup, lightbox markup."
4. "Write `styles.css` matching Airbnb's real design tokens: `#FF385C` primary red, 12px card
   radius, Circular/system-font stack, box-shadow booking card, hover scale on gallery tiles,
   fade/zoom transitions on the overlays, visible focus rings for keyboard users."
5. "Write `script.js`: build the photo-tour grid from a `PHOTOS` array, open photo tour from any
   gallery tile or the 'Show all photos' button, open the lightbox from any photo-tour image,
   wire `←`/`→`/`Escape`, disable prev/next arrows at the array bounds, and move focus to the
   close button on open / back to the trigger element on close."
6. "Generate a Graphviz architecture diagram for a production-scale Airbnb-style marketplace:
   clients → CDN/edge → API gateway → microservices (listing, search, booking, payment, user,
   reviews, media, notifications) → Postgres/Redis/Elasticsearch/S3, plus an event bus for async
   work and a CI/CD + Kubernetes deployment layer. Render to PNG."
7. "Write the README documenting what's implemented, the live-access limitation, and the concrete
   steps needed to take this from 'best-effort recreation' to true pixel-diff fidelity."

## Session 2 — matching real reference content

The user pasted the reference page's actual rendered text (its accessibility-tree/text-content
dump), covering all sections: title, price, host, highlights, description, "Where you'll sleep,"
amenities, review histogram + category ratings + keyword tags + individual reviews, location,
host bio + co-hosts, cancellation/house rules/safety, and nearby listings.

12. "Here's the actual text content of the reference listing page. Rebuild the listing page's copy
    and section structure to match this exactly — don't invent competing content. Add the sections
    that were missing from the first pass: guest-favourite banner, 'Where you'll sleep' cards, the
    review ratings histogram + 6-category bars + keyword tag chips, 'Meet your host' with co-hosts,
    'Things to know' (cancellation/house rules/safety in 3 columns), and 'More stays nearby.'"
13. "Update the booking card's price to ₹28,499 for 5 nights, dates 18–23 Oct 2026, and add the
    inline two-month (Oct/Nov 2026) calendar shown in the reference."
14. "Update the README to note explicitly that content now matches the real reference (from the
    pasted text) but visual styling (colors/spacing/fonts/animation timing) is still unverified
    since there's no live DOM/screenshot access."

## Suggested next steps (for a session with live browser access)

8. "Open the reference at https://airbnb-clone-umber-two.vercel.app and this clone in two tabs.
   Screenshot both at 1440px width and diff them."
9. "Inspect the reference's computed styles for [title bar / gallery grid / booking card] — report
   exact font-size, line-height, color hex, padding, border-radius, and box-shadow values."
10. "Record the transition timing/easing for: gallery tile hover, photo-tour open, lightbox image
    change, arrow button hover. Update `styles.css` to match exactly."
11. "Tab through the reference page with only the keyboard. Note the focus order and any
    aria-live announcements. Diff against this clone's tab order."
