import { forwardRef } from "react";
import clsx from "clsx";

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={clsx(
        "w-full rounded-xl border border-blue-100 bg-transparent backdrop-blur-sm px-4 py-2 text-sm shadow-sm",
        "placeholder-blue-900 text-blue-500",
        "focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/60",
        className
      )}
      {...props}
    />
  );
});
