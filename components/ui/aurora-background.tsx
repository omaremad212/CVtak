"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 text-slate-950 overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Fast gradient — no blur, no blend-mode, only background-position animated (GPU-only) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none animate-aurora-gradient"
          style={{
            background:
              "linear-gradient(-45deg, #faf9f6, #fff2ea, #fdf6f0, #fff8f2, #ffeedd, #faf9f6)",
            backgroundSize: "400% 400%",
          }}
        />
        {/* Optional radial vignette to focus attention */}
        {showRadialGradient && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 70% 0%, rgba(255,86,0,0.07) 0%, transparent 70%)",
            }}
          />
        )}
        {children}
      </div>
    </main>
  );
};
