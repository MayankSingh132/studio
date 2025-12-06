import { OverviewStats } from "@/components/dashboard/overview-stats";
import { AdaptiveAuthCard } from "@/components/dashboard/adaptive-auth-card";
import { RecentLogs } from "@/components/dashboard/recent-logs";
import { SecurityFeatures } from "@/components/dashboard/security-features";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <OverviewStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <AdaptiveAuthCard />
        </div>
        <div className="flex flex-col gap-6">
          <RecentLogs />
        </div>
      </div>
      <SecurityFeatures />
    </div>
  );
}
