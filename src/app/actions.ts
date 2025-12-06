'use server';

import { adaptiveAuthentication, type AdaptiveAuthenticationInput } from '@/ai/flows/adaptive-authentication';

export async function runAdaptiveAuth(input: Omit<AdaptiveAuthenticationInput, 'userId' | 'loginTimestamp' | 'typicalLoginLocations' | 'typicalDeviceTypes' | 'typicalOperatingSystems' | 'typicalBrowsers'>) {
    try {
        const fullInput: AdaptiveAuthenticationInput = {
            ...input,
            userId: 'j.doe',
            loginTimestamp: new Date().toISOString(),
            typicalLoginLocations: 'New York, USA; London, UK; San Francisco, USA',
            typicalDeviceTypes: 'Desktop, Mobile',
            typicalOperatingSystems: 'macOS, Android, Windows',
            typicalBrowsers: 'Chrome, Firefox, Safari',
        };

        const result = await adaptiveAuthentication(fullInput);
        return result;
    } catch (error) {
        console.error("Error in adaptive authentication flow:", error);
        return null;
    }
}
