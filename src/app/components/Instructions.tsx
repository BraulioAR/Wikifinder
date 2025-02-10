'use client'
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { motion } from "framer-motion";
import { useState } from 'react';

const instructions = [
  {
    title: "¡Bienvenido a FootyFinder!",
    content: "En este juego, tu objetivo es encontrar un artículo de Wikipedia específico navegando a través de enlaces. ¡Demuestra tus conocimientos futbolísticos y tu rapidez!",
  },
  {
    title: "Cómo jugar",
    content: "1. Se te dará un artículo inicial y un artículo objetivo.\n2. Usa los enlaces dentro del artículo inicial para navegar a otros artículos.\n3. Intenta llegar al artículo objetivo antes de que se acabe el tiempo.",
  },
  {
    title: "Puntuación",
    content: "Ganas puntos cada vez que encuentras el artículo objetivo. ¡Cuanto más rápido lo encuentres, más puntos obtendrás!",
  },
  {
    title: "Consejos",
    content: "• Usa la función 'Cambiar artículo objetivo' si te sientes atascado.\n• ¡Explora los enlaces relacionados! Nunca sabes dónde puedes encontrar el artículo objetivo.",
  },
];

interface InstructionsModalProps {
  show: boolean;
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ show, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, instructions.length - 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <Card className="w-full max-w-2xl p-8 bg-black/80 backdrop-blur-lg relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white">
            <FaTimes className="h-6 w-6" />
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2 drop-shadow-lg">Instrucciones</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-secondary mb-4">{instructions[currentSlide].title}</h2>
            {/* Renderiza el contenido con saltos de línea */}
            {instructions[currentSlide].content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          <div className="flex justify-between">
            <Button onClick={handlePrevSlide} disabled={currentSlide === 0} variant="outline" size="icon">
              <FaArrowLeft className="h-6 w-6" />
            </Button>
            <Button onClick={handleNextSlide} disabled={currentSlide === instructions.length - 1} variant="outline" size="icon">
              <FaArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default InstructionsModal;