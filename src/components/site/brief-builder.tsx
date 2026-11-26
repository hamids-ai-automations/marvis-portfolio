"use client";

import * as React from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES } from "@/data/services";
import { whatsappLink } from "@/lib/site";

const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "weeks", label: "Within a few weeks" },
  { value: "quarter", label: "This quarter" },
  { value: "exploring", label: "Just exploring" },
];

/**
 * Two-minute project brief. Pure client-side: nothing is stored or sent —
 * the answers are written into a WhatsApp message you send yourself.
 */
export function BriefBuilder() {
  const [service, setService] = React.useState<string>("");
  const [goal, setGoal] = React.useState("");
  const [timeline, setTimeline] = React.useState<string>("");

  const link = React.useMemo(() => {
    const serviceLabel =
      SERVICES.find((s) => s.slug === service)?.name ?? "Not sure yet";
    const timelineLabel =
      TIMELINES.find((t) => t.value === timeline)?.label ?? "Not sure yet";

    const lines = [
      "Hi Hamid — project brief from marvis.web.app:",
      `Service: ${serviceLabel}`,
      goal.trim() ? `Goal: ${goal.trim()}` : null,
      `Timeline: ${timelineLabel}`,
    ].filter((l): l is string => l !== null);

    return whatsappLink(lines.join("\n"));
  }, [service, goal, timeline]);

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
        The two-minute project brief
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Nothing is stored and nothing is sent anywhere. When you open
        WhatsApp, your answers are already written into the message — you
        press send.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="brief-service"
            className="text-sm font-medium text-foreground"
          >
            What do you need?
          </label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="brief-service" className="w-full">
              <SelectValue placeholder="Choose a service (or skip)" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {SERVICES.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="brief-goal"
            className="text-sm font-medium text-foreground"
          >
            Which process hurts the most?
          </label>
          <Textarea
            id="brief-goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Every Monday someone rebuilds the same report by hand from three CRMs and two ad platforms…"
            rows={4}
            className="resize-y"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="brief-timeline"
            className="text-sm font-medium text-foreground"
          >
            Timeline
          </label>
          <Select value={timeline} onValueChange={setTimeline}>
            <SelectTrigger id="brief-timeline" className="w-full">
              <SelectValue placeholder="Choose a timeline (or skip)" />
            </SelectTrigger>
            <SelectContent>
              {TIMELINES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          asChild
          size="lg"
          className="gap-2 rounded-full bg-primary font-medium text-primary-foreground hover:bg-primary/90"
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" aria-hidden="true" />
            Open WhatsApp with this brief
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
}
