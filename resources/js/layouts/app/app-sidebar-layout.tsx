import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const props = usePage().props as any;
    
    const user = props.auth?.user;
    const esAdmin = user && Number(user.rol_id) === 1;

    console.log("Datos recibidos en el Layout:", { user, esAdmin });

    if (esAdmin) {
        return (
            <AppShell variant="sidebar">
                {/* <AppSidebar /> */}
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    {/* <AppSidebarHeader breadcrumbs={breadcrumbs} /> */}
                    {children}
                </AppContent>
            </AppShell>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-white">
            <main className="flex-1 w-full">
                {children}
            </main>
        </div>
    );
}