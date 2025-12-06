'use server';

/**
 * @fileOverview An adaptive authentication AI agent.
 *
 * - adaptiveAuthentication - A function that handles the adaptive authentication process.
 * - AdaptiveAuthenticationInput - The input type for the adaptiveAuthentication function.
 * - AdaptiveAuthenticationOutput - The return type for the adaptiveAuthentication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveAuthenticationInputSchema = z.object({
  userId: z.string().describe('The ID of the user attempting to log in.'),
  loginTimestamp: z.string().describe('The timestamp of the login attempt.'),
  ipAddress: z.string().describe('The IP address from which the login attempt originated.'),
  location: z.string().describe('The geographical location from which the login attempt originated.'),
  deviceType: z.string().describe('The type of device used for the login attempt (e.g., desktop, mobile).'),
  operatingSystem: z.string().describe('The operating system used for the login attempt (e.g., Windows, macOS, Android).'),
  browser: z.string().describe('The browser used for the login attempt (e.g., Chrome, Firefox, Safari).'),
  typicalLoginLocations: z.string().describe('The user\'s typical login locations.'),
  typicalDeviceTypes: z.string().describe('The user\'s typical device types.'),
  typicalOperatingSystems: z.string().describe('The user\'s typical operating systems.'),
  typicalBrowsers: z.string().describe('The user\'s typical browsers.'),
});
export type AdaptiveAuthenticationInput = z.infer<typeof AdaptiveAuthenticationInputSchema>;

const AdaptiveAuthenticationOutputSchema = z.object({
  isSuspicious: z.boolean().describe('Whether the login attempt is considered suspicious based on AI analysis.'),
  reason: z.string().describe('The reason why the login attempt is considered suspicious, if applicable.'),
});
export type AdaptiveAuthenticationOutput = z.infer<typeof AdaptiveAuthenticationOutputSchema>;

export async function adaptiveAuthentication(input: AdaptiveAuthenticationInput): Promise<AdaptiveAuthenticationOutput> {
  return adaptiveAuthenticationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptiveAuthenticationPrompt',
  input: {schema: AdaptiveAuthenticationInputSchema},
  output: {schema: AdaptiveAuthenticationOutputSchema},
  prompt: `You are an AI-powered security system that analyzes user login attempts and flags suspicious activity.

You will receive information about a user's login attempt, including their user ID, timestamp, IP address, location, device type, operating system, and browser.

You also have access to the user's typical login patterns, including their typical login locations, device types, operating systems, and browsers.

Based on this information, you will determine whether the login attempt is suspicious.  Consider how unusual the login attempt is compared to the user's typical behavior.

Respond with JSON including a boolean isSuspicious field and a string reason field explaining your determination.

Here is the information about the login attempt:

User ID: {{{userId}}}
Login Timestamp: {{{loginTimestamp}}}
IP Address: {{{ipAddress}}}
Location: {{{location}}}
Device Type: {{{deviceType}}}
Operating System: {{{operatingSystem}}}
Browser: {{{browser}}}

Here is the user's typical login behavior:

Typical Login Locations: {{{typicalLoginLocations}}}
Typical Device Types: {{{typicalDeviceTypes}}}
Typical Operating Systems: {{{typicalOperatingSystems}}}
Typical Browsers: {{{typicalBrowsers}}}
`,
});

const adaptiveAuthenticationFlow = ai.defineFlow(
  {
    name: 'adaptiveAuthenticationFlow',
    inputSchema: AdaptiveAuthenticationInputSchema,
    outputSchema: AdaptiveAuthenticationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
