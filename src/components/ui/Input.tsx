// src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  register?: UseFormRegisterReturn;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helperText, type = "text", register, ...props },
    ref
  ) => {
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
        <input
          type={type}
          className={cn(
            "caret-primary rounded-default w-full border px-6 py-[18px] text-sm leading-5 font-bold tracking-[-0.25px] text-black placeholder:text-black/40 focus:ring-1 focus:outline-none",
            error
              ? "border-error focus:ring-error"
              : "focus:border-primary focus:ring-primary border-[#CFCFCF]",
            className
          )}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...register}
          {...props}
        />
        {error && (
          <p
            id={`${props.id}-error`}
            className="text-error mt-2 text-xs font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-gray-dark mt-2 text-xs">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
