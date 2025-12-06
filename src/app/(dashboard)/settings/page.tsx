import { MfaSettings } from "@/components/settings/mfa-settings";
import { SystemIntegrationCard } from "@/components/settings/system-integration-card";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <MfaSettings />
            <Separator />
            <SystemIntegrationCard />
        </div>
    );
}
