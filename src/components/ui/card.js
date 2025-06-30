import clsx from "clsx";

export function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "bg-white/40 backdrop-blur-xl shadow-xl rounded-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={clsx("p-6", className)}>{children}</div>;
}
