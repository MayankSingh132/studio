import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck, KeyRound, Smartphone, Lock, Puzzle } from "lucide-react";

const features = [
    {
        icon: KeyRound,
        title: "Password Hashing",
        description: "Utilizes Argon2, a state-of-the-art hashing algorithm, to protect user credentials against offline attacks."
    },
    {
        icon: Smartphone,
        title: "Multi-Factor Authentication",
        description: "Adds a critical security layer with TOTP, SMS/Email codes, and trusted device verification."
    },
    {
        icon: ShieldCheck,
        title: "Secure Input & Sessions",
        description: "Prevents buffer overflows and manages sessions securely to safeguard against hijacking."
    },
    {
        icon: Puzzle,
        title: "System Integration",
        description: "Natively integrates with Linux PAM and Windows Credential Provider for seamless OS-level security."
    }
]

export function SecurityFeatures() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Core Security Modules</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                    <Card key={feature.title} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <feature.icon className="w-8 h-8 text-primary" />
                                <CardTitle>{feature.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
