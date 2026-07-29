import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Mic,
  Music,
  Star,
  XCircle,
} from "lucide-react";
import type { ElementType } from "react";

export const LANDSCAPE_SECTION_ICON_CONFIG = {
  calendar: Calendar,
  check: CheckCircle2,
  mic: Mic,
  award: Award,
  x: XCircle,
  music: Music,
  briefcase: Briefcase,
  star: Star,
  clock: Clock,
  flame: Flame,
} satisfies Record<string, ElementType>;

export type LandscapeSectionIconKey =
  keyof typeof LANDSCAPE_SECTION_ICON_CONFIG;

export const DEFAULT_LANDSCAPE_SECTION_ICON_KEYS: Record<
  string,
  LandscapeSectionIconKey
> = {
  "Latest Videos": "clock",
  Covers: "mic",
  "Solo Piano": "music",
  Tutorials: "award",
  "Live Sessions": "star",
};
