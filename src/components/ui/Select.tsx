// src/components/ui/Select.tsx
import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "mb-2 block text-xs leading-4 font-bold tracking-[-0.21px]",
              error ? "text-error" : "text-black"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              "rounded-default w-full appearance-none border bg-white px-6 py-[18px] text-sm leading-5 font-bold tracking-[-0.25px] text-black focus:ring-1 focus:outline-none",
              error
                ? "border-error focus:ring-error"
                : "focus:border-primary focus:ring-primary border-[#CFCFCF]",
              className
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L8 8L15 1" stroke="#D87D4A" strokeWidth="2" />
            </svg>
          </div>
        </div>
        {error && (
          <p
            id={`${props.id}-error`}
            className="text-error mt-2 text-xs font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
