'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, where, limit, orderBy } from "firebase/firestore";
import type { AuthenticationLog } from "@/lib/data";

const statusVariantMap: { [key in 'Success' | 'Failed' | 'Suspicious' | 'Info']: 'success' | 'destructive' | 'secondary' | 'outline' } = {
    Success: 'success',
    Failed: 'destructive',
    Suspicious: 'destructive',
    Info: 'secondary'
};

export function RecentLogs() {
    const firestore = useFirestore();
    const { user } = useUser();

    const logsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(
            collection(firestore, 'users', user.uid, 'authentication_logs'),
            orderBy('timestamp', 'desc'),
            limit(5)
        );
    }, [firestore, user]);

    const { data: recentLogsData, isLoading } = useCollection<AuthenticationLog>(logsQuery);

    const getStatus = (log: AuthenticationLog): 'Success' | 'Failed' | 'Suspicious' | 'Info' => {
        if (log.success) return 'Success';
        return log.details.includes('Unusual login location') ? 'Suspicious' : 'Failed';
    }

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
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">Loading...</TableCell>
                            </TableRow>
                        )}
                        {!isLoading && recentLogsData?.map((log) => {
                            const status = getStatus(log);
                            return (
                                <TableRow key={log.id}>
                                    <TableCell>
                                        <div className="font-medium">{log.method}</div>
                                        <div className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</div>
                                    </TableCell>
                                    <TableCell>{user?.email}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={statusVariantMap[status]}>{status}</Badge>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                         {!isLoading && (!recentLogsData || recentLogsData.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">No recent activity.</TableCell>
                            </TableRow>
                        )}
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
