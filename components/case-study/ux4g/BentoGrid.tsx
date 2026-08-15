import Image from "next/image";

/** The UX4G case study's opening bento collage — Figma frame "Case study -
    UX4G design system 3.0 Light", node 2955:54160 (1320×683).

    At `lg` this is Figma's exact board. The frame positions all four tiles
    absolutely, and its gutters are NOT uniform: tile 1 ends at x391 and tile
    2 starts at x401 (10px), but tile 2 ends at x823 while tile 4 starts at
    x848 (25px) — the top-middle tile is 15px short of the wide tile below
    it, so their right edges deliberately don't line up. A single CSS grid
    can't express that, so desktop mirrors the absolute placement:

      tile 1  x0     y0    391×310    tile 2  x401  y0    422×310
      tile 3  x0     y320  838×363    tile 4  x848  y0    472×683

    That geometry lives in `lg:` classes, NOT inline styles. An inline style
    applies at every width, so while `position:absolute` only switched on at
    `lg`, those percentages were still sizing the tiles below it — which is
    why the stack read as four randomly-sized boxes on a phone.

    Below `lg` the composition is rebuilt rather than abandoned:
      • `sm`–`lg`  a real two-column bento — the two small tiles stacked in
                   the left column, the phone tile tall down the right, the
                   kit tile wide underneath. The frame's own relationships.
      • base       one column, each tile holding its own aspect ratio so the
                   short / wide / tall rhythm survives.

    The purple tiles and the device bezel are brand artwork (they carry the
    UX4G mark and the national emblem), so they hold their colour in both
    themes; only the pale panel follows the surface token. */
