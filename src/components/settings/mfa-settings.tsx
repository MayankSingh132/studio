'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Smartphone, Mail, Shield, Bot } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";

const mfaMethods = [
    { id: "totp", label: "Authenticator App (TOTP)", icon: Smartphone, enabled: true, description: "Generate codes with Google Authenticator, Authy, etc." },
    { id: "sms", label: "SMS / Text Message", icon: Mail, enabled: true, description: "Receive codes via text message to your phone." },
    { id: "device", label: "Trusted Device", icon: Shield, enabled: false, description: "Skip MFA on devices you trust." },
    { id: "biometric", label: "Biometric Verification", icon: Bot, enabled: false, description: "Use Face ID, Touch ID, or Windows Hello." },
];


export function MfaSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Multi-Factor Authentication</CardTitle>
                <CardDescription>
                    Strengthen your account security by requiring a second verification method.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {mfaMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-start gap-4">
                            <method.icon className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <Label htmlFor={method.id} className="text-base font-medium">{method.label}</Label>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {method.id === "totp" && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Setup</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                        <DialogTitle>Setup Authenticator App</DialogTitle>
                                        <DialogDescription>
                                            Scan this QR code with your authenticator app (e.g., Google Authenticator, Authy).
                                        </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-center p-4">
                                            <Image src="https://picsum.photos/seed/qrcode/200/200" alt="QR Code" width={200} height={200} data-ai-hint="qr code" />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                             <Switch id={method.id} defaultChecked={method.enabled} />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
