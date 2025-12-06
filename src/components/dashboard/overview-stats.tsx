import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, ShieldAlert, Wifi, BarChart } from "lucide-react";

const stats = [
    { title: "Active Sessions", value: "1,204", icon: Users, change: "+12.5%" },
    { title: "Suspicious Logins", value: "32", icon: ShieldAlert, change: "-2.1%" },
    { title: "Trusted Devices", value: "3,890", icon: Wifi, change: "+5.0%" },
    { title: "Security Score", value: "98.7%", icon: BarChart, change: "+0.2%" },
];

export function OverviewStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card 
                    key={index} 
                    className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground group"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/80">{stat.change} from last month</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
