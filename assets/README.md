# Project photos

All 15 slots are filled. These came from the client's photography of the sports
apparel brand fit-out — showroom, offices, meeting rooms and staff kitchen.

Every file has been resized and compressed for web use. The originals were
3000px wide and 400KB–1.3MB each; these are 1200–1920px and 70–334KB, totalling
about 2.5MB across both pages.

## What is where

### Full-bleed background photos

| File | Where it appears | Size |
|---|---|---|
| `hero.jpg` | Landing page hero, behind the headline | 1920px |
| `mechanism.jpg` | Left half of "Why our projects land on time" | 1400px |
| `call.jpg` | Left half of "What you get from the call" | 1400px |
| `final-cta.jpg` | Behind the closing CTA | 1920px |
| `thank-you.jpg` | Thank-you page hero | 1920px |

### Landing page gallery

| File | Caption | Cell |
|---|---|---|
| `gallery-1.jpg` | Retail display and showroom fit-out | Full width |
| `gallery-2.jpg` | Open plan office and workstations | Half |
| `gallery-3.jpg` | Private office and meeting room | Half |
| `gallery-4.jpg` | Staff kitchen and breakout area | Half |
| `gallery-5.jpg` | Meeting space and presentation area | Half |

### Thank-you page gallery

| File | Caption | Cell |
|---|---|---|
| `thanks-1.jpg` | Bespoke display joinery and wall fixings | Full width |
| `thanks-2.jpg` | Workstations and glazed partitions | Half |
| `thanks-3.jpg` | Open plan desking | Half |
| `thanks-4.jpg` | Fitted kitchen and tea point | Half |
| `thanks-5.jpg` | Showroom, meeting space and office in one | Half |

## Replacing or adding photos

Keep the filenames the same and the page picks up the new image automatically.

Before saving a replacement, resize and compress it:

- Background photos: 1920px wide (or 1400px for `mechanism` and `call`)
- Gallery photos: 1600px wide for the full-width cell, 1200px for half cells
- Aim for under 300KB per file, JPEG quality around 75

**https://squoosh.app** does both in the browser — drag the photo in, set Resize
to the width above, choose MozJPEG quality 75, download.

Three of these have headline text over the middle of them — `hero.jpg`,
`final-cta.jpg` and `thank-you.jpg` — so avoid replacements with important
detail dead centre, or anything very bright and evenly lit.

## A note on the grid

Each gallery is one full-width cell plus four half-width cells. If you add or
remove images, **keep the number of half-width cells even** or the grid will
leave an empty square. The full-width one carries
`class="gallery__item gallery__item--wide"`; the others carry
`class="gallery__item"`.

## Captions

The captions describe what is visible in each photo. If you get the real project
details from the client — project name, sector, area, timescale — they will read
better still. Edit the `<figcaption>` lines in `index.html` and `thank-you.html`:

    <figcaption>11-week CAT B office fit-out &mdash; Shoreditch</figcaption>

Update the `alt` text on the same `<img>` to match.
