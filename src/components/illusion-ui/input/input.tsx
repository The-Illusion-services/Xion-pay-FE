import * as React from "react";

import { cn } from "@/src/utils/shadcn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex  h-10 w-full rounded-md bg-transparent px-3 py-2 text-white border-[1px] border-border-primary focus:border-indigo-primary outline-none transition-colors duration-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
