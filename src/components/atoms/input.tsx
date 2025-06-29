import * as React from "react"

import { cn } from "@/lib/utils"
import { InputIconProps } from "@/components/atoms/input"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}


function InputIcon({ icon, rightIcon, className, ...props }: InputIconProps) {
  return (
    <div className="relative flex items-center">
      {icon && (
        <span className="absolute left-3 text-gray-500">{icon}</span>
      )}
      <input
        {...props}
        className={cn(
          "w-full rounded-lg border px-3 py-2 pl-10 pr-10 text-sm",
          className
        )}
      />
      {rightIcon && (
        <span className="absolute right-3 cursor-pointer">{rightIcon}</span>
      )}
    </div>
  )
}


export { Input, InputIcon }
