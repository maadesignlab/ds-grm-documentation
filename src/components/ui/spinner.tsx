import { cn } from "@/lib/utils"
import { LoaderIcon } from "lucide-react"
import { cva } from "class-variance-authority"

const spinnerSizes = cva("animate-spin text-current [animation-duration:var(--spinner-duration)]", {
  variants: {
    size: {
      12: "size-3",
      16: "size-4",
      24: "size-6",
      32: "size-8",
    },
  },
  defaultVariants: {
    size: 16,
  },
})

type SpinnerProps = React.ComponentProps<"svg"> & {
  size?: 12 | 16 | 24 | 32
}

function Spinner({ className, size = 16, ...props }: SpinnerProps) {
  const spinnerSize = spinnerSizes({ size })
  return (
    <LoaderIcon
      data-slot="spinner"
      data-size={size}
      role="status"
      aria-label="Loading"
      className={cn(spinnerSize, className)}
      {...props}
    />
  )
}

export { Spinner, type SpinnerProps }
