'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import type { AuthenticationLog } from "@/lib/data";

const statusVariantMap: { [key in 'Success' | 'Failed' | 'Suspicious' | 'Info']: 'success' | 'destructive' | 'secondary' | 'outline' } = {
    Success: 'success',
    Failed: 'destructive',
    Suspicious: 'destructive',
    Info: 'secondary'
};

export function LogsTable() {
    const firestore = useFirestore();
    const { user } = useUser();

    const logsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(
            collection(firestore, 'users', user.uid, 'authentication_logs')
        );
    }, [firestore, user]);

    const { data: logs, isLoading } = useCollection<AuthenticationLog>(logsQuery);
    
    const getStatus = (log: AuthenticationLog): 'Success' | 'Failed' | 'Suspicious' | 'Info' => {
        if (log.success) return 'Success';
        return log.details.includes('Unusual login location') ? 'Suspicious' : 'Failed';
    }

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                     {isLoading && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">Loading...</TableCell>
                        </TableRow>
                    )}
                    {!isLoading && logs?.map((log, i) => {
                        const status = getStatus(log);
                        return (
                            <TableRow key={`${log.id}-${i}`}>
                                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>N/A</TableCell>
                                <TableCell className="font-medium">{log.method}</TableCell>
                                <TableCell className="text-muted-foreground">{log.details}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={statusVariantMap[status]}>{status}</Badge>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    {!isLoading && (!logs || logs.length === 0) && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">No logs found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
