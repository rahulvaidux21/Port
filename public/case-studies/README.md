# Case study images

Each project's images live in a folder named after its `caseStudySlug` from `lib/data.ts`:

```
public/case-studies/
  ux4g/
  survey-setu/
  niri/
  ebcas/
  bharatnow/
  salonx/
```

## Adding an image

1. Export from Figma as PNG (2x) or JPG. Keep each file under ~500 KB
   (resize to ~1600px wide; the gallery thumbnail is much smaller anyway).
2. Drop it in the matching folder with a short kebab-case name,
   e.g. `survey-flow.png`, `admin-dashboard.jpg`.
3. Register it in `lib/data.ts` on that case study's `images` array:

```ts
images: [
  {
    src: "/case-studies/survey-setu/survey-flow.png",
    alt: "What the image shows, for screen readers",
    caption: "Short caption shown under the thumbnail and in the lightbox.",
  },
],
```

Images appear as a horizontal snap-scroll strip inside the expanded
"Read the full story" panel. Clicking any image opens it full-size in a
lightbox (Escape or the close button dismisses it).
