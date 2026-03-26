import React from "react";
interface RedScocial {
    red_social: string;
    nombre_usuario: string;
    url: string;
}
interface Props {
    redes_sociales: RedScocial[];
}
export default function RedesSociales({redes_sociales}: Props) {
    return (
        <div className="flex text-2xl text-white gap-4 flex-col md:flex-row items-center justify-center">
            <div className="font-bold text-2xl text-white">Redes Sociales</div>
            <div className="flex flex-col gap-4 ">
            {redes_sociales.map((red, index) => (
                <a
                key={index}
                    href={red.url}
                    target="_blank" //Para que se abra en una pestaña nueva
                    rel="noopener noreferrer" //Por seguridad al usar blank
                    className="text-white hover:text-underline text-xl gap-3"
                >
                    <span className="font-bold">{red.red_social}</span> : <span className="font-medium">{red.nombre_usuario}</span>
                </a>
            ))}
            </div>
        </div>
    )}