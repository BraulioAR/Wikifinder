'use client'
import React, { useEffect, useState } from 'react';
import { getRandomArticle } from '../utils/api';
import Article from '../components/Article';
import Timer from '../components/Timer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Edu_NSW_ACT_Foundation } from 'next/font/google';
import axios from 'axios';

const GamePage = () => {
  const [initialArticle, setInitialArticle] = useState('');
  const [targetArticle, setTargetArticle] = useState('');
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [foundTarget, setFoundTarget] = useState(false);
  const [articleContent, setArticleContent] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      const initial = await getRandomArticle();
      let target = await getRandomArticle();
      while (target === initial) {
        target = await getRandomArticle();
      }
      setInitialArticle(initial);
      setTargetArticle(target);

      try {
        const response = await axios.get(`https://es.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(initial)}`);
        setArticleContent(response.data);
      } catch (error) {
        console.error("Error fetching initial article:", error);
      }
    }
    fetchArticles();
  }, []);

  const handleTimerFinish = () => {
    setIsGameOver(true);
  };

  const handleNavigation = async (title: string) => {
    try {
      const response = await axios.get(`https://es.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(title)}`);
      setArticleContent(response.data);
      setInitialArticle(title);
      setFoundTarget(false);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  const handleChangeTarget = async () => {
    let newTarget = await getRandomArticle();
    while (newTarget === initialArticle) {
      newTarget = await getRandomArticle();
    }
    setTargetArticle(newTarget);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20 bg-[url('/bg.webp')] bg-cover">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Card className="w-full max-w-3xl p-8 bg-black/80 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2 drop-shadow-lg">
              Footy<span className="text-secondary">Finder</span>
            </h1>
          </div>

          {isGameOver ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-center text-4xl text-white font-bold mb-4">¡Se acabó el tiempo!</h1>
              <p className="text-center text-white font-bold mb-4">Tu puntuación final es: {score}</p>
              <Button onClick={handleRestart} className="bg-primary hover:bg-accent transition-colors duration-300">
                Reiniciar Juego
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="text-white text-xl">Puntuación: {score}</div>
                <div className="flex items-center gap-4">
                  <p className="text-red-600 font-semibold">Encuentra: {targetArticle}</p>
                  <Timer duration={300} onTimeout={handleTimerFinish} />
                  <Button onClick={handleChangeTarget} variant="outline" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5m0-5h5m-5 0L9 9M5 19h9a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1a2 2 0 012-2z" />
                    </svg>
                  </Button>
                </div>
              </div>
              <Article
                title={initialArticle}
                targetArticle={targetArticle}
                content={articleContent}
                onNavigate={handleNavigation}
                setInitialArticle={setInitialArticle}
                setScore={setScore}
                setFoundTarget={setFoundTarget}
                score={score}
                initialArticle={initialArticle}
              />
              {foundTarget && <p className="text-3xl text-green-700 mt-4">¡Artículo encontrado! Sigue así.</p>}
            </div>
          )}
        </Card>
      </motion.div>
    </main>
  );
};

export default GamePage;
