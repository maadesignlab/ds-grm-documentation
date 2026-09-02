import { Spinner } from "./spinner"

export type SpinnerExampleProps = {
  size?: 12 | 16 | 24 | 32
}

export function SpinnerExample({ size = 16 }: SpinnerExampleProps) {
  return <Spinner size={size} />
}
