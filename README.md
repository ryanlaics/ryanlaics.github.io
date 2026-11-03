# Zhichen Lai — Personal Academic Homepage

Static website for https://www.zhichenlai.com/.

## Local preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` in this folder, then open http://127.0.0.1:8765/.

## Files

- `index.html`: biography, publications, funding, experience, recruitment and contact.
- `assets/css/site.css`: the whole design system — base/utilities, layout, themes and print styles.
- `assets/js/main.js`: navigation, appearance switching, quick navigation and email copy.
- `assets/img/`: portrait (`about-photo.webp`), WebP university logos, favicon and the social sharing card.
- `assets/vendor/bootstrap-icons/`: a 16-glyph icon-font subset (no full icon set is shipped).
- Scroll reveal is a small IntersectionObserver in `main.js`; no animation library is shipped.
- `CNAME`: custom domain configuration.

No build step is required. There is no Bootstrap bundle any more: the handful of grid/utility
classes the page uses live at the top of `site.css`. After editing CSS or JavaScript, update its
`?v=` hash in `index.html` (a short SHA-256 of the file is enough) so returning visitors do not
get a stale copy.

Deploy the contents of this folder with `index.html` at the site root.

## Appearance and navigation

The appearance control cycles through Auto, Light and Dark; the choice is stored in
`localStorage`. Use Command+K (Mac) or Ctrl+K to jump between sections. All six publications are
shown directly; no search or filtering is enabled.

The page is print-ready: header, workbench bar and controls are hidden, and records avoid
breaking across pages, so “Save as PDF” produces a clean CV.

## Attribution

`site.css` started from the iPortfolio template (BootstrapMade). The file has since been
substantially rewritten; confirm the template licence terms before publishing, especially if the
original footer credit is not retained.
