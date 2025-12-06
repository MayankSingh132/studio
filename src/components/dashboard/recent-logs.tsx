import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import { recentLogsData, type Log } from "@/lib/data";

const statusVariantMap: { [key in Log['status']]: 'success' | 'destructive' | 'secondary' | 'outline' } = {
    Success: 'success',
    Failed: 'destructive',
    Suspicious: 'destructive',
    Info: 'secondary'
};

export function RecentLogs() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentLogsData.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>
                                    <div className="font-medium">{log.event}</div>
                                    <div className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</div>
                                </TableCell>
                                <TableCell>{log.user}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={statusVariantMap[log.status]}>{log.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="justify-end pt-4">
                 <Button asChild variant="outline" size="sm">
                    <Link href="/logs">
                        View All Logs <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
