import Image from "next/image";

import Logo from "@/app/assets/logo.png";
import FotoCaio from "@/app/assets/fotoCaio.jpg";

export default function Navbar(){

    return(

        <header className="bg-wite py-1">

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
                <div className="md:flex md:items-center md:gap-12">
                
                    <nav aria-label="Global" className="hidden md:block">
                        
                        <ul className="flex items-center gap-6 text-md">

                            <li>
                                <a className=" transition hover:text-gray-500/75" href="#"> Tarefas </a>
                            </li>

                            <li>
                                <a className=" transition hover:text-gray-500/75" href="#"> Usuários </a>
                            </li>

                            <li>
                                <a className=" transition hover:text-gray-500/75" href="#"> Configurações </a>
                            </li>

                        </ul>

                    </nav>

                    {/* Imagem do usuário */}
                    <div className="hidden md:relative md:block">
                        
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

                    {/* Botão do menu responsivo */}
                    <div className="block md:hidden">

                        <button
                        className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >

                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />

                            </svg>
                            
                        </button>

                    </div>
                    {/* Botão do menu responsivo */}
                
                </div>
                {/* Nav */}

            </div>

        </header>
        
    );

}