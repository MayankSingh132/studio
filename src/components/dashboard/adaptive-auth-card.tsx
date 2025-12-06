'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Shield, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { type AdaptiveAuthenticationOutput } from '@/ai/flows/adaptive-authentication';
import { runAdaptiveAuth } from '@/app/actions';

const formSchema = z.object({
  ipAddress: z.string().ip({ message: "Invalid IP address." }).default("203.0.113.45"),
  location: z.string().min(2).default("Moscow, Russia"),
  deviceType: z.string().min(2).default("Desktop"),
  operatingSystem: z.string().min(2).default("Windows"),
  browser: z.string().min(2).default("Chrome"),
});

export function AdaptiveAuthCard() {
    const [result, setResult] = useState<AdaptiveAuthenticationOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ipAddress: "203.0.113.45",
            location: "Moscow, Russia",
            deviceType: "Desktop",
            operatingSystem: "Windows",
            browser: "Chrome",
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setResult(null);
        setError(null);
        try {
            const response = await runAdaptiveAuth(values);
            if (response) {
                setResult(response);
            } else {
                setError("Failed to get a response from the AI model.");
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>Adaptive Authentication Simulation</CardTitle>
                <CardDescription>Test the AI-powered threat detection by simulating a login attempt.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="ipAddress" render={({ field }) => (
                            <FormItem>
                                <FormLabel>IP Address</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="deviceType" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Device Type</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="operatingSystem" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Operating System</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="browser" render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Browser</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="md:col-span-2">
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
                                Analyze Login Attempt
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                {result && (
                     <Alert variant={result.isSuspicious ? "destructive" : "default"} className="w-full">
                        {result.isSuspicious ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4 text-primary" />}
                        <AlertTitle>{result.isSuspicious ? 'Suspicious Login Detected!' : 'Login Appears Safe'}</AlertTitle>
                        <AlertDescription>
                            <strong>AI Analysis:</strong> {result.reason}
                        </AlertDescription>
                    </Alert>
                )}
                {error && (
                    <Alert variant="destructive" className="w-full">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardFooter>
        </Card>
    );
}
