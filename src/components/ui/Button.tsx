// src/components/ui/Button.tsx
import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-manrope font-bold uppercase tracking-[1px] transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-hover",
        outline:
          "border border-black bg-transparent text-black hover:bg-black hover:text-white",
        hover: "bg-primary-hover text-white hover:bg-primary",
        black: "bg-black text-white hover:bg-[#4C4C4C]",
        link: "text-black/50 hover:text-primary inline-flex items-center gap-3 normal-case tracking-normal font-bold",
      },
      size: {
        default: "px-[30px] py-[15px] text-[13px] leading-[17.76px]",
        sm: "px-6 py-3 text-xs",
        lg: "px-10 py-4 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonPropsBase = VariantProps<typeof buttonVariants> & {
  className?: string;
};

type LinkButtonProps = ButtonPropsBase &
  LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

type RegularButtonProps = ButtonPropsBase &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps =
  | (LinkButtonProps & { href: string })
  | (RegularButtonProps & { href?: undefined });

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, href, ...props }, ref) => {
  const classes = cn("btn", buttonVariants({ variant, size, className }));

  if (href) {
    const linkProps = props as Omit<LinkButtonProps, "href">; // ✅ removes duplicate `href`
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...linkProps}
      />
    );
  }

  const buttonProps = props as RegularButtonProps;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...buttonProps}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
