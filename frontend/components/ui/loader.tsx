"use client";

import { useState, useEffect } from "react";
import { Loader2, Zap } from "lucide-react";

interface PageLoaderProps {
  variant?: "spinner" | "skeleton" | "pulse" | "dots" | "progress";
  size?: "sm" | "md" | "lg";
  text?: string;
  showProgress?: boolean;
}

export default function PageLoader({
  variant = "spinner",
  size = "md",
  text = "Loading...",
  showProgress = false,
}: PageLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (showProgress) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + Math.random() * 15;
        });
      }, 200);
      return () => clearInterval(timer);
    }
  }, [showProgress]);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  if (variant === "spinner") {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            className={`${sizeClasses[size]} animate-spin text-primary`}
          />
          <p
            className={`${textSizeClasses[size]} text-muted-foreground font-medium`}
          >
            {text}
          </p>
          {showProgress && (
            <div className="w-48 bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "skeleton") {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="w-full max-w-md mx-4 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
          </div>
          <div className="flex justify-center">
            <p
              className={`${textSizeClasses[size]} text-muted-foreground font-medium`}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div
              className={`${sizeClasses[size]} bg-primary rounded-full animate-ping absolute`}
            />
            <div
              className={`${sizeClasses[size]} bg-primary rounded-full animate-pulse`}
            />
          </div>
          <p
            className={`${textSizeClasses[size]} text-foreground font-medium animate-pulse`}
          >
            {text}
          </p>
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
          </div>
          <p
            className={`${textSizeClasses[size]} text-muted-foreground font-medium`}
          >
            {text}
          </p>
        </div>
      </div>
    );
  }

  if (variant === "progress") {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-4">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-xl font-semibold">Loading</h2>
          </div>
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{text}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
