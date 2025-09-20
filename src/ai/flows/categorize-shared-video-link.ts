'use server';
/**
 * @fileOverview Categorizes a shared video link using AI.
 *
 * - categorizeSharedVideoLink - A function that categorizes a shared video link.
 * - CategorizeSharedVideoLinkInput - The input type for the categorizeSharedVideoLink function.
 * - CategorizeSharedVideoLinkOutput - The return type for the categorizeSharedVideoLink function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeSharedVideoLinkInputSchema = z.object({
  link: z.string().url().describe('The URL of the shared video.'),
});
export type CategorizeSharedVideoLinkInput = z.infer<
  typeof CategorizeSharedVideoLinkInputSchema
>;

const CategorizeSharedVideoLinkOutputSchema = z.object({
  title: z.string().describe('The original title of the video.'),
  description: z.string().describe('The original description of the video.'),
  category: z.string().describe('The predicted category of the video.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence level of the category prediction (0 to 1).'),
  thumbnailUrl: z.string().url().describe("A URL for the video's thumbnail image."),
});
export type CategorizeSharedVideoLinkOutput = z.infer<
  typeof CategorizeSharedVideoLinkOutputSchema
>;

export async function categorizeSharedVideoLink(
  input: CategorizeSharedVideoLinkInput
): Promise<CategorizeSharedVideoLinkOutput> {
  return categorizeSharedVideoLinkFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeSharedVideoLinkPrompt',
  input: {schema: CategorizeSharedVideoLinkInputSchema},
  output: {schema: CategorizeSharedVideoLinkOutputSchema},
  prompt: `You are an AI expert in categorizing videos based on their content.

  Visit the given video link, extract the original title, any available description, and a URL for a thumbnail image.
  Generate the most accurate category. Available categories: Music, Sports, Education, Movies, News, Gaming, Entertainment, or suggest a new category if none of these fit well.

  Analyze the content at the following video link to determine the most appropriate category for the video.

  Here is the video link:
  {{link}}

  Return the original title, the assigned category, a confidence score for your categorization, and the thumbnail URL.`,
});

const categorizeSharedVideoLinkFlow = ai.defineFlow(
  {
    name: 'categorizeSharedVideoLinkFlow',
    inputSchema: CategorizeSharedVideoLinkInputSchema,
    outputSchema: CategorizeSharedVideoLinkOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
