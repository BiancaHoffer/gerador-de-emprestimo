import { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {
  width?: string
}

export function Input({ width = "max-w-full", ...props }: InputProps) {
  return (
    <input className={`${width} bg-zinc-50 shadow-md active:shadow-lg w-full focus:shadow-lg focus:border-none p-3 rounded-lg`} {...props} />
  )
}