// src/components/ui/Radio.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register?: UseFormRegisterReturn;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, register, ...props }, ref) => {
    return (
      <label
        className={cn(
          "hover:border-primary rounded-default flex cursor-pointer items-center gap-4 border border-[#CFCFCF] px-4 py-[18px] transition-colors",
          "has-checked:border-primary has-focus-visible:ring-primary has-focus-visible:ring-1",
          className
        )}
      >
        <input
          type="radio"
          className="checked:border-primary focus-visible:ring-primary checked:border-10px h-5 w-5 appearance-none rounded-full border-[1.5px] border-[#CFCFCF] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          ref={ref}
          {...register}
          {...props}
        />
        <span className="text-sm leading-5 font-bold tracking-[-0.25px] text-black">
          {label}
        </span>
      </label>
    );
  }
);

Radio.displayName = "Radio";

export { Radio };
