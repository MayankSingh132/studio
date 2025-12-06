import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from 'lucide-react';

const integrations = [
    { name: "Linux PAM (Pluggable Authentication Modules)", status: "Active" },
    { name: "Windows Credential Provider", status: "Inactive" },
]

export function SystemIntegrationCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>System Integration Status</CardTitle>
                <CardDescription>
                    Monitor the connection status with underlying OS authentication frameworks.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {integrations.map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                             {integration.status === "Active" ? (
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                            ) : (
                                <XCircle className="h-6 w-6 text-muted-foreground" />
                            )}
                            <div>
                                <p className="font-medium">{integration.name}</p>
                            </div>
                        </div>
                        <Badge variant={integration.status === "Active" ? "default" : "secondary"}>{integration.status}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
