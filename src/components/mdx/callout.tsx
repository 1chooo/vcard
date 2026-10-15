import type { CSSProperties, FC, HTMLAttributes, ReactNode } from "react";

import { SVGIcons } from "@/components/svg-icons";
import { cn } from "@/lib/utils";

const TypeToEmoji = {
  default: <SVGIcons.GitHubTipIcon height="1em" />,
  error: <SVGIcons.GitHubCautionIcon height="1em" />,
  info: <SVGIcons.GitHubNoteIcon height="1em" />,
  warning: <SVGIcons.GitHubWarningIcon height="1em" />,
  important: <SVGIcons.GitHubImportantIcon height="1em" />,
};

type CalloutType = keyof typeof TypeToEmoji;

const typeClasses: Record<CalloutType, string> = {
  default: "border-green-500/40 text-green-400",
  info: "border-blue-400/40 text-blue-400",
  warning: "border-orange-yellow-crayola/50 text-orange-yellow-crayola",
  error: "border-red-400/40 text-red-400",
  important: "border-purple-400/40 text-purple-400",
};

type CalloutProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Callout style. `null` skips the border and type color.
   * @default "default"
   */
  type?: CalloutType | null;
  /**
   * Icon shown beside the text. Defaults to the GitHub icon for `type`.
   */
  emoji?: ReactNode;
};

const emojiStyle: CSSProperties = {
  fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const Callout: FC<CalloutProps> = ({
  className,
  type = "default",
  emoji = type && TypeToEmoji[type],
  ...props
}) => {
  return (
    <div
      className={cn(
        "my-4 flex items-start gap-3 overflow-x-auto rounded-xl border bg-eerie-black-2 px-4 py-3 text-sm leading-6 text-light-gray",
        type ? typeClasses[type] : "border-jet",
      )}
    >
      <div
        className="mt-0.5 shrink-0 select-none text-base"
        style={emojiStyle}
        data-pagefind-ignore="all"
      >
        {emoji}
      </div>
      <div className={cn("min-w-0 flex-1", className)} {...props} />
    </div>
  );
};
