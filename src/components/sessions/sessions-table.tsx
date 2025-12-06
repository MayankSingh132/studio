import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { activeSessionsData } from "@/lib/data";
import { XCircle } from "lucide-react";

export function SessionsTable() {
    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Device / OS / Browser</TableHead>
                        <TableHead>Last Seen</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activeSessionsData.map((session) => (
                        <TableRow key={session.id}>
                            <TableCell className="font-medium">{session.user}</TableCell>
                            <TableCell>{session.ip}</TableCell>
                            <TableCell>{session.location}</TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span>{session.device}</span>
                                    <span className="text-xs text-muted-foreground">{session.os} / {session.browser}</span>
                                </div>
                            </TableCell>
                            <TableCell>{session.lastSeen}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Terminate
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
