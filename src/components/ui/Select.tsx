import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "placeholder"
> & {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
};

export function Select({
  className,
  label,
  error,
  helperText,
  placeholder,
  options,
  id,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "flex h-10 w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
          "dark:focus-visible:ring-gray-600 dark:focus-visible:ring-offset-gray-950",
          error && "border-red-500 focus-visible:ring-red-500",
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}
