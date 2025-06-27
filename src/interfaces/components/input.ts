import type { InputHTMLAttributes, ReactNode } from "react"

export interface InputIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  rightIcon?: ReactNode
}