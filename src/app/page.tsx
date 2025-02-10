'use client'
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModeSelector } from "../app/components/ModeSelector";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef } from 'react'; 
import { Edu_NSW_ACT_Foundation } from 'next/font/google';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InstructionsModal from '../app/components/Instructions'; // Importa el componente del modal

// Define la interfaz para los modos de juego
interface Mode {
  name: string;
  description: string;
  instructions: string;
  image?: string; //opcional imagen
}

const cursiveFont = Edu_NSW_ACT_Foundation({
  weight: '700',
  subsets: ['latin'],
})

export default function Home() {
  const modes: Mode[] = [ // Especifica el tipo del array
    {
      name: "Clásico",
      description: "Conecta dos jugadores aleatorios.",
      instructions: "Usa los enlaces de Wikipedia para navegar entre jugadores. ¡El tiempo es limitado!",
      image: '/lamine.jpg', // Ruta de la imagen para el modo clásico
    },
    {
      name: "Rivalidades",
      description: "Conecta jugadores con rivalidad histórica.",
      instructions: "Demuestra tu conocimiento sobre las rivalidades en el fútbol.",
      image: '/meesi.jpg', // Ruta de la imagen para el modo rivalidades
    },
    {
      name: "Mundial",
      description: "Jugadores que participaron en mundiales.",
      instructions: "Ideal para los fanáticos de la Copa del Mundo.",
      image: '/pele.jpg', // Ruta de la imagen para el modo mundial
    },
  ];

  const [selectedMode, setSelectedMode] = useState<string | null>(null); // Estado para el modo seleccionado
  const router = useRouter(); // Inicializa el router
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const handleOpenInstructionsModal = () => {
    setShowInstructionsModal(true);
  };

  const handleCloseInstructionsModal = () => {
    setShowInstructionsModal(false);
  };

  const handleModeClick = (modeName: string) => {
    if (selectedMode === modeName) { // Si el modo clicado es el mismo que el seleccionado
      setSelectedMode(null); // Deselecciona el modo
    } else {
      setSelectedMode(modeName); // Selecciona el modo
    }
  };
    

  const handlePlayClick = () => {
    if (!selectedMode) {
      alert("Debes seleccionar un modo de juego antes de jugar.");
      return;
    }
    router.push(`/game`); // Incluye el modo en la URL
  };


     return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20 bg-[url('/bg.webp')] bg-cover">
      <div className="fixed top-0 left-0 w-full h-full flex justify-between"> {/* Contenedor para publicidad */}
        <div className="w-1/6 h-4/5 bg-gray-300 mx-4 self-center"> {/* Ejemplo de espacio para publicidad izquierda */}
          {/* Aquí va tu publicidad izquierda */}
          <p className="text-center">Publicidad Izquierda</p> {/* Texto de ejemplo */}
        </div>
        <div className="w-1/6 h-4/5 bg-gray-300 mx-4 self-center"> {/* Ejemplo de espacio para publicidad derecha */}
          {/* Aquí va tu publicidad derecha */}
          <p className="text-center">Publicidad Derecha</p> {/* Texto de ejemplo */}
        </div>
      </div>
      <motion.div // Animación de entrada con Framer Motion
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Card className="w-full max-w-3xl p-8 bg-black/80 backdrop-blur-lg"> {/* Fondo de tarjeta semi-transparente */}
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold ${cursiveFont.className} text-primary mb-2 drop-shadow-lg`}>Footy<span className="text-secondary">Finder</span></h1> {/* Sombra en el título */}
            <p className="text-muted-foreground animate-pulse">¿Listo para el desafío?</p> {/* Texto con animación */}
          </div>

          {/* Modos de juego con hover effects */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  {modes.map((mode) => (
    <motion.div
      key={mode.name}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={() => handleModeClick(mode.name)} 
    >
      <Card className={cn(
            "p-4 relative overflow-hidden bg-card hover:bg-card/70 transition-colors duration-300 cursor-pointer h-64 group",
            selectedMode === mode.name && "shadow-md shadow-white"
          )}>
        {mode.image && (
          <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url(${mode.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        )}
        <div className="relative z-10 h-full flex flex-col justify-between ">
          <div className='bottom-0'>
            <h2 className="text-3xl font-semibold text-secondary">{mode.name}</h2>
          </div>
          <div className=" w-full bg-black/50 p-2 rounded-md transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0"> {/* Detalles con transición */}
            <p className="text-muted-foreground mb-2">{mode.description}</p>
            <p className="text-sm text-muted-foreground">{mode.instructions}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  ))}
</div>

          {/* Botones con hover effects */}
          <div className=" flex flex-col gap-4 pt-8 mb-8">
               <Button 
        className="bg-primary hover:bg-accent transition-colors duration-300 w-full py-8"
        onClick={handlePlayClick} // Manejador de clic para jugar
      >
        Jugar Ahora
      </Button> 
            <Link href="/settings" className="w-full">
              <Button variant="secondary" className="hover:bg-accent transition-colors duration-300 w-full py-8">Configuración</Button>
            </Link>
             <Button variant="outline" className="hover:bg-primary/20 transition-colors duration-300 w-full py-8" onClick={handleOpenInstructionsModal}>
          Ayuda
        </Button>
          </div>
        </Card>
      </motion.div>
       <InstructionsModal show={showInstructionsModal} onClose={handleCloseInstructionsModal} /> {/* Renderiza el modal */}
    </main>
  );
}