import type { ComponentProps } from "react"

type ButtonProps = { } & ComponentProps<"button">

export function Button({...props}: ButtonProps) {
    return (<button 
        children = {props.children}
        className = "bg-blue-600 hover:bg-blue-500 transition-colors rounded px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed" />
    )
   
}