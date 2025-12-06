import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { recentLogsData, type Log } from "@/lib/data";

const statusVariantMap: { [key in Log['status']]: 'success' | 'destructive' | 'secondary' | 'outline' } = {
    Success: 'success',
    Failed: 'destructive',
    Suspicious: 'destructive',
    Info: 'secondary'
};

export function LogsTable() {
    const logs = [...recentLogsData, ...recentLogsData.slice(0,3).map(l => ({...l, id: l.id + 'a'})) , ...recentLogsData.slice(0,2).map(l => ({...l, id: l.id + 'b'}))];

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
                    {logs.map((log, i) => (
                        <TableRow key={`${log.id}-${i}`}>
                            <TableCell>{log.timestamp}</TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>{log.ip}</TableCell>
                            <TableCell className="font-medium">{log.event}</TableCell>
                            <TableCell className="text-muted-foreground">{log.details}</TableCell>
                            <TableCell className="text-right">
                                <Badge variant={statusVariantMap[log.status]}>{log.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
