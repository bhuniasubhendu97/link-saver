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

  const input: CategorizeSharedVideoLinkInput = {
    link: url,
  };

  try {
    const result = await categorizeSharedVideoLink(input);
    return { ...result };
  } catch (error) {
    console.error('Error in AI categorization:', error);
    throw new Error('Failed to categorize link.');
  }
}