export function BentoGrid() {
  return (
    <div style={{ containerType: "inline-size" }}>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:relative md:block md:aspect-[1320/683]">
        {/* ── Tile 1 · title card ─────────────────────────────── */}
        <div className="relative flex aspect-[391/310] flex-col justify-start gap-[3.5cqw] overflow-hidden rounded-card bg-gradient-to-b from-cs-brand-from to-cs-brand-to p-5 sm:col-start-1 sm:row-start-1 md:absolute md:left-0 md:top-0 md:aspect-auto md:h-[45.388%] md:w-[29.621%] md:gap-[1.818cqw] md:p-[1.515cqw]">
          {/* 9.071px gap between the wordmark and "3.0". */}
          <div className="flex items-center gap-2 md:gap-[0.687cqw]">
            {/* Figma ships the wordmark as two separate vectors positioned
                by percentage inset; they're recomposed into one SVG here so
                the mark scales as a single unit. 109.991×29.998. */}
            <div className="relative h-6 w-[4.4rem] shrink-0 sm:h-7 sm:w-[5.1rem] md:h-[2.273cqw] md:w-[8.333cqw]">
              <Image
                src="/case-studies/ux4g/bento/ux4g-logo.svg"
                alt="UX4G"
                fill
                sizes="(min-width: 1024px) 110px, 82px"
                className="object-contain object-left"
              />
            </div>
            {/* 40.82px / 59.869 leading / -1.6328 tracking. */}
            <span className="font-sans text-2xl font-normal leading-[1.466] tracking-[-0.03em] text-white sm:text-3xl md:text-[3.092cqw]">
              3.0
            </span>
          </div>

          {/* Figma's line boxes here are exact: 32px type in a 42px box
              (1.3125) and 60px type in a 78px box (1.3). Unitless leading
              keeps both true as the type scales. */}
          <div className="flex flex-col text-white">
            <span className="font-sans text-base font-normal leading-[1.3125] sm:text-lg md:text-[2.424cqw]">
              Design System
            </span>
            {/* The frame reads "Resdesign"; kept as "Redesign" here — a
                misspelling in the largest word on the page is a typo, not a
                design decision. */}
            <span className="font-sans text-[1.75rem] font-bold leading-[1.3] tracking-[-0.03em] sm:text-[2rem] md:text-[4.545cqw]">
              Redesign
            </span>
          </div>

          <span className="font-sans text-base font-normal leading-[1.3125] text-white sm:text-lg md:text-[2.424cqw]">
            2026
          </span>
        </div>

        {/* ── Tile 2 · national emblem ────────────────────────── */}
        {/* 33.106%, not the frame's 31.97%: Figma stops this tile 15px short
            of the wide tile below it, which left a 21px channel to the phone
            here against 8.5px everywhere else on the board. Squaring it to
            the kit tile's right edge puts every gutter on the same 8.5px. */}
        <div className="relative flex aspect-[422/310] items-center justify-center overflow-hidden rounded-card bg-cs-brand-deep p-5 sm:col-start-1 sm:row-start-2 md:absolute md:left-[30.379%] md:top-0 md:aspect-auto md:h-[45.388%] md:w-[33.106%] md:p-0">
          {/* 158.279×275.267 centred — 88.8% of the tile's height. */}
          <div className="relative h-[89%] w-[36%] md:w-[11.991cqw]">
            <Image
              src="/case-studies/ux4g/bento/emblem.svg"
              alt="State Emblem of India"
              fill
              sizes="(min-width: 1024px) 158px, 120px"
              className="object-contain"
            />
          </div>
        </div>

        {/* ── Tile 3 · Figma community kit ────────────────────── */}
        <div className="relative aspect-[838/363] overflow-hidden rounded-card bg-gradient-to-b from-cs-brand-from to-cs-brand-to sm:col-span-2 sm:row-start-3 md:absolute md:left-0 md:top-[46.852%] md:aspect-auto md:h-[53.148%] md:w-[63.485%]">
          {/* 744×341 centred in 838×363 — 88.8% wide, 11px clear top and bottom. */}
          <Image
            src="/case-studies/ux4g/bento/figma-kit.png"
            alt="The UX4G Design System 3.0 kit published on the Figma community"
            width={883}
            height={405}
            sizes="(min-width: 1180px) 744px, 100vw"
            className="absolute left-1/2 top-1/2 w-[88.8%] -translate-x-1/2 -translate-y-1/2 rounded-lg"
          />
        </div>

        {/* ── Tile 4 · new system, on a phone ─────────────────── */}
        {/* On the frame the inner panel is 874 tall inside a 683 tile, so the
            device runs off the bottom edge and is clipped — that bleed is the
            design. The tile clips it at every width here rather than growing
            to contain it, which had left the device's rounded bottom jammed
            against the tile's edge instead of running cleanly past it. */}
        <div
          className="relative aspect-[472/620] overflow-hidden rounded-card bg-cs-chip sm:col-start-2 sm:row-start-1 sm:row-span-2 sm:aspect-auto md:absolute md:left-[64.242%] md:top-0 md:h-full md:w-[35.758%]"
          style={{ containerType: "inline-size" }}
        >
          {/* 30px Bold, 44px leading, centred with its line box at y64 —
              so the box starts 42px down, 8.898% of the 472 tile. */}
          <p className="px-5 pt-[8.898cqw] text-center font-sans text-lg font-bold leading-[1.4667] text-cs-violet-deep sm:text-xl md:px-0 md:text-[6.356cqw]">
            New scalable design system
          </p>
          {/* Device frame drawn in CSS rather than baked into the export.
              Capturing the framed phone as an image filled its rounded
              corners with the canvas colour, so they read as hard square
              corners against the tile. Geometry from node 2955:54178:
              380.603 wide (80.64% of the tile), an 8.12px border and
              48.717px radius — 2.134% and 12.80% of the device width. Below
              `lg` the tile is proportionally wider than the frame's 472
              column, so the device takes a px cap instead of that share. */}
          <div
            className="absolute left-1/2 top-[24%] w-[min(72%,244px)] -translate-x-1/2 sm:top-[17%] md:top-[26.271cqw] md:w-[80.64%]"
            style={{ containerType: "inline-size" }}
          >
            {/* Rounded on the top only, and no bottom bezel: the device runs
                off the tile's bottom edge, and at 41px the bottom corners
                curved back in well inside the 10px of bleed — so instead of
                reading as a phone continuing past the crop, it read as a
                whole phone with its base clipped. Square and open at the
                bottom, it runs out of frame the way the mockup does. */}
            <div className="overflow-hidden rounded-t-[12.8cqw] border-[2.134cqw] border-b-0 border-cs-device bg-white shadow-xl">
              <Image
                src="/case-studies/ux4g/bento/signin-screen.jpg"
                alt="The UX4G 3.0 sign-in screen rendered on a mobile device"
                width={1141}
                height={1734}
                sizes="(min-width: 1024px) 380px, 244px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
