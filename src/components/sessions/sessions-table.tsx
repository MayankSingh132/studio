'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useCollection, useFirestore, useUser, useMemoFirebase, deleteDocumentNonBlocking } from "@/firebase";
import { collection, query, where, doc } from "firebase/firestore";
import { XCircle } from "lucide-react";
import type { Session } from '@/lib/data';

export function SessionsTable() {
    const firestore = useFirestore();
    const { user } = useUser();

    const sessionsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(
            collection(firestore, 'users', user.uid, 'sessions'),
            where('isActive', '==', true)
        );
    }, [firestore, user]);

    const { data: activeSessionsData, isLoading } = useCollection<Session>(sessionsQuery);

    const terminateSession = (sessionId: string) => {
        if (!user) return;
        const sessionRef = doc(firestore, 'users', user.uid, 'sessions', sessionId);
        deleteDocumentNonBlocking(sessionRef);
    };

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
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">Loading sessions...</TableCell>
                        </TableRow>
                    )}
                    {!isLoading && activeSessionsData?.map((session) => (
                        <TableRow key={session.id}>
                            <TableCell className="font-medium">{user?.email}</TableCell>
                            <TableCell>{session.ipAddress}</TableCell>
                            <TableCell>Unknown</TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span>Unknown</span>
                                    <span className="text-xs text-muted-foreground">Unknown / Unknown</span>
                                </div>
                            </TableCell>
                            <TableCell>{new Date(session.sessionStart).toLocaleTimeString()}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => terminateSession(session.id)}>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Terminate
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {!isLoading && (!activeSessionsData || activeSessionsData.length === 0) && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">No active sessions.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
