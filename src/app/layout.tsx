
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils" // Importa la función cn

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FutbolFinder", // Título actualizado
  description: "¡Conecta jugadores de fútbol usando Wikipedia! ¿Listo para el reto?", // Descripción actualizada
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background text-foreground min-h-screen")}> {/* Aplica clases de Tailwind y min-h-screen */}
        {children}
        <footer className="w-full py-4 bg-card mt-auto"> {/* Footer dentro del layout, bg-card para el fondo */}
          <div className='flex justify-center'>
            <p className="flex items-center text-sm text-center text-muted-foreground"> {/* Texto con color muted */}
              &copy; 2025 FootyFinder | Developed by Braulio A. Rosario. {/* Nombre del juego actualizado */}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
