'use client'
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { useState, useEffect } from 'react'; // Importa useEffect
import { usePathname } from 'next/navigation';
import { Edu_NSW_ACT_Foundation } from 'next/font/google';

const cursiveFont = Edu_NSW_ACT_Foundation({
    weight: '700',
    subsets: ['latin'],
});

const Header = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado para el login
    const [userName, setUserName] = useState(''); // Estado para el nombre del usuario

    useEffect(() => {
        // Simulación de login (REEMPLAZAR CON TU LÓGICA REAL)
        const userIsLoggedIn = false; // Cambiar a true para simular el login
        if (userIsLoggedIn) {
            setIsLoggedIn(true);
            setUserName('Bravibess'); // Reemplazar con el nombre real
        }
        setUserName('Bravibess');
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-black/80 backdrop-blur-lg w-full p-4 fixed top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="../" className={`text-4xl font-bold ${cursiveFont.className} text-primary mb-2 drop-shadow-lg`}>
                    Footy<span className="text-secondary">Finder</span>
                </Link>

                {/* Menú de navegación */}
                <nav className="hidden md:flex space-x-4">
                    <Link href="/rankings" className={cn("text-white hover:scale-105 transition-colors duration-300", pathname === '/rankings' && "text-secondary")}>
                        🔥 Rankings
                    </Link>
                    <Link href="/how-to-play" className={cn("text-white hover:scale-105 transition-colors duration-300", pathname === '/how-to-play' && "text-secondary")}>
                        🎮 ¿Cómo jugar?
                    </Link>
                    <Link href="/news" className={cn("text-white hover:scale-105 transition-colors duration-300", pathname === '/news' && "text-secondary")}>
                        📰 Noticias
                    </Link>
                </nav>

                {/* Botones de cuenta y desafío diario */}
                <div className="hidden md:flex space-x-4 items-center"> {/* Añade items-center */}
                    <Link href="/daily-challenge" className={cn("text-white hover:scale-105 transition-colors duration-300 bg-primary px-4 py-2 rounded-md ", pathname === '/daily-challenge' && "text-secondary")}>
                        Desafío diario
                    </Link>
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-2">
                            <img src="/avatar.webp" alt="Avatar" className="w-8 h-8 rounded-full" /> {/* Avatar por defecto */}
                            <span className="text-white">{userName}</span>
                        </div>
                    ) : (
                        <Link href="/account" className={cn("text-white hover:scale-105 transition-colors duration-300", pathname === '/account' && "text-secondary")}>
                            Iniciar sesión
                        </Link>
                    )}
                </div>

                {/* Menú móvil */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    {isMobileMenuOpen && (
                        <div className="absolute top-16 right-4 w-48 bg-black/80 backdrop-blur-lg rounded-md p-4">
                            <Link href="/rankings" className="block text-white py-2">Rankings</Link>
                            <Link href="/how-to-play" className="block text-white py-2">¿Cómo jugar?</Link>
                            <Link href="/news" className="block text-white py-2">Noticias</Link>
                            <Link href="/account" className="block text-white py-2">Mi cuenta/Iniciar sesión</Link>
                            <Link href="/daily-challenge" className="block text-white py-2">Desafío diario</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

