import type { LucideIcon } from "lucide-react";
import {
  Film,
  Palette,
  Sparkles,
  Wand2,
  Layers,
  Music4,
} from "lucide-react";

export const profile = {
  name: "Edrian Vale",
  role: "Video Editor & Graphic Designer",
  tagline: "I cut stories that hold attention and design brands that hold up.",
  location: "Manila, PH — working worldwide",
  email: "hello@edrianvale.com",
  years: 8,
};

export const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Vimeo", href: "https://vimeo.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export const marqueeWords = [
  "Video Editing",
  "Motion Graphics",
  "Brand Identity",
  "Color Grading",
  "Sound Design",
  "Packaging",
  "Short Form",
  "Art Direction",
];

export const stats = [
  { value: 340, suffix: "+", label: "Projects delivered" },
  { value: 8, suffix: " yrs", label: "Behind the timeline" },
  { value: 62, suffix: "M", label: "Views on edited work" },
  { value: 47, suffix: "", label: "Happy clients" },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  body: string;
  tags: string[];
};

export const services: Service[] = [
  {
    icon: Film,
    title: "Video Editing",
    body: "Narrative cuts, brand films, docu-style interviews and ads — paced to keep the viewer past the first three seconds.",
    tags: ["Premiere Pro", "DaVinci Resolve", "Final Cut"],
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    body: "Titles, lower-thirds, kinetic type and animated logo stings that feel native to the edit instead of pasted on top.",
    tags: ["After Effects", "Cinema 4D", "Rive"],
  },
  {
    icon: Palette,
    title: "Brand Identity",
    body: "Logo systems, type scales and colour rules delivered as a kit your whole team can actually use without me.",
    tags: ["Illustrator", "Figma", "Guidelines"],
  },
  {
    icon: Wand2,
    title: "Color Grading",
    body: "Node-based grades, LUT builds and shot matching that give mixed-camera footage a single consistent look.",
    tags: ["Resolve", "LUTs", "Shot match"],
  },
  {
    icon: Layers,
    title: "Print & Packaging",
    body: "Posters, editorial layouts, merch and packaging prepped to spec — with press-ready files and no surprises.",
    tags: ["InDesign", "Photoshop", "Pre-press"],
  },
  {
    icon: Music4,
    title: "Sound Design",
    body: "Dialogue cleanup, licensed music edits, foley and mix levels tuned for phone speakers and cinema alike.",
    tags: ["Audition", "Mixing", "Foley"],
  },
];

export type Category = "All" | "Video" | "Motion" | "Branding" | "Print";

export type Project = {
  id: string;
  title: string;
  client: string;
  category: Exclude<Category, "All">;
  year: string;
  blurb: string;
  gradient: string;
  span: "wide" | "tall" | "normal";
  runtime?: string;
};

export const categories: Category[] = ["All", "Video", "Motion", "Branding", "Print"];

export const projects: Project[] = [
  {
    id: "nocturne",
    title: "Nocturne",
    client: "Lumen Records",
    category: "Video",
    year: "2025",
    blurb: "A four-minute music film shot on two cameras, cut to the beat and graded for neon streets.",
    gradient: "from-flare-600 via-flare-400 to-pulse-500",
    span: "wide",
    runtime: "04:12",
  },
  {
    id: "orbit",
    title: "Orbit OS",
    client: "Orbit Labs",
    category: "Motion",
    year: "2025",
    blurb: "Product launch loop with animated UI, kinetic type and a logo sting built in Cinema 4D.",
    gradient: "from-pulse-500 via-indigo-500 to-sky-400",
    span: "normal",
    runtime: "00:48",
  },
  {
    id: "saltbrew",
    title: "Saltbrew",
    client: "Coastal Coffee Co.",
    category: "Branding",
    year: "2024",
    blurb: "Full identity system: wordmark, cup packaging, signage and a 40-page brand book.",
    gradient: "from-mint-400 via-emerald-500 to-teal-600",
    span: "normal",
  },
  {
    id: "atlas",
    title: "Atlas Field Notes",
    client: "Atlas Outdoors",
    category: "Video",
    year: "2024",
    blurb: "Docu-series on backcountry guides — six episodes, interview-led, natural sound forward.",
    gradient: "from-amber-500 via-orange-600 to-rose-600",
    span: "tall",
    runtime: "12:30",
  },
  {
    id: "vertex",
    title: "Vertex Type Specimen",
    client: "Vertex Foundry",
    category: "Print",
    year: "2024",
    blurb: "Risograph specimen book pairing a variable grotesk with hand-set display cuts.",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    span: "normal",
  },
  {
    id: "halcyon",
    title: "Halcyon Titles",
    client: "Halcyon Films",
    category: "Motion",
    year: "2023",
    blurb: "Opening title sequence — 38 seconds of practical light leaks composited over kinetic credits.",
    gradient: "from-cyan-400 via-blue-500 to-pulse-500",
    span: "normal",
    runtime: "00:38",
  },
  {
    id: "meridian",
    title: "Meridian",
    client: "Meridian Studio",
    category: "Branding",
    year: "2023",
    blurb: "Architecture studio rebrand with a modular grid mark and a restrained editorial system.",
    gradient: "from-slate-400 via-zinc-500 to-ink-600",
    span: "wide",
  },
  {
    id: "riso",
    title: "Late Set Posters",
    client: "Blue Room Jazz",
    category: "Print",
    year: "2023",
    blurb: "A twelve-poster run for a jazz residency, two spot colours, printed monthly for a year.",
    gradient: "from-violet-500 via-purple-600 to-indigo-700",
    span: "normal",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Brief & discovery",
    body: "We talk through the goal, the audience and the deadline. I come back with a scope, a price and a delivery date — all fixed.",
  },
  {
    step: "02",
    title: "Assembly & direction",
    body: "Footage gets logged and a rough assembly or moodboard lands within days, so we agree on direction before polish begins.",
  },
  {
    step: "03",
    title: "Craft & revisions",
    body: "Grading, sound, motion and typography come together. Two rounds of notes are included, tracked in one place.",
  },
  {
    step: "04",
    title: "Delivery & handoff",
    body: "Masters in every aspect ratio you need, plus source files and a short guide so your team can reuse the system.",
  },
];

export const testimonials = [
  {
    quote:
      "Edrian turned 40 hours of messy footage into a six-minute film that our investors actually watched twice. The pacing is what sold it.",
    name: "Dana Okafor",
    title: "Head of Brand, Orbit Labs",
  },
  {
    quote:
      "The identity system was the first one we've had that the whole team could use without asking a designer. That alone paid for it.",
    name: "Marco Reyes",
    title: "Founder, Coastal Coffee Co.",
  },
  {
    quote:
      "Fast, calm, and unusually good at taking notes without losing the thread. Our launch video shipped two days early.",
    name: "Priya Raman",
    title: "Marketing Lead, Vertex Foundry",
  },
];

export const tools = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Illustrator",
  "Photoshop",
  "InDesign",
  "Figma",
  "Cinema 4D",
  "Blender",
  "Audition",
];
