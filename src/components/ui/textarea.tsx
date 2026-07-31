import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-2 text-base text-white transition-all outline-none placeholder:text-white/40 focus-visible:border-neon-blue/50 focus-visible:ring-3 focus-visible:ring-neon-blue/20 disabled:cursor-not-allowed disabled:bg-white/5 disabled:opacity-50 aria-invalid:border-red-500/50 aria-invalid:ring-3 aria-invalid:ring-red-500/20 md:text-sm hover:bg-white/10 hover:border-neon-blue/30 transition-all duration-300 resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }