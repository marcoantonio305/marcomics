import React from "react";
import RedesSociales from "./Pie/RedesSociales";

export default function Pie() {
    return (
        <footer className="text-white bg-[#9C0C0C] py-8 px-4">
            <div className="container mx-auto flex text-2xl text-white gap-35 flex-col md:flex-row items-center ">
            <div className="font-bold flex-col text-2xl text-white gap-4">
                <span className="text-2xl text-white font-bold">Correo electrónico</span> : <span className="text-xl text-white font-medium">marcomics@gmail.com</span>
            </div>
            <RedesSociales redes_sociales={[
                { red_social: "Instagram", nombre_usuario: "@Marcómics", url: "https://www.instagram.com/marcomics" },
                { red_social: "Twitter", nombre_usuario: "@Marcómics", url: "https://www.twitter.com/marcomics" },
                { red_social: "Facebook", nombre_usuario: "Marcómics", url: "https://www.facebook.com/marcomics" }
            ]} />
            </div>
        </footer>
    )
}