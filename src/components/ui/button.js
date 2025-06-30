import { forwardRef } from "react";
import clsx from "clsx";

export const Button = forwardRef(function Button({ className, children, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={clsx(
        "cursor-pointer inline-flex items-center justify-center rounded-xl bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors",
        "hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
