import { usePage, Link } from "@inertiajs/react"
import { useState } from "react";
import { ChevronDown, Settings, LogOut, User } from "lucide-react";

export default function ParteLogin() {
    const {auth} = usePage().props as any;
    const user = auth?.user;
    const [menuAbierto, setMenuAbierto] = useState(false);
    if (!user) {
    return (
        <div className="flex bg-red-600 items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors group">
            <User size={35} className="text-white mt-4 mr-4 ml-4" />
            <Link href="/login"><h1 className="text-2xl hover:underline text-white font-bold mr-4 mt-4">Iniciar sesión</h1></Link>
        </div>
    )
}
else {
    return (
        <div className="w-full h-16 bg-red-600 text-white flex items-center justify-center">
            
            {(auth.user.foto_perfil) ? (
                <img 
            src={`/storage/${auth.user.foto_perfil}`} 
            alt={`Foto de perfil de ${auth.user.name}`} 
            className="w-full h-full object-cover rounded-full mt-6 mr-4 ml-4" 
        />
    ) : (
                <div className="w-full h-full bg-transparent flex items-center justify-center">
            <img className="w-full mt-6 ml-2 h-full object-cover rounded-full" src={ `https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name || 'U')}&background=random`} alt="Foto de perfil" />
        </div>
            )}
            <button onClick={() =>setMenuAbierto(!menuAbierto)} className="flex items-center gap-2 p-2 hover:bg-white hover:text-red-500  mt-3 rounded-lg transition-colors">
                <ChevronDown size={20} className={`transition-transform ${menuAbierto ? 'rotate-180' : ''} mt-5`} />
                <h1 className="text-2xl font-bold  mr-8 ml-4 mt-4">{auth.user.name}</h1>
                
            </button>
            {menuAbierto && (
    <div className="fixed inset-0 z-10" onClick={() => setMenuAbierto(false)}></div>
)}

<div className={`
                absolute right-0 mt-57 w-73 bg-red-600 rounded-md shadow-xl z-20 py-2 border border-black
                transition-all duration-200 transform origin-top-right
                ${menuAbierto ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}
            `}>
                <div className="px-4 py-2 text-xs text-white uppercase font-bold border-b border-white/50">
                    {auth.user.name}
                </div>
                        
                        <Link 
                            href={`/users/${auth.user.id}`} 
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white hover:text-black"
                        >
                            <User size={14} /> Tú perfil
                        </Link>

                        <Link 
                            href='/logout' 
                            method="post" 
                            as="button"
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-white hover:bg-white hover:text-black"
                        >
                            <LogOut size={14} /> Cerrar Sesión
                        </Link>
                    </div>
                
        </div>
    )
}
}