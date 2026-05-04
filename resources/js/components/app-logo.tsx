import AppLogoIcon from '@/components/app-logo-icon';
import { Icono } from './ui/Cabecera/icono';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground bg-white">
                <img src='/images/logo.png' alt="Logo" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Marcómics
                </span>
            </div>
        </>
    );
}
