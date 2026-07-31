import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-1.5 text-base text-white transition-all outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white/80 placeholder:text-white/40 focus-visible:border-neon-blue/50 focus-visible:ring-3 focus-visible:ring-neon-blue/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-white/5 disabled:opacity-50 aria-invalid:border-red-500/50 aria-invalid:ring-3 aria-invalid:ring-red-500/20 md:text-sm hover:bg-white/10 hover:border-neon-blue/30 transition-all duration-300",
        className
      )}
      {...props}
    />
  )
}

export { Input }