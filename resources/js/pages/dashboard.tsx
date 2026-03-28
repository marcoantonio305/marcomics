import { Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { BookOpen, Pencil, PlusSquare, Library, PlayIcon, User} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-8 p-8">
                <div className="border-b border-gray-200 pb-2 dark:border-neutral-700">
                    <h2 className="text-lg font-medium text-gray-600 dark:text-neutral-400">Gestión General</h2>
                </div>

                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                    <Link
                        href="/inicio"
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-blue-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <PlayIcon className="size-12 text-yellow-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Inicio</h3>
                        <p className="text-sm text-gray-500">El index de la página</p>
                    </Link>
                    <Link
                        href="/comics"
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-blue-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <BookOpen className="size-12 text-blue-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Cómics</h3>
                        <p className="text-sm text-gray-500">Gestión de los cómics.</p>
                    </Link>
                    <Link
                        href="/autors"
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-green-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <Pencil className="size-12 text-green-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Autores</h3>
                        <p className="text-sm text-gray-500">Gestión de los autores.</p>
                    </Link>
                    <Link
                        href="/categorias"
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-blue-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <PlusSquare className="size-12 text-pink-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Categorías</h3>
                        <p className="text-sm text-gray-500">Gestión de los categorías.</p>
                    </Link>
                    <Link
                        href="/editoras"
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-blue-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <Library className="size-12 text-gray-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Editoras</h3>
                        <p className="text-sm text-gray-500">Gestión de los editoras.</p>
                    </Link>
                    <Link
                        href="/users"
                        className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 group-hover:bg-blue-50 dark:bg-neutral-800 dark:ring-neutral-700">
                            <User className="size-12 text-red-600" />
                        </div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white">Usuarios</h3>
                        <p className="text-sm text-gray-500">Gestión de los usuarios.</p>
                    </Link>
                </div>

            </div>
        </AppLayout>
    );
}
