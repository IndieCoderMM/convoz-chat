import { cn } from '../lib/tailwind-utils';

type TooltipProps = {
  text: string;
  position: "top" | "bottom" | "left" | "right";
  variant: "light" | "dark";
  size: "sm" | "md" | "lg";
};

const POSITION_STYLES = {
  top: "-top-2 left-1/2 -translate-x-1/2 -translate-y-full",
  bottom: "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full",
  left: "-left-2 top-1/2 -translate-x-full -translate-y-1/2",
  right: "-right-2 top-1/2 translate-x-full -translate-y-1/2",
};

const VARIANT_STYLES = {
  light: "bg-white text-black",
  dark: "bg-dark-800 text-white",
};

const SIZES = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-3 py-2 text-base",
};

const Tooltip = ({ text, position, variant, size }: TooltipProps) => {
  return (
    <div
      className={cn(
        "absolute w-max scale-0 rounded-md shadow-md transition-all group-hover:scale-100",
        POSITION_STYLES[position],
        VARIANT_STYLES[variant],
        SIZES[size],
      )}
    >
      {text}
    </div>
  );
};

export default Tooltip;
