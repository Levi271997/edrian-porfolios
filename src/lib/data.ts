import type { LucideIcon } from "lucide-react";
import {
  Captions,
  Film,
  Image,
  MonitorPlay,
  Smartphone,
  Sparkles,
} from "lucide-react";

export const profile = {
  name: "Edrian",
  role: "Video Editor & Graphic Designer",
  tagline: "I edit scroll-stopping video ads and design graphics that sell.",
  location: "Freelancer based in the Philippines",
  email: "edrianpadilla03212002@gmail.com",
  years: 2,
  age: 25,
  education: "B.S. Information Technology",
};


export const marqueeWords = [
  "Video Ads",
  "UGC Edits",
  "AI Video",
  "Short Form",
  "Static Ads",
  "Captions & Subtitles",
  "Long Form",
  "Social Graphics",
];

/** Counts taken from the work on this site. */
export const stats = [
  { value: 31, suffix: "", label: "Videos in this portfolio" },
  { value: 6, suffix: "", label: "Ad graphics" },
  { value: 8, suffix: "", label: "Industries served" },
  { value: 2, suffix: " yrs", label: "Editing & designing" },
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
    title: "Video Ad Editing",
    body: "Direct-response ads for e-commerce, insurance, health and home services — hook first, clear offer, strong call to action.",
    tags: ["Premiere Pro", "CapCut", "Paid social"],
  },
  {
    icon: Smartphone,
    title: "UGC & Short Form",
    body: "Creator-style edits for TikTok, Reels and Shorts: fast pacing, punchy captions and formats like split-screen and POV.",
    tags: ["CapCut", "TikTok", "Reels"],
  },
  {
    icon: Sparkles,
    title: "AI Video",
    body: "Product spots and UGC-style ads built from AI-generated footage, then cut, captioned and paced like real ads.",
    tags: ["AI footage", "CapCut", "Premiere Pro"],
  },
  {
    icon: Image,
    title: "Graphic Design",
    body: "Static ads, promo cards and social graphics with clear offers and bold type, sized for every placement.",
    tags: ["Photoshop", "Static ads", "Social"],
  },
  {
    icon: MonitorPlay,
    title: "Long Form & VSL",
    body: "YouTube videos, video sales letters and podcast edits that hold attention past the first few minutes.",
    tags: ["Premiere Pro", "YouTube", "VSL"],
  },
  {
    icon: Captions,
    title: "Captions & Localization",
    body: "Animated captions and subtitled re-edits that take a winning ad into new markets and languages.",
    tags: ["Subtitles", "Captions", "Re-edits"],
  },
];

export type Category =
  | "All"
  | "UGC"
  | "AI Video"
  | "Video Ads"
  | "Long Form"
  | "Graphics";

export type Orientation = "vertical" | "square" | "landscape";

export type Project = {
  id: string;
  title: string;
  /** Brand or format line shown under the title. */
  client: string;
  category: Exclude<Category, "All">;
  blurb: string;
  kind: "video" | "image";
  /** Path under /public; run through `asset()` before rendering. */
  src: string;
  poster: string;
  orientation: Orientation;
  runtime?: string;
};

export const categories: Category[] = [
  "All",
  "UGC",
  "AI Video",
  "Video Ads",
  "Long Form",
  "Graphics",
];

const video = (
  id: string,
  title: string,
  client: string,
  category: Project["category"],
  runtime: string,
  blurb: string,
  orientation: Orientation = "vertical",
): Project => ({
  id,
  title,
  client,
  category,
  runtime,
  blurb,
  orientation,
  kind: "video",
  src: `/media/videos/${id}.mp4`,
  poster: `/media/posters/${id}.jpg`,
});

const graphic = (
  n: number,
  title: string,
  client: string,
  blurb: string,
  orientation: Orientation = "vertical",
): Project => ({
  id: `graphic-${n}`,
  title,
  client,
  category: "Graphics",
  blurb,
  orientation,
  kind: "image",
  src: `/media/graphics/graphic-${n}.jpg`,
  poster: `/media/graphics/graphic-${n}.jpg`,
});

