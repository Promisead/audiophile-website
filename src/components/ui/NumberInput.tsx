// src/components/ui/NumberInput.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface NumberInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onIncrement, onDecrement, ...props }, ref) => {
    return (
      <div className="bg-gray-light flex h-12 w-[120px] items-center">
        <button
          type="button"
          onClick={onDecrement}
          className="hover:text-primary flex h-full w-12 items-center justify-center text-black/25 transition-colors"
          aria-label="Decrease quantity"
        >
          <span className="text-base font-bold">−</span>
        </button>
        <input
          type="number"
          className={cn(
            "h-full w-12 [appearance:textfield] border-none bg-transparent text-center text-sm font-bold tracking-[1px] text-black focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={onIncrement}
          className="hover:text-primary flex h-full w-12 items-center justify-center text-black/25 transition-colors"
          aria-label="Increase quantity"
        >
          <span className="text-base font-bold">+</span>
        </button>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
