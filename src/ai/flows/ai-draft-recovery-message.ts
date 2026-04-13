'use server';
/**
 * @fileOverview An AI assistant flow to help users draft a detailed and clear recovery request message for forensic analysts.
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
  draftedMessage: z.string().describe('A detailed and clear drafted message for the recovery request, including optimal phrasing and necessary details for AnalogHeal forensic agents.'),
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
  prompt: `You are a forensic intake specialist for AnalogHeal Forensics, a professional digital asset reclamation laboratory. Your task is to help victims draft a detailed and technical recovery request message based on their information. The message must be professional, empathetic, and formatted to help forensic analysts quickly initiate the tracing process.

Focus on:
- Clearly stating the forensic recovery type.
- Mentioning the estimated value and asset symbols (e.g. BTC, ETH, USDT).
- Expanding on the victim's initial description to include technical details like platform names, potential dates, and nature of the loss (e.g., phishing link, fake exchange, SIM-swap).
- Encouraging the user to have Transaction IDs (TXIDs) ready.
- Ensuring the message is structured as a formal case summary.

Here is the victim's information:
Recovery Type: {{{recoveryType}}}
Estimated Value: {{{estimatedValue}}}
Initial Description: {{{userMessage}}}

Draft a detailed forensic recovery request:
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
