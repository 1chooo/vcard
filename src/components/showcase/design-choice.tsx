"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DesignChoiceProps {
  earlier: ReactNode;
  current: ReactNode;
}

function DesignChoice({ earlier, current }: DesignChoiceProps) {
  const [choice, setChoice] = useState<"earlier" | "current">("earlier");

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Design version">
        <ChoiceButton
          pressed={choice === "earlier"}
          onClick={() => setChoice("earlier")}
        >
          Earlier
        </ChoiceButton>
        <ChoiceButton
          pressed={choice === "current"}
          onClick={() => setChoice("current")}
        >
          Current
        </ChoiceButton>
      </div>
      {choice === "earlier" ? earlier : current}
    </div>
  );
}

function ChoiceButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm transition-colors",
        pressed
          ? "border-orange-yellow-crayola text-orange-yellow-crayola"
          : "border-jet text-light-gray hover:text-white-2",
      )}
    >
      {children}
    </button>
  );
}

export { DesignChoice };
export default DesignChoice;
