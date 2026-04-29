import { usePage, Link } from "@inertiajs/react"
import { useState } from "react";
import { ChevronDown, Settings, LogOut, User } from "lucide-react";

export default function ParteLogin() {
    const {auth} = usePage().props as any;
    const user = auth?.user;
    const [menuAbierto, setMenuAbierto] = useState(false);
    if (!user) {
    return (
        <div className="flex bg-[#d00000] items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors group">
            <User size={35} className="text-white mt-4 mr-4 ml-4" />
            <Link href="/login"><h1 className="text-2xl hover:underline text-white font-bold mr-4 mt-4">Iniciar sesión</h1></Link>
        </div>
    )
}
else {
    return (
        <div className="w-full h-16 bg-[#d00000] text-white flex items-center justify-center">
            
            {(auth.user.foto_perfil) ? (
                <img 
            src={`/storage/${auth.user.foto_perfil}`} 
            alt={`Foto de perfil de ${auth.user.name}`} 
            className="w-full h-full object-cover rounded-full mt-6 mr-4 ml-4" 
        />
    ) : (
                <div className="w-full h-full bg-black/20 flex items-center justify-center">
            <User size={35} className="text-white mt-4 mr-4 ml-4" strokeWidth={1.5} />
        </div>
            )}
            <button onClick={() =>setMenuAbierto(!menuAbierto)} className="flex items-center gap-2 p-2 hover:bg-red-600  mt-3 rounded-lg transition-colors">
                <ChevronDown size={20} className={`transition-transform ${menuAbierto ? 'rotate-180' : ''} mt-5`} />
                <h1 className="text-2xl font-bold hover:underline mr-8 ml-4 mt-4">{auth.user.name}</h1>
                
            </button>
            {menuAbierto && (
                <>
                    
                    <div className="fixed inset-0 z-10" onClick={() => setMenuAbierto(false)}></div>

                    
                    <div className="absolute right-0 mt-57 w-60 bg-red-600 rounded-md shadow-xl z-20 py-2 border border-black">
                        <div className="px-4 py-2 text-xs text-white uppercase font-semibold border-b border-gray-100">
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
                </>
            )}
        </div>
    )
}
}