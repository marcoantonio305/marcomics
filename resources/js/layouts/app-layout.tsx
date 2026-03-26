import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { Cabecera } from '@/components/cabecera';
import { usePage } from '@inertiajs/react'; // usePage es para acceder a los datos compartidos (como categorías) desde cualquier componente
import Pie from '@/components/ui/Pie';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { categorias } = usePage().props as any;
    return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Cabecera categorias={categorias || []} />
        {children}
        <Pie/>
    </AppLayoutTemplate>
    )
};
