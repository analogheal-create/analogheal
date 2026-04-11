
'use server';
/**
 * @fileOverview An AI assistant flow to help users draft a detailed and clear recovery request message.
 *
 * - aiDraftRecoveryMessage - A function that handles the message drafting process.
 * - AiDraftRecoveryMessageInput - The input type for the aiDraftRecoveryMessage function.
 * - AiDraftRecoveryMessageOutput - The return type for the aiDraftRecoveryMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDraftRecoveryMessageInputSchema = z.object({
  recoveryType: z.string().describe('The type of recovery requested (e.g., Wallet Recovery, Hacked Account Recovery).'),
  estimatedValue: z.string().describe('The estimated value of the lost assets.'),
  userMessage: z.string().describe('The initial message provided by the user describing the situation and lost assets.'),
});
export type AiDraftRecoveryMessageInput = z.infer<typeof AiDraftRecoveryMessageInputSchema>;

const AiDraftRecoveryMessageOutputSchema = z.object({
  draftedMessage: z.string().describe('A detailed and clear drafted message for the recovery request, including optimal phrasing and necessary details for AnalogHeal agents.'),
});
export type AiDraftRecoveryMessageOutput = z.infer<typeof AiDraftRecoveryMessageOutputSchema>;

export async function aiDraftRecoveryMessage(
  input: AiDraftRecoveryMessageInput
): Promise<AiDraftRecoveryMessageOutput> {
  return aiDraftRecoveryMessageFlow(input);
}

const draftRecoveryMessagePrompt = ai.definePrompt({
  name: 'draftRecoveryMessagePrompt',
  input: {schema: AiDraftRecoveryMessageInputSchema},
  output: {schema: AiDraftRecoveryMessageOutputSchema},
  prompt: `You are an AI assistant for AnalogHeal, a professional crypto and digital asset recovery service. Your task is to help users draft a detailed and clear recovery request message based on their provided information. The message should be professional, empathetic, and include all necessary details for AnalogHeal agents to quickly understand the situation and initiate the recovery process efficiently.

Focus on:
- Clearly stating the recovery type.
- Mentioning the estimated value of lost assets.
- Expanding on the user's initial description to include optimal phrasing and potentially ask for more specific details that might be relevant (e.g., dates, specific platforms, nature of the loss, steps already taken).
- Ensuring the message is structured and easy to read.

Here is the user's information:
Recovery Type: {{{recoveryType}}}
Estimated Value: {{{estimatedValue}}}
User's Initial Message: {{{userMessage}}}

Draft a detailed recovery request message:
`,
});

const aiDraftRecoveryMessageFlow = ai.defineFlow(
  {
    name: 'aiDraftRecoveryMessageFlow',
    inputSchema: AiDraftRecoveryMessageInputSchema,
    outputSchema: AiDraftRecoveryMessageOutputSchema,
  },
  async (input) => {
    const {output} = await draftRecoveryMessagePrompt(input);
    return output!;
  }
);
