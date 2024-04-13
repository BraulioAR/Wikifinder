import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WikiFinder",
  description: "En este juego necesitas rapidez y cultura general. ¿Estás listo?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-bl from-gray-100 via-blue-100 to-rose-300`}>{children}</body>
      <footer>
         <div className='flex justify-center'>
            <p className="flex items-center text-sm text-center">
              &copy; 2024  Wikifinder | Developed by Braulio A. Rosario.
            </p>
          </div>
      </footer>
    </html>
  );
}
