'use server';
/**
 * @fileOverview This file implements a Genkit flow for answering user questions
 * from the Expert Knowledge Hub by synthesizing information from provided articles.
 *
 * - aiAnswerKnowledgeQuestion - A function that handles answering knowledge hub questions.
 * - AIAnswerKnowledgeQuestionInput - The input type for the aiAnswerKnowledgeQuestion function.
 * - AIAnswerKnowledgeQuestionOutput - The return type for the aiAnswerKnowledgeQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIAnswerKnowledgeQuestionInputSchema = z.object({
  question: z.string().describe('The user\'s question about crypto recovery.'),
  contextArticles: z.array(z.string()).optional().describe('A list of relevant article contents to use as context for answering the question.'),
});
export type AIAnswerKnowledgeQuestionInput = z.infer<typeof AIAnswerKnowledgeQuestionInputSchema>;

const AIAnswerKnowledgeQuestionOutputSchema = z.object({
  answer: z.string().describe('A concise AI-generated answer to the user\'s question.'),
});
export type AIAnswerKnowledgeQuestionOutput = z.infer<typeof AIAnswerKnowledgeQuestionOutputSchema>;

export async function aiAnswerKnowledgeQuestion(input: AIAnswerKnowledgeQuestionInput): Promise<AIAnswerKnowledgeQuestionOutput> {
  return answerKnowledgeQuestionFlow(input);
}

const knowledgeQuestionPrompt = ai.definePrompt({
  name: 'knowledgeQuestionPrompt',
  input: { schema: AIAnswerKnowledgeQuestionInputSchema },
  output: { schema: AIAnswerKnowledgeQuestionOutputSchema },
  prompt: `You are a lead analyst at AnalogHeal Forensics, an expert in crypto recovery and digital asset reclamation. Your goal is to provide concise, direct, and authoritative answers to user questions based on forensic principles.

Answer the following question based on the provided context articles. If no context articles are provided, or if they do not contain the answer, use your specialized forensic knowledge to answer as best as you can.

User Question: {{{question}}}

{{#if contextArticles}}
Context Articles:
{{#each contextArticles}}
Article {{(@index) + 1}}:
---
{{{this}}}
---

{{/each}}
{{/if}}

Provide a concise, professional answer in a paragraph or two. Maintain an authoritative yet empathetic tone.`, 
});

const answerKnowledgeQuestionFlow = ai.defineFlow(
  {
    name: 'answerKnowledgeQuestionFlow',
    inputSchema: AIAnswerKnowledgeQuestionInputSchema,
    outputSchema: AIAnswerKnowledgeQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await knowledgeQuestionPrompt(input);
    return output!;
  }
);
