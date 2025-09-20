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
  metadata: z
    .object({
      title: z.string().optional().describe('The title of the video.'),
      description: z.string().optional().describe('The description of the video.'),
    })
    .optional()
    .describe('Additional metadata about the video, such as title and description.'),
});
export type CategorizeSharedVideoLinkInput = z.infer<
  typeof CategorizeSharedVideoLinkInputSchema
>;

const CategorizeSharedVideoLinkOutputSchema = z.object({
  category: z.string().describe('The predicted category of the video.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence level of the category prediction (0 to 1).'),
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

  Analyze the following video link and its metadata (title, description) to determine the most appropriate category for the video.

  Available categories: Music, Sports, Education, Movies, News, Gaming, Entertainment, Other.

  Respond with the predicted category and a confidence level (0 to 1) for your prediction.

  Here is the video link:
  {{link}}

  Here is the video metadata:
  Title: {{metadata.title}}
  Description: {{metadata.description}}

  Category: {{category}}
  Confidence: {{confidence}}`,
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
