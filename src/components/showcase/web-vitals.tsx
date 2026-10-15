"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useState } from "react";
import {
  Activity,
  Zap,
  Layout,
  MousePointer,
  Clock,
  Globe,
  Route,
  Cpu,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Thresholds = {
  good: number;
  needsImprovement: number;
};

type MetricEvent = {
  metric: string;
  name: string;
  thresholds: Thresholds;
  icon: typeof Activity;
  description: string;
};

type Rating = "good" | "needs-improvement" | "poor" | "unknown";

const EVENTS: MetricEvent[] = [
  {
    metric: "LCP",
    name: "largest-contentful-paint",
    thresholds: { good: 2500, needsImprovement: 4000 },
    icon: Globe,
    description: "Largest Contentful Paint",
  },
  {
    metric: "INP",
    name: "interaction-to-next-paint",
    thresholds: { good: 200, needsImprovement: 500 },
    icon: MousePointer,
    description: "Interaction to Next Paint",
  },
  {
    metric: "CLS",
    name: "cumulative-layout-shift",
    thresholds: { good: 0.1, needsImprovement: 0.25 },
    icon: Layout,
    description: "Cumulative Layout Shift",
  },
  {
    metric: "FCP",
    name: "first-contentful-paint",
    thresholds: { good: 1800, needsImprovement: 3000 },
    icon: Zap,
    description: "First Contentful Paint",
  },
  {
    metric: "TTFB",
    name: "time-to-first-byte",
    thresholds: { good: 800, needsImprovement: 1800 },
    icon: Clock,
    description: "Time to First Byte",
  },
  {
    metric: "Next.js-hydration",
    name: "next-js-hydration",
    thresholds: { good: 1000, needsImprovement: 2500 },
    icon: Activity,
    description: "Next.js Hydration",
  },
  {
    metric: "Next.js-route-change-to-render",
    name: "next-js-route-change",
    thresholds: { good: 300, needsImprovement: 800 },
    icon: Route,
    description: "Next.js Route Change",
  },
  {
    metric: "Next.js-render",
    name: "next-js-render",
    thresholds: { good: 200, needsImprovement: 500 },
    icon: Cpu,
    description: "Next.js Render",
  },
];

function getPerformanceRating(value: number, thresholds: Thresholds): Rating {
  if (value <= thresholds.good) return "good";
  if (value <= thresholds.needsImprovement) return "needs-improvement";
  return "poor";
}

function formatValue(metric: string, value: number) {
  if (metric === "CLS") return value.toFixed(3);
  return Math.round(value);
}

function ratingClass(rating: Rating) {
  switch (rating) {
    case "good":
      return "border-green-500/40 text-green-400";
    case "needs-improvement":
      return "border-orange-yellow-crayola/50 text-orange-yellow-crayola";
    case "poor":
      return "border-red-400/40 text-red-400";
    default:
      return "border-jet text-light-gray";
  }
}

function WebVitals() {
  const [metrics, setMetrics] = useState<
    Record<string, { value: number; rating: string; timestamp: number }>
  >({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useReportWebVitals((metric) => {
    setMetrics((prev) => ({
      ...prev,
      [metric.name]: {
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
      },
    }));
    setLastUpdated(new Date().toLocaleTimeString());
  });

  const renderCard = (event: MetricEvent, compact: boolean) => {
    const metricData = metrics[event.name];
    const rating = metricData
      ? getPerformanceRating(metricData.value, event.thresholds)
      : "unknown";
    const Icon = event.icon;

    return (
      <div
        key={event.metric}
        className={cn(
          "rounded-xl border bg-eerie-black-2 p-5",
          ratingClass(rating),
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <Icon className={compact ? "size-6" : "size-8"} />
          <span className="rounded-full bg-onyx px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            {rating.replace("-", " ")}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white-2">
          {event.metric}
        </h3>
        <p className="mb-3 text-sm text-light-gray">{event.description}</p>
        <div className="mb-2 text-3xl font-bold text-white-1">
          {metricData ? formatValue(event.metric, metricData.value) : "—"}
          <span className="ml-1 text-sm font-normal text-light-gray">
            {event.metric === "CLS" ? "" : "ms"}
          </span>
        </div>
        <div className="text-xs text-light-gray-70">
          Good: {"≤"}
          {formatValue(event.metric, event.thresholds.good)}
          {event.metric === "CLS" ? "" : "ms"} | Poor: {">"}
          {formatValue(event.metric, event.thresholds.needsImprovement)}
          {event.metric === "CLS" ? "" : "ms"}
        </div>
      </div>
    );
  };

  const core = EVENTS.filter((event) =>
    ["LCP", "INP", "CLS"].includes(event.metric),
  );
  const extra = EVENTS.filter(
    (event) => !["LCP", "INP", "CLS"].includes(event.metric),
  );

  return (
    <div>
      <p className="mb-6 text-sm text-light-gray">
        Readings from this page.
        {lastUpdated ? ` Last updated ${lastUpdated}.` : ""}
      </p>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {core.map((event) => renderCard(event, false))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {extra.map((event) => renderCard(event, true))}
      </div>
    </div>
  );
}

export { WebVitals };
export default WebVitals;
