import { SessionsTable } from '@/components/sessions/sessions-table';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function SessionsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Active User Sessions</CardTitle>
                <CardDescription>
                    Monitor and manage all active sessions in real-time.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SessionsTable />
            </CardContent>
        </Card>
    );
}
