import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";
import React from "react";
import { cn } from "~/utils/misc";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function TextInput({ className, ...props }: TextInputProps) {
  return (
    <input
      className={cn("transition-all duration-300 bg-primary border-b-4 border-bPrimary focus:border-blush outline-none hover:border-blush", className)}
      {...props}
    />
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "transition-all duration-300 hover:transform hover:scale-105 bg-saffron p-2 w-80 rounded-md !shadow-blush shadow-primaryButton hover:bg-blush text-primary hover:shadow-primaryButtonHover hover:!shadow-ultraViolet text-xl my-4 flex justify-center items-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Box({ className, children, ...props }: BoxProps) {
  return (
    <div
      className={cn(
        "border-4 border-bPrimary rounded-3xl w-1/3 h-1/2 flex justify-center items-center flex-col shadow-blackNoFade",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Textlink({
  className,
  children,
  to,
  ...props
}: RemixLinkProps) {
  return (
    <Link to={to} className={cn("text-blush underline hover:text-saffron transition-all duration-300", className)} {...props}>
      {children}
    </Link>
  );
}

export function ClickableLogo () {
  return (
    <div className="flex justify-start">
    <Link to="/">
        <img
            alt="Harmony Hub Logo"
            src="/HarmonyHubLogo.svg"
            draggable="false"
            className="max-w-96 p-8"
        />
    </Link>
</div>
  );
}