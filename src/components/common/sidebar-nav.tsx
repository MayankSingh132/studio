'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ShieldCheck,
  Smartphone,
  Users,
  Terminal,
  Settings,
  KeyRound,
  Lock,
  Puzzle,
} from 'lucide-react';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/logs',
    label: 'Audit Logs',
    icon: Terminal,
  },
  {
    href: '/sessions',
    label: 'Active Sessions',
    icon: Users,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
  },
];

const securityFeatures = [
    { label: "Password Hashing", icon: KeyRound },
    { label: "MFA", icon: Smartphone },
    { label: "Input Handling", icon: ShieldCheck },
    { label: "Session Management", icon: Lock },
    { label: "System Integration", icon: Puzzle },
]

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
            <h1 className="text-xl font-bold text-primary-foreground group-data-[collapsible=icon]:hidden">
                Guardian OS
            </h1>
        </div>
        <SidebarGroup className="flex-1 overflow-y-auto">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Security Modules</SidebarGroupLabel>
            <SidebarMenu>
            {securityFeatures.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton variant="ghost" className="pointer-events-none" tooltip={item.label}>
                        <item.icon className="text-sidebar-foreground/70" />
                        <span className="text-sidebar-foreground/70">{item.label}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroup>
    </div>
  );
}
