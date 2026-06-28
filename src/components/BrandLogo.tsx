const SIZES = {
  nav: 48,
  hero: 128,
} as const;

type BrandLogoSize = keyof typeof SIZES | number;

type BrandLogoProps = {
  size?: BrandLogoSize;
  alt?: string;
  className?: string;
  priority?: boolean;
};

function resolveSize(size: BrandLogoSize): number {
  if (typeof size === "number") return size;
  return SIZES[size];
}

export function BrandLogo({
  size = "nav",
  alt = "GoClaim",
  className,
  priority,
}: BrandLogoProps) {
  const px = resolveSize(size);

  return (
    <img
      src="/logo.svg"
      alt={alt}
      width={px}
      height={px}
      className={className}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
