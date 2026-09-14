# BURN Club public website

Repository: tammat11/BURNadmin. This is the static public website, not the burn2 mobile prototype.

## Product and design
- Selected source of truth: `design/selected-concept.png` (OBSIDIAN), explicitly chosen by the user via screenshot on 2026-09-14. Follow this exact concept rather than earlier rejected explorations.
- Fire + samurai. Large condensed BURN, weathered chrome flame-mask on black, vivid orange CTA, narrow editorial side labels and an open four-column principles strip.
- User approved the hero and footer; preserve them. Middle sections were separately redesigned in `middle.css`: prominent format panels, a residency card with native benefit disclosures, orange code section, numbered membership path, cities, FAQ and application panel.
- Actual brand mark: `assets/crest.png`. Keep the mask related to that mark. No full-bodied warriors, stock people, fake club photographs, beige woodcuts, or invented claims.
- Existing photo-1.jpg and photo-2.jpg are stock images, not verified club photographs. Do not label them as residents or club events.
- Preserve RU/KZ/EN, authentic Russian legal/code text, and application consent requirements. Concurrent user content changes (including public offer and membership fee) must be preserved.

## Implementation
- Static HTML/CSS/JS; no build step or package manager required.
- `index.html`: homepage. `styles.css`: base/document styles. `fire.css`: current responsive visual layer loaded after base styles. Obsidian rules are the selected design; responsive adjustments are at the end.
- `i18n.js`: EN/KZ dictionaries; Russian captured from markup; localStorage key burn.lang. Keep every new public string translatable.
- `navigation.js`: native details mobile menu, close on navigation/Escape.
- `app.js`: existing Firebase application submission. Do not change schema/auth/consents in a visual task.
- `assets/obsidian-mask.jpg`: optimized ImageGen mask derived from selected concept. Master is in `design/`. `fonts.css` self-hosts Anton/Manrope; Phosphor supplies the arrow icon.
- `code.html`, `privacy.html`, `oferta.html`, `support.html`: preserved policy/code content.

## Preview and verification
Run `python3 -m http.server 4188`, open http://localhost:4188 in the in-app browser.
Run `node scripts/check-site.mjs` for offline form gate checks. Check desktop and 390px mobile, all three languages, menu + Escape, anchors, FAQ disclosure, form disabled until valid inputs and all three consents, code and legal links.
Do not send test applications to production Firebase as part of visual QA. Use an isolated mocked DOM for validation tests.
No `check:runtime` command exists here; that contract belongs to the separate burn2 mobile project.
Vercel uses repository root with no build step. Publishing is separate from local preview.
