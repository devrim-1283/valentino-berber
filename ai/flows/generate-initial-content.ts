'use server';

/**
 * @fileOverview An AI agent for generating initial website content.
 *
 * - generateInitialContent - A function that generates initial website content based on the selected template and business type.
 * - GenerateInitialContentInput - The input type for the generateInitialContent function.
 * - GenerateInitialContentOutput - The return type for the generateInitialContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialContentInputSchema = z.object({
  templateName: z.string().describe('The name of the selected website template.'),
  businessType: z.string().describe('The type of business the website is for.'),
});

export type GenerateInitialContentInput = z.infer<typeof GenerateInitialContentInputSchema>;

const GenerateInitialContentOutputSchema = z.object({
  sections: z.array(
    z.object({
      title: z.string().describe('The title of the section.'),
      content: z.string().describe('The content of the section.'),
    })
  ).describe('The generated website sections with titles and content.'),
});

export type GenerateInitialContentOutput = z.infer<typeof GenerateInitialContentOutputSchema>;

export async function generateInitialContent(
  input: GenerateInitialContentInput
): Promise<GenerateInitialContentOutput> {
  return generateInitialContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialContentPrompt',
  input: {schema: GenerateInitialContentInputSchema},
  output: {schema: GenerateInitialContentOutputSchema},
  prompt: `You are a website content generation expert. You will generate initial content (text) for a website based on the chosen template and business type.

  The website template name is: {{{templateName}}}
  The business type is: {{{businessType}}}

  Generate content for the following sections: About Us, Services, Contact Us.

  The output should be a JSON array of sections, each with a title and content field.
  `,
});

const generateInitialContentFlow = ai.defineFlow(
  {
    name: 'generateInitialContentFlow',
    inputSchema: GenerateInitialContentInputSchema,
    outputSchema: GenerateInitialContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
