# Capital Refurbishment Solutions — paid traffic funnel

A two-page lead funnel for cold paid traffic (commercial property owners in London
planning a fit-out). Vanilla HTML, CSS and JavaScript. No build step, no framework.
Upload the files to any static host and it runs.

## Files

```
/
├── index.html      Landing page (hero, form, problem, sectors, mechanism,
│                   how it works, what you get, proof, FAQ, final CTA)
├── thank-you.html  Post-submission confirmation ("we will call you")
├── privacy.html    Privacy policy (placeholder — see note below)
├── terms.html      Terms of service (placeholder — see note below)
├── styles.css      All styling
├── script.js       UTM capture, form decoration, sticky CTA, FAQ accordion
└── assets/         Project photos — see assets/README.md for the filenames
```

## Funnel flow

1. Ad click → `index.html`
2. Visitor completes the GoHighLevel form (or calls 07863 783993)
3. GHL redirects to `thank-you.html`

Every primary CTA on the page scrolls to the form at `#quote`. There is no
navigation menu — the only links are Privacy Policy and Terms in the footer.

## Before you send traffic — required setup

### 1. Set the GHL redirect
In the GoHighLevel form builder, set the **on-submit redirect** for form
`cLooQoSjRfM93l6pKcEE` to your live `thank-you.html` URL. Nothing else triggers
the thank-you page.

### 2. Add hidden UTM fields in GHL
`script.js` appends the captured parameters to the form iframe `src`. GHL maps
URL parameters onto hidden fields whose **field key** matches. Add hidden fields
with these exact keys so the values save with the submission:

```
utm_source  utm_medium  utm_campaign  utm_content  utm_term
fbclid  gclid  ttclid  msclkid  landing_page  referrer
```

### 3. Confirm the mechanism claims are true
`index.html` promises a named point of contact, a written programme before
work starts, weekly progress updates, and a line-by-line quote with no
unapproved extras. Confirm with the client that all four are how they actually
operate, and reword anything that is not.

### 4. Have the legal pages reviewed
`privacy.html` and `terms.html` are placeholders. Add the registered company
name, company number and registered address, and have them checked before you
run paid traffic.

## Images

All 15 photo slots are filled with the client's project photography, resized and
compressed (about 2.5MB total across both pages). `assets/README.md` lists which
photo is in which slot, the caption on each, and the sizes to use when replacing
one.

To swap a photo: keep the filename, resize and compress it, overwrite the file.
No code changes.

`script.js` still carries a fallback to the client's Google Drive copies, used
only if a file in `/assets` is ever missing — it does not fire while the folder
is complete. Confirm with the browser's Network tab: there should be no
`drive.google.com` requests.

### Captions
The gallery captions describe what is visible in each photo. If the client
supplies the real project details — name, sector, area, timescale — edit the
`<figcaption>` and matching `alt` in `index.html` and `thank-you.html`.

## Colour

The palette is black and orange, matching the client's main site. It is defined
once at the top of `styles.css`:

```css
--accent:      #f26522;   /* brand orange          */
--accent-dark: #d9551a;   /* hover, ~10% darker    */
--ink:         #14161a;   /* near black            */
```

If you have the exact brand orange from the client's style guide, change
`--accent` and `--accent-dark` and the whole site follows.

## Tracking

The Meta Pixel (`971365851907422`) is installed in the `<head>` of all four
pages and fires `PageView`.

`thank-you.html` fires `Lead` on load, inside a clearly marked conversion block.
No conversion event fires on the landing page. The booked-call `Schedule` event
and the Google Ads / TikTok conversion snippets are commented out in that block,
ready to be switched on.

Each page also carries `TRACKING HEAD CODES GO HERE` and `TRACKING BODY CODES GO
HERE` comments for GTM, GA4 or anything else you add later.

## UTM handling

`script.js` captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
`utm_term`, `fbclid`, `gclid`, `ttclid` and `msclkid` from the URL, plus the
first landing page and the original referrer. They are stored in `sessionStorage`
under `crs_attribution`, appended to the form iframe, and appended to internal
links so they survive a trip to the privacy page and back.

## Accessibility and performance notes

- One `<h1>` per page, semantic landmarks, skip link to the form.
- FAQ accordion is a real `<button>` with `aria-expanded` / `aria-controls`.
- Below-the-fold gallery images are lazy-loaded; the form embed script is deferred.
- The form container reserves its height up front so the embed does not shift layout.
- One web font (Inter, three weights) with a system fallback stack.
- Tested from 320px to 1920px with no horizontal scroll.
