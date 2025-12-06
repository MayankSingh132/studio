import { LogsTable } from '@/components/logs/logs-table';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function LogsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>
                    A comprehensive record of all system events and user actions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LogsTable />
            </CardContent>
        </Card>
    );
}
