# BURN visual and interaction QA — 2026-09-14

final result: passed

## Source and acceptance
- Source: `design/selected-concept.png`, 1435 × 1096 pixels, selected explicitly via the user's screenshot.
- Desktop comparison initially used a 1440 × 1100 CSS viewport, DPR 1, source normalized to that size.
- User subsequently approved the hero and footer explicitly and requested changes to the middle only. The final middle stylesheet is scoped to those sections; approved regions were preserved.
- Final valid responsive evidence: `design/desktop-900-final.png` (900 × 900, DPR 1) and `design/mobile-v2.png` (390 × 844, DPR 1).
- `design/comparison-responsive.jpg` puts the source and final responsive capture together. The source is scaled, while the implementation uses a 900px breakpoint: this comparison checks retained identity and responsive hierarchy, not pixel-identical geometry.
- State: Russian public homepage, no submitted application. Other language and disclosure states tested separately.

## Comparison history
1. `design/desktop-v1.png`: BURN too wide; mask too far right and too short. Narrowed display typography, increased mask height and moved it left. Checked against the source in the same image input.
2. `design/desktop-v2.png`: title/mask proportions improved. Mask canvas extended below hero and overlaid principles. Put principles in an opaque higher layer. User approved main/footer after this visual direction.
3. `design/mobile-v1.png`: headline crossed the mask. Reserved independent reading space; `design/mobile-v2.png` confirms separation and accessible CTA.
4. User rejected the initial middle's repetitive text layouts. Rebuilt only middle sections; inspected `middle-formats.png`, `middle-benefits.png`, `middle-code.png`, `middle-application.png`, and `mobile-code.png`.
5. Some later 1440px captures were clipped/tiled by the in-app panel despite a correct DOM viewport. Invalid captures were discarded, not treated as evidence. Final whole-region captures use 900px and 390px viewports fitting the actual panel.

## Required fidelity surfaces
- Typography: self-hosted Anton + Manrope. Hero preserves the chosen condensed wordmark and two-line heading. Middle uses varied display headings and readable body text; no clipping observed at tested widths. Native web font glyphs differ slightly from the generated mock.
- Layout: hero identity retained; responsive layout removes marginal labels and gives mobile copy separate space. Middle now has two featured format panels, a residency-card/benefit disclosure layout, an orange code section, a four-stage path, city panels, FAQ and a contained application form. No horizontal overflow at 1440, 900 or 390 CSS pixels in tested states.
- Color: near-black, warm white and vivid orange. Code uses black text on orange; form fields and legal pages remain dark. No new glow or gradient treatment.
- Assets: supplied crest, individually generated chrome mask, licensed Phosphor arrow. Mask JPEG loaded successfully; no stock images presented as residents. Slight differences in metal highlights from the generated mock are acceptable art variation after explicit hero approval.
- Copy: source content, concurrent fee/offer/legal changes, and RU/KZ/EN preserved. Fixed the repeated monthly translation key so only the council label inherits the required-attendance wording.

## Interaction verification
- RU → EN → KZ → RU; no overflow in checked language states.
- Mobile menu opens, follows anchors and closes after navigation.
- Native benefits disclosure changes the expanded item and reveals its description.
- FAQ expands and displays the current policy copy.
- Primary application CTA reaches the form. Empty form remains disabled.
- `node scripts/check-site.mjs`: empty form, all eight consent combinations, invalid phone, blank name. Uses a mocked DOM; no network and no Firebase writes.
- Local links checked across HTML pages; code/offer routes inspected, including `mobile-offer.png`.
- JavaScript syntax checks passed. Browser error log empty at the final document check.

## Remaining limitations / polish
- Full submission to production Firebase deliberately not exercised; original submission code unchanged.
- No new deployment performed.
- Generated mask is a faithful separate asset, not the exact original render's pixels. Native type has small glyph differences.
- Latest whole desktop screenshot above 900px was limited by the in-app screenshot surface; initial 1440px captures and live DOM layout checks remain available. No claim of automated pixel equivalence.

## Implementation checklist
- [x] Preserve approved main/footer.
- [x] Redesign middle with scoped styles.
- [x] Keep current content and integrations.
- [x] Inspect responsive screens and interactive states.
- [x] Document assets, licenses, runtime and checks in README/AGENTS.
