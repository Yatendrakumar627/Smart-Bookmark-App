import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ className, variant = 'default', children, ...props }) {
  const baseStyles = "rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md";
  
  const variants = {
    default: "bg-card border-border",
    glass: "glass-card border-white/10 text-white"
  };

  return (
    <div
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return <div className={twMerge(clsx("flex flex-col space-y-1.5 p-6", className))} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }) {
  return <h3 className={twMerge(clsx("text-2xl font-semibold leading-none tracking-tight", className))} {...props}>{children}</h3>;
}

export function CardContent({ className, children, ...props }) {
  return <div className={twMerge(clsx("p-6 pt-0", className))} {...props}>{children}</div>;
}
