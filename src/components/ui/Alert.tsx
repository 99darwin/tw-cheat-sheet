import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react"

const icons = {
  default: Info,
  destructive: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle,
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof icons
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const Icon = icons[variant]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4",
          {
            "border-zinc-800 bg-zinc-950 text-zinc-50": variant === "default",
            "border-red-800 bg-red-950 text-red-50": variant === "destructive",
            "border-yellow-800 bg-yellow-950 text-yellow-50": variant === "warning",
            "border-green-800 bg-green-950 text-green-50": variant === "success",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription } 