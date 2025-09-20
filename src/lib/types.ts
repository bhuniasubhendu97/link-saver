export type SavedLink = {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  createdAt: string;
};

export type CategorizationResult = {
  title: string;
  description: string;
  category: string;
  confidence: number;
  thumbnailUrl: string;
};