/** Ordered so the first screen of "All" mixes formats. */
export const projects: Project[] = [
  video("skool-ugc", "Skool Creator Ad", "Skool · UGC", "UGC", "0:25", "Fast-cut UGC ad stacking creator clips and captions to sell the Skool community platform."),
  video("ai-adult-ecom-1", "Waterproof Product Spot", "E-commerce brand · AI", "AI Video", "0:24", "AI-generated product hero shots cut to a punchy vertical spot for paid social."),
  video("static-video", "DirectMeds Tirzepatide", "DirectMeds · Static video", "Video Ads", "1:48", "Static-style video ad: animated offer layout, price comparison and trust badges.", "square"),
  graphic(3, "Valentine's Offer", "Flawless Skin Centre", "Seasonal promo for laser hair removal — bold serif offer type over warm pink tones."),
  video("ugc-1", "Weight-Loss Story", "Health brand · UGC", "UGC", "1:22", "Testimonial-led UGC with kinetic captions and before/after beats."),
  video("ai-supplement-1", "Supplement Brand — Spot 1", "Supplement brand · AI", "AI Video", "0:19", "Short AI-driven lifestyle spot with bold caption callouts."),
  video("video-graphic", "CreatorFlo Motion Ad", "CreatorFlo · Motion graphics", "Video Ads", "0:19", "Motion-graphic ad mixing talking-head footage with animated logo and UI callouts."),
  video("ugc-gameplay", "Bakery Story + Gameplay", "Split-screen UGC", "UGC", "0:26", "Split-screen format pairing a founder story with gameplay to hold scroll attention."),
  graphic(1, "Get More Done", "CreatorFlo", "Static ad for an AI content tool — product shot, benefit bullets and a clear CTA."),
  video("home-security", "Home Security Ad", "Home security · Video ad", "Video Ads", "0:44", "Doorbell-cam hook into a problem/solution pitch for a home-security offer."),
  video("ugc-ai-ecom", "Hair Restoration Story", "E-commerce brand · AI UGC", "AI Video", "0:40", "AI UGC testimonial built around a hair-restoration product."),
  video("news-reel", "News-Style Reel", "Short-form reel", "Video Ads", "0:32", "News-format reel with lower-thirds and dramatic caption pacing."),
  video("ugc-2", "Going-Viral POV", "Creator tool · UGC", "UGC", "0:22", "POV-style UGC ad with relatable hook and on-screen text."),
  video("medicare-2", "Senior Utility Explainer", "Medicare · Video ad", "Video Ads", "0:58", "Square news-style explainer for a senior benefits offer.", "square"),
  graphic(4, "February Sale", "Flawless Skin Centre", "Laser hair removal sale card with a playful 'Get Smooth / Stay Prickly' choice."),
  video("ai-ugc", "Retirement Savings Story", "Finance · AI UGC", "AI Video", "0:42", "AI UGC ad on retirement savings, cut with b-roll and captions."),
  video("shopify", "Shopify Founder Ad", "Shopify · Talking head", "UGC", "0:37", "Founder-to-camera ad with punchy word-by-word captions."),
  video("auto-insurance", "Auto Insurance Quote", "Auto insurance · Video ad", "Video Ads", "0:10", "Interactive-style quote flow animated over driving footage.", "square"),
  video("ugc-3", "Sobriety Story", "Wellness · UGC", "UGC", "0:49", "Personal-story UGC with emotional pacing and clear captions."),
  video("ai-adult-ecom-2", "Level Ten Teaser", "E-commerce brand · AI", "AI Video", "0:29", "Graphic-led AI teaser built around an animated intensity dial."),
  video("life-insurance", "Life Insurance Ad", "Life insurance · Video ad", "Video Ads", "0:56", "Split-screen reaction format for a life-insurance offer."),
  graphic(6, "3 Causes of a Saggy Mom Belly", "Sweet Birth", "Problem/solution static for a postpartum wrap — icon list and product payoff.", "square"),
  video("ugc-4", "Morning Routine UGC", "Lifestyle · UGC", "UGC", "1:01", "Selfie-style UGC with green-screen product cutaways."),
  video("replacement-program", "Replacement Program", "Home improvement · Video ad", "Video Ads", "1:07", "Story-driven home-improvement ad with curiosity hooks."),
  video("ai-supplement-2", "Supplement Brand — Spot 2", "Supplement brand · AI", "AI Video", "0:19", "AI spot on blood-pressure health with stat-driven captions."),
  video("medicare", "Medicare Ad", "Medicare · Video ad", "Video Ads", "0:33", "Senior-focused benefits ad with reaction footage and captions."),
  graphic(2, "3 Sessions for $68", "Flawless Skin Centre", "Clean, airy promo graphic for a February laser hair offer."),
  video("ecom", "Gadget E-commerce Ad", "E-commerce · Video ad", "Video Ads", "0:57", "Product demo stacked over a talking-head pitch."),
  video("replacement-program-2", "Replacement Program — Cut 2", "Home improvement · Video ad", "Video Ads", "0:53", "Alternate hook and pacing for A/B testing."),
  video("adult-ecom", "Doctor-Recommended Product", "E-commerce brand · Video ad", "Video Ads", "0:55", "Authority-led e-commerce ad built around a doctor recommendation hook."),
  video("swedish-ecom", "Swedish Hair-Tool Ad", "Swedish e-commerce brand", "Video Ads", "0:40", "Localized Swedish ad for a hair styling tool."),
  graphic(5, "Valentine's Card", "Flawless Skin Centre", "Hearts-and-cupid seasonal variant of the laser offer."),
  video("translation", "Headlight Ad — Translated", "Localized video ad", "Video Ads", "2:00", "Ad re-edited and subtitled for a non-English market."),
  video("video-ad-2", "Skincare Routine Ad", "Beauty · Video ad", "Video Ads", "0:34", "Close-up beauty routine with soft captions."),
  video("ecom-short", "Phone Battery Teaser", "E-commerce · Short", "Video Ads", "0:07", "Seven-second bumper for a phone accessory."),
  video("ai-film", "Behind Closed Doors", "AI long-form video", "Long Form", "5:06", "Five-minute AI-visual narrative with bold kinetic captions.", "landscape"),
  video("victory-ministries", "Victory Christian Ministries", "Ministry · Long form", "Long Form", "2:27", "Typography-driven long-form piece for a church ministry.", "landscape"),
];

/** Featured in the Showreel section. */
export const showreel = projects.find((p) => p.id === "ai-film")!;

export const processSteps = [
  {
    step: "01",
    title: "Brief",
    body: "Send the goal, the platform, the footage or product and any reference ads. I confirm the scope and the delivery date.",
  },
  {
    step: "02",
    title: "First cut",
    body: "I build the hook, structure and captions and send a first version quickly, so we agree on direction early.",
  },
  {
    step: "03",
    title: "Revisions",
    body: "Your notes go into the next version — pacing, text, music and graphics tightened until it is ready to run.",
  },
  {
    step: "04",
    title: "Delivery",
    body: "Final files in every size you need (9:16, 1:1, 16:9), plus hook or caption variations for testing.",
  },
];

export const tools = ["Adobe Premiere Pro", "Adobe Photoshop", "CapCut"];
