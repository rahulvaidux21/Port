import Image from "next/image";

interface TableLampProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

/**
 * The real pendant-lamp photo, shot on a white background. mix-blend-darken
 * drops the white out against the page background (light or dark) without
 * needing an alpha channel — darken takes the min per channel, so white
 * pixels resolve to the backdrop while the lamp's own dark tones survive.
 */
export function TableLamp({ size = 32, className, priority }: TableLampProps) {
  return (
    <Image
      src="/lamp.png"
      alt="Table lamp — theme toggle"
      width={size}
      height={size}
      priority={priority}
      className={`mix-blend-darken object-contain ${className ?? ""}`}
    />
  );
}
