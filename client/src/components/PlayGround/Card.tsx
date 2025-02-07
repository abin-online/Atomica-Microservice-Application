'use client'
import * as React from "react"
import * as cn from "class-variance-authority"

const cardVariants = cn.cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default"
  }
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn.cx(cardVariants({ variant }), className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn.cx("p-6", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardContent }