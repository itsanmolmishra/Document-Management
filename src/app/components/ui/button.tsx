import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-blue-900 text-white hover:bg-blue-800 shadow-lg shadow-blue-900/25 hover:shadow-xl hover:shadow-blue-900/30 active:shadow-md active:shadow-blue-900/20 border border-blue-950/10",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 active:shadow-md active:shadow-red-600/20 border border-red-700/10",
        outline:
          "border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-sm hover:shadow-md active:shadow-sm",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 shadow-sm hover:shadow-md border border-slate-200/50",
        ghost: "hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200",
        link: "text-blue-600 underline-offset-4 hover:underline active:text-blue-700",
        primary: "bg-blue-900 text-white hover:bg-blue-800 shadow-lg shadow-blue-900/25 hover:shadow-xl hover:shadow-blue-900/30 active:shadow-md active:shadow-blue-900/20 border border-blue-950/10",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/30 active:shadow-md active:shadow-green-600/20 border border-green-700/10",
      },
      size: {
        default: "h-10 px-[16px] py-[8px]",
        sm: "h-9 rounded-[6px] px-3 text-xs",
        lg: "h-12 rounded-[6px] px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, loadingText, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "cursor-wait"
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading && loadingText ? loadingText : children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }