import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

type SpinnerProps = React.ComponentProps<"svg"> & {
  size?: number
}

function Spinner({ className, size = 16, style, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  )
}

export { Spinner, type SpinnerProps }
