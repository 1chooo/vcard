"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";


interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "absolute top-2 right-2 px-2 py-1 text-xs font-medium",
        "bg-gray-800 text-gray-200 rounded border border-gray-600",
        "hover:bg-gray-700 focus:outline-hidden focus:ring-2 focus:ring-gray-500",
        "transition-all duration-200",
        copied && "bg-green-600 hover:bg-green-600",
        className,
      )}
      aria-label="Copy code to clipboard"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
