'use client';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string) => {
    switch (pathname) {
        case '/dashboard':
            return 'Dashboard';
        case '/logs':
            return 'Audit Logs';
        case '/sessions':
            return 'Active Sessions';
        case '/settings':
            return 'Settings';
        default:
            return 'Guardian OS';
    }
}

export function AppHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card/80 backdrop-blur-sm px-4 sm:h-16 sm:px-6">
      <SidebarTrigger className="md:hidden" />
      
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src="https://picsum.photos/seed/admin/40/40" data-ai-hint="person avatar" alt="@admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
