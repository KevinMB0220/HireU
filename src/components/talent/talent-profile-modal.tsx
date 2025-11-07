"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MapPin, Star, Clock, DollarSign, Briefcase } from "lucide-react";
import type { Talent } from "@/lib/mock-data/talent-data";

interface TalentProfileModalProps {
  open: boolean;
  talent: Talent | null;
  onOpenChange: (open: boolean) => void;
}

// Modal that presents a richer view of the selected talent profile
export default function TalentProfileModal({ open, talent, onOpenChange }: TalentProfileModalProps) {
  if (!talent) {
    return <Dialog open={open} onOpenChange={onOpenChange} />;
  }

  const profileHighlights = [
    {
      label: "Rating",
      value: `${talent.rating} / 5.0`,
      icon: Star,
    },
    {
      label: "Hourly rate",
      value: `$${talent.hourlyRate}/hr`,
      icon: DollarSign,
    },
    {
      label: "Response time",
      value: "Typically within 24h",
      icon: Clock,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden border-0 p-0 rounded-3xl">
        <div className="bg-gradient-to-br from-[#002333] via-[#004a5d] to-[#15949C] px-8 py-10 text-white">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/30 bg-white/10 text-3xl font-semibold text-white">
              {talent.name.charAt(0)}
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold tracking-tight">{talent.name}</h2>
                <Badge className="bg-white/15 text-white hover:bg-white/15">{talent.category}</Badge>
              </div>
              <p className="text-white/80">{talent.title}</p>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
                <MapPin className="h-4 w-4" />
                <span>{talent.location}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-white/80">
              {[
                { label: "Rating", value: `${talent.rating} / 5.0`, icon: Star },
                { label: "Hourly rate", value: `$${talent.hourlyRate}/hr`, icon: DollarSign },
                { label: "Response", value: "Replies within 24h", icon: Clock },
                { label: "Projects", value: "48 completed", icon: Briefcase }
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-white">{value}</p>
                      <p className="text-xs uppercase tracking-wide text-white/70">{label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 bg-white px-8 py-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#002333]">About {talent.name.split(" ")[0]}</DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                {talent.description}
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-[#002333] mb-3">Core skills</h3>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map((skill, idx) => (
                  <Badge
                    key={`${talent.id}-${skill.name}-${idx}`}
                    variant="secondary"
                    className="bg-white text-[#002333]"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#002333] mb-3">Sample recent work</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Designed and shipped a full mobile banking experience with 20+ screens.",
                  "Implemented end-to-end authentication and analytics for a SaaS dashboard.",
                  "Collaborated with a global product team on rapid iteration cycles."
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#15949C]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#002333] mb-3">Availability</h3>
              <p className="text-sm text-gray-600">
                Open for 20-25 hours per week. Prefers long-term engagements with milestone-based delivery.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#002333] mb-3">Collaboration preferences</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Weekly syncs with shared progress updates.",
                  "Prefers design systems or technical guidelines upfront.",
                  "Comfortable collaborating across time zones whenever needed."
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#15949C]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#d4ecef] bg-[#f6fbfc] p-5">
              <h3 className="text-sm font-semibold text-[#002333] mb-2">Next steps</h3>
              <p className="text-sm text-[#0f5b66]">
                Share your project details and milestones to invite {talent.name.split(" ")[0]} for a tailored proposal.
              </p>
              <Button className="mt-4 w-full bg-[#15949C] hover:bg-[#15949C]/90">
                Invite to project (Demo)
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
