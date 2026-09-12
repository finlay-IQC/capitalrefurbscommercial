# Photos go in this folder

Save 15 photos here using the **exact filenames** in the table below. That is the
only thing you need to do — no code changes. The page picks them up automatically.

Until these files exist, the site falls back to loading the photos from the
client's Google Drive, so nothing looks broken while you get them ready. As soon
as a file appears here, the local copy is used instead and Drive is never
contacted for it again.

## Before you save them

Every photo needs two things doing to it first:

1. **Resize to 1600px wide.** The originals are 4000px+ and 4–7MB each. A page
   with fifteen of those on it will not load on a phone.
2. **Compress.** Aim for **under 300KB** per file. Save as JPEG, quality ~75.

Free tool that does both in your browser, nothing to install:
**https://squoosh.app** — drag a photo in, set Resize to width 1600, choose
MozJPEG quality 75, download.

## The 15 files

### Big full-width photo areas (5)

| Filename | Where it appears | Pick a photo that... |
|---|---|---|
| `hero.jpg` | Top of the landing page, behind the headline | is your single best shot — wide, well lit, and still reads well with a dark layer over it and text on top |
| `mechanism.jpg` | Left half of "Why our projects land on time" | shows quality of finish or work in progress |
| `call.jpg` | Left half of "What you get from the call" | shows a finished interior |
| `final-cta.jpg` | Behind the last "Get a space your business deserves" block | is wide and impressive, goes very dark behind text |
| `thank-you.jpg` | Top of the thank-you page | is a strong finished space |

Avoid anything with important detail in the middle for `hero.jpg`,
`final-cta.jpg` and `thank-you.jpg` — text sits over the centre of those three.

### Landing page gallery (5)

| Filename | Size on the page |
|---|---|
| `gallery-1.jpg` | Full width — use a strong one |
| `gallery-2.jpg` | Half width |
| `gallery-3.jpg` | Half width |
| `gallery-4.jpg` | Half width |
| `gallery-5.jpg` | Full width — use a strong one |

### Thank-you page gallery (5)

| Filename | Size on the page |
|---|---|
| `thanks-1.jpg` | Full width |
| `thanks-2.jpg` | Half width |
| `thanks-3.jpg` | Half width |
| `thanks-4.jpg` | Half width |
| `thanks-5.jpg` | Half width... use a strong one, it sits full width |

You can reuse the same photo in more than one slot — just save it twice under
both names.

## Captions

The captions under the gallery photos are currently generic, because the project
details for each photo were never confirmed. Once you know what each one is,
edit the `<figcaption>` lines in `index.html` and `thank-you.html` to say the
real thing — project type, area, and outcome. For example:

    <figcaption>11-week CAT B office fit-out &mdash; Shoreditch</figcaption>

## Checking it worked

Open the page and look at the hero. If the photo shows, it is working. If you
want to be certain the local files are being used and not Drive, open the
browser's developer tools, go to the Network tab and reload — you should see no
requests to `drive.google.com`.
