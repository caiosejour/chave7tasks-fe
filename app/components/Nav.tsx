import Image from "next/image";

import Logo from "@/app/assets/logo.png";
import FotoCaio from "@/app/assets/fotoCaio.jpg";

export default function Navbar(){

    return(

        <header className="bg-wite py-1 pt-4">

            <div className="flex h-16 items-center justify-between mx-auto max-w-screen-xl px-6">

                {/* Logo */}
                <div className="flex-1 md:flex md:items-center md:gap-12">
                
                    <a className="flex align-bottom text-teal-600" href="#">
                        
                        <Image src={Logo} alt="Logo" className="w-40"/>

                        <p className="mt-3 h-fit text-xl italic font-semibold text-gray-900">Tasks</p>

                    </a>

                </div>
                {/* Logo */}

                {/* Nav */}
                <div className="flex items-center gap-12">

                    {/* Imagem do usuário */}
                    <div className="relative block">
                        
                        <button
                        type="button"
                        className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                        >

                            <Image
                                src={FotoCaio}
                                alt=""
                                className="size-10 object-cover"
                            />

                        </button>
                        
                    </div>
                    {/* Imagem do usuário */}
                
                </div>
                {/* Nav */}

            </div>

        </header>
        
    );

}