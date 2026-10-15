import type { ReactNode } from "react";
import {
  Lightbulb,
  Info,
  AlertTriangle,
  AlertCircle,
  MessageSquareWarning,
} from "lucide-react";

import { cn } from "@/lib/utils";


interface MarkdownAlertProps {
  type: "tip" | "info" | "warning" | "danger" | "important";
  children: ReactNode;
  className?: string;
}

const alertConfig = {
  tip: {
    icon: Lightbulb,
    className: "border-green-500/20 bg-green-500/10 text-green-100",
    iconClassName: "text-green-400",
  },
  info: {
    icon: Info,
    className: "border-blue-500/20 bg-blue-500/10 text-blue-100",
    iconClassName: "text-blue-400",
  },
  important: {
    icon: MessageSquareWarning,
    className: "border-purple-500/20 bg-purple-500/10 text-purple-100",
    iconClassName: "text-purple-400",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/20 bg-yellow-500/10 text-yellow-100",
    iconClassName: "text-yellow-400",
  },
  danger: {
    icon: AlertCircle,
    className: "border-red-500/20 bg-red-500/10 text-red-100",
    iconClassName: "text-red-400",
  },
};

function MarkdownAlert({ type, children, className }: MarkdownAlertProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border p-4 my-4",
        config.className,
        className,
      )}
    >
      <Icon
        className={cn("h-5 w-5 mt-0.5 shrink-0", config.iconClassName)}
      />
      <div className="flex-1 space-y-2">{children}</div>
    </div>
  );
}

// 用於高亮文本的組件
interface HighlightProps {
  children: ReactNode;
  variant?: "green" | "blue" | "yellow" | "red" | "purple";
}

function Highlight({ children, variant = "blue" }: HighlightProps) {
  const variants = {
    green: "text-green-400 font-medium",
    blue: "text-blue-400 font-medium",
    yellow: "text-yellow-400 font-medium",
    red: "text-red-400 font-medium",
    purple: "text-purple-400 font-medium",
  };

  return <span className={variants[variant]}>{children}</span>;
}

export { Highlight, MarkdownAlert };
export type { MarkdownAlertProps, HighlightProps };
export default MarkdownAlert;
