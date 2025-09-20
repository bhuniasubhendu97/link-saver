'use server';

import { categorizeSharedVideoLink, CategorizeSharedVideoLinkInput } from '@/ai/flows/categorize-shared-video-link';
import type { CategorizationResult } from '@/lib/types';
import { z } from 'zod';

export async function categorizeLinkAction(url: string): Promise<CategorizationResult> {
  const urlSchema = z.string().url();
  const validation = urlSchema.safeParse(url);

  if (!validation.success) {
    throw new Error('Invalid URL provided.');
  }

  // We can't reliably fetch and parse metadata without adding dependencies.
  // The AI flow is designed to work with just the link.
  // We'll use the domain as a placeholder title.
  const title = new URL(url).hostname.replace('www.', '');
  const description = 'Visit the link to learn more.';

  const input: CategorizeSharedVideoLinkInput = {
    link: url,
  };

  try {
    const result = await categorizeSharedVideoLink(input);
    // Combine AI result with our placeholder metadata.
    return { ...result, title, description };
  } catch (error) {
    console.error('Error in AI categorization:', error);
    throw new Error('Failed to categorize link.');
  }
}
