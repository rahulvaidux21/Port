import { Navbar } from "@/components/Navbar";

/** Shown the instant a case-study link is clicked, until the real page is
    ready. Without this file the App Router has nothing to show during the
    transition, so it holds the *previous* page on screen and the click
    appears to do nothing at all — the whole complaint.

    It mirrors the real page's opening geometry (the bento board, the title
    pair, the hero plate, three chip rows) at the same 1120 column, so the
    swap lands on the same layout rather than reflowing. Deliberately no
    spinner: the card that was clicked is already showing one, and a second
    one here would read as a second wait. */
const Block = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-card bg-surface motion-reduce:animate-none ${className ?? ""}`} />
);

export default function Loading() {
  return (
    <div className="relative overflow-x-clip bg-paper">
      <Navbar />
      <main aria-busy="true" aria-label="Loading case study">
        <div className="mx-auto flex w-full max-w-[1168px] flex-col gap-block px-6 pb-section pt-section md:max-w-[1184px] md:px-8">
          {/* The bento board — one column on a phone, the 3x2 collage from
              `md`, matching BentoGrid's own breakpoint. */}
          <div className="flex flex-col gap-2.5 md:hidden">
            <Block className="aspect-[391/310]" />
            <Block className="aspect-[422/310]" />
            <Block className="aspect-[838/363]" />
          </div>
          <div className="relative hidden aspect-[1320/683] md:block">
            <Block className="absolute left-0 top-0 h-[45.388%] w-[29.621%]" />
            <Block className="absolute left-[30.379%] top-0 h-[45.388%] w-[33.106%]" />
            <Block className="absolute left-0 top-[46.852%] h-[53.148%] w-[63.485%]" />
            <Block className="absolute left-[64.242%] top-0 h-full w-[35.758%]" />
          </div>

          {/* Title and subtitle. */}
          <div className="flex flex-col gap-4 pt-4">
            <Block className="h-9 w-[85%] rounded-chip md:h-12 md:w-[70%]" />
            <Block className="h-6 w-[95%] rounded-chip md:w-[80%]" />
          </div>

          <Block className="aspect-[1320/831]" />

          {/* The three chip rows — role, timeline, platforms. */}
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex flex-col gap-4 md:gap-6">
              <Block className="h-8 w-48 rounded-chip md:h-10" />
              <div className="flex flex-wrap gap-3 md:gap-4">
                {["w-32", "w-40", "w-28", "w-36"].map((w) => (
                  <Block key={w} className={`h-12 rounded-chip ${w}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
