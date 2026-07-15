import { floatingNavItems } from "@/lib/data";

export function FloatingNav() {
  return (
    <nav className="fixed inset-x-0 top-4 z-[150] hidden justify-center px-4 md:top-6 lg:flex">
      <div className="flex items-center gap-1 rounded-full border border-editor-border bg-surface p-1.5 shadow-lg">
        {floatingNavItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-1.5 font-sans text-[13px] text-text-secondary transition-colors hover:bg-stone-100 hover:text-text-primary dark:hover:bg-stone-800"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
