export type User = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
};

export type Session = {
    id: string;
    userId: string;
    sessionStart: string;
    sessionEnd?: string;
    isActive: boolean;
    ipAddress: string;
};

export type AuthenticationLog = {
    id: string;
    userId: string;
    timestamp: string;
    success: boolean;
    method: string;
    details: string;
};

export type OTP = {
    id: string;
    userId: string;
    otpSecret: string;
    otpType: string;
    lastUsedAt: string;
    attempts: number;
    isVerified: boolean;
};
