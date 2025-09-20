import { categorizeSharedVideoLink } from "@/ai/flows/categorize-shared-video-link";

export type SavedLink = {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
};

export type CategorizationResult = {
  category: string;
  confidence: number;
  title: string;
  description: string;
};
