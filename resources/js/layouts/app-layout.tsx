import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { Cabecera } from '@/components/cabecera';
import { usePage } from '@inertiajs/react';
import Pie from '@/components/ui/Pie';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { categorias } = usePage().props as any;
    
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>

            <div className="flex flex-col min-h-screen">
                <Cabecera categorias={categorias || []} />
                
                <main className="flex-1">
                    {children}
                </main>
                
                <Pie />
            </div>
        </AppLayoutTemplate>
    );
};