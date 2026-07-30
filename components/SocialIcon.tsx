import Image from "next/image";

const ICON_SRC: Record<"linkedin" | "behance" | "mail" | "file" | "medium", string> = {
  linkedin: "/icons/linkedin.svg",
  behance: "/icons/behance.svg",
  mail: "/icons/gmail.svg",
  medium: "/icons/medium.svg",
  file: "/icons/gmail.svg",
};

export function SocialIcon({
  icon,
  className,
}: {
  icon: "linkedin" | "behance" | "mail" | "file" | "medium";
  className?: string;
}) {
  return <Image src={ICON_SRC[icon]} alt="" width={16} height={16} className={className ?? "h-4 w-4"} />;
}
