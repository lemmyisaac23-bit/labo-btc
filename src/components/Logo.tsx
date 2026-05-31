import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showText?: boolean;
};

export const Logo = ({ className, variant = "light", showText = true }: LogoProps) => {
  const textColor = variant === "light" ? "text-gray-900" : "text-white";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="8" fill="#22c55e" />
        <text
          x="24"
          y="30"
          textAnchor="middle"
          fill="white"
          fontSize="18"
          fontWeight="bold"
          fontFamily="Georgia, serif"
        >
          BC
        </text>
        <path
          d="M32 14 L36 18 L34 20 L30 16 Z M30 16 L28 18 L32 22 L34 20 Z"
          fill="white"
          opacity="0.9"
        />
      </svg>
      {showText && (
        <div className={cn("leading-tight", textColor)}>
          <span className="block font-serif text-sm font-semibold tracking-wide">
            BtcCloudBase
          </span>
        </div>
      )}
    </div>
  );
};
