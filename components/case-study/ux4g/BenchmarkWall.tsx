import Image from "next/image";

/** The wall of design systems we benchmarked, and the competitive
    analysis sheet that came out of it — cloned from the Figma frame
    "Case study - UX4G design system 3.0" (nodes 2944:48918 and
    2944:48939).

    Figma builds the wall as fourteen separate 650×~334 screenshots laid
    on a flat #ccd0ff plate with a 20px gutter, so the plate colour is
    only ever visible *between* the tiles — never as a border, because
    the grid runs edge to edge.

    Keeping the fourteen tiles separate rather than shipping one flat
    export is the whole point: a baked image carries its gutter colour
    and its fade into dark mode, where both are wrong. Split apart, the
    plate and the fade are ordinary CSS and follow the theme. */

const TILE_H = 668;

const TILES: { src: string; h: number; alt: string }[] = [
  { src: "tile-01.jpg", h: TILE_H, alt: "GOV.UK Design System" },
  { src: "tile-02.jpg", h: TILE_H, alt: "Singapore Government Design System" },
  { src: "tile-03.jpg", h: 664, alt: "NL Design System" },
  { src: "tile-04.jpg", h: 662, alt: "Designers Italia" },
  { src: "tile-05.jpg", h: 652, alt: "Untitled UI" },
  { src: "tile-06.jpg", h: 652, alt: "IBM Carbon Design System" },
  { src: "tile-07.jpg", h: 664, alt: "Ant Design" },
  { src: "tile-08.jpg", h: 664, alt: "Atlassian Design System" },
  { src: "tile-09.jpg", h: 678, alt: "U.S. Web Design System (USWDS)" },
  { src: "tile-10.jpg", h: 678, alt: "Shopify Polaris" },
  { src: "tile-11.jpg", h: 698, alt: "Base, Uber's design system" },
  { src: "tile-12.jpg", h: 698, alt: "Google Material Design" },
  { src: "tile-13.jpg", h: 666, alt: "Adobe Spectrum" },
  { src: "tile-14.jpg", h: 666, alt: "UX4G Design System 2.0" },
];

export function BenchmarkWall() {
  return (
    <div className="relative overflow-hidden rounded-[4px] bg-cs-wall">
      {/* Two 650px columns with a 20px gutter — the exact Figma board at
          1320px. The columns hold on mobile rather than stacking: at any
          phone width these screenshots are too small to read, so the
          section is doing one job — showing how much ground we covered —
          and stacking would stretch that into a 2,600px scroll to say
          the same thing. The gutter tightens so the ratio still reads. */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 lg:gap-5">
        {TILES.map((tile) => (
          <Image
            key={tile.src}
            src={`/case-studies/ux4g/bench/${tile.src}`}
            alt={tile.alt}
            width={1300}
            height={tile.h}
            sizes="(min-width: 1360px) 650px, (min-width: 640px) 50vw, 100vw"
            className="h-auto w-full"
          />
        ))}
      </div>
      {/* Figma's fade runs the full height of the wall, not just the
          foot: transparent, 29% at the 90% mark, then solid. Driving it
          off --color-paper makes it exact in light and correct in dark,
          where it has to resolve to the page's own near-black. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(var(--color-paper)/0)_0%,rgb(var(--color-paper)/0.29)_90%,rgb(var(--color-paper))_100%)]" />
    </div>
  );
}

/** The competitive analysis sheet on its dark plate.

    The export is taken at the sheet's *shadow* bounds, so it already
    carries 31px of #16191e down each side and 41px top and bottom, plus
    the sheet's own 24px corners and white glow. Only the vertical
    padding needs topping up to Figma's 60px — 19px, expressed as 1.44%
    of the 1320px board so it scales with everything else.

    This plate stays dark in both themes. It isn't a surface that flips;
    it's a deliberately dark showcase panel, the way Figma draws it. */
export function CompetitiveAnalysisSheet() {
  return (
    <div className="overflow-hidden rounded-card bg-cs-slate py-[1.44%]">
      <Image
        src="/case-studies/ux4g/bench/sheet.jpg"
        alt="The competitive analysis sheet — 17 design systems scored on core components, pros, cons, and what UX4G should take from each"
        width={1320}
        height={628}
        sizes="(min-width: 1360px) 1320px, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}
