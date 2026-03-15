import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { Cabecera } from '@/components/cabecera';
import { usePage } from '@inertiajs/react'; // usePage es para acceder a los datos compartidos (como categorías) desde cualquier componente

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { categorias } = usePage().props as any;
    return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Cabecera categorias={categorias || []} />
        {children}
    </AppLayoutTemplate>
    )
};
