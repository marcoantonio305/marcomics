import React from "react";

interface BotonBaseProps {
    texto: string;
    colorFondo?: string;
    colorTexto?: string;
    hoverFondo?: string;
    hoverTexto?: string;
    borderClass?: string;
    tamano?: "sm" | "md" | "lg" | string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    processing?: boolean;
    className?: string;
    icono?: React.ReactNode;
}

export function BotonBase({
    texto,
    colorFondo = "bg-green-600",
    colorTexto = "text-white",
    hoverFondo = "hover:bg-[#FDF5E6]",
    hoverTexto = "hover:text-green-600",
    borderClass = "border-black",
    tamano = "md",
    onClick,
    disabled = false,
    processing = false,
    className = "",
    icono
}: BotonBaseProps) {

    const mapeoTamano: Record<string, string> = {
        sm: "w-50 h-11 text-base hover:text-xl",
        md: "w-55 h-15 text-xl hover:text-2xl",
        lg: "w-64 h-16 text-2xl hover:text-3xl",
    };

    const clasesTamano = mapeoTamano[tamano] || tamano;

    return (
        <button
            onClick={onClick}
            disabled={disabled || processing}
            className={`
                font-bold
                rounded
                transition-all
                duration-200
                transform
                border-3
                hover:scale-110
                flex
                items-center
                justify-center
                /* Eliminamos el 'gap-2' de aquí porque ya lo maneja el div interno */
                ${clasesTamano}
                ${colorFondo}
                ${colorTexto}
                ${hoverFondo}
                ${hoverTexto}
                ${borderClass}
                ${disabled || processing ? "opacity-50 cursor-not-allowed scale-100 hover:scale-100" : ""}
                ${className}
            `}
        >
            {processing ? (
                "Cargando..."
            ) : (
                <div className="flex items-center justify-center gap-2 w-full h-full">
                    {icono}
                    <span>{texto}</span>
                </div>
            )}
        </button>
    );
}
