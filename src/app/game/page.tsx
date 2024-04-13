import React, { useEffect, useState } from 'react';
import { getRandomArticle } from '../utils/api';
import Article from '../components/Article';
import Timer from '../components/Timer';
import Score from '../components/Score';
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
    }
    fetchArticles();
  }, []);

  const handleTimerFinish = () => {
    setIsGameOver(true);
  };

  const handleNavigation = async (title: string) => {
    // Sumar un punto si el usuario llega al artículo objetivo
    if (title === targetArticle) {
      setScore(score + 1);
      setFoundTarget(true);
    }

    // Hacer la solicitud al API de Wikipedia para cargar el nuevo artículo

    const response = await axios.get(`https://es.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(title)}`);
    const content = response.data;

    // Actualizar el contenido del artículo
    setArticleContent(content);

    // Actualizar el artículo inicial con el nuevo título
    setInitialArticle(title);

    // Reiniciar el indicador de artículo encontrado
    setFoundTarget(false);
  };

  const handleChangeTarget = async () => {
    let newTarget = await getRandomArticle();
    while (newTarget === initialArticle) {
      newTarget = await getRandomArticle();
    }
    setTargetArticle(newTarget);
  };

  return (
    <div>
      {isGameOver ? (
        <div className='h-screen m-auto max-w-7xl w-11/12 flex'>
          <div className='flex justify-center items-centef flex-col gap-y-5 mt-48'>
          <h1 className='text-center text-4xl text-black font-bold'>Se acabo el tiempo! <br /> <span className='text-center text-3xl text-black'>Recuerda que puedes cambiar el articulo objetivo si te sientes atascado en la próxima o usar Ctrl+F para buscar palabras clave en el articulo.</span></h1>
            <p className='text-center text-black font-bold'>Tu puntuación final es: {score}</p>
            <button onClick={() => window.location.reload()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Reiniciar Juego</button>
          </div>
        </div>
      ) : (
          <div className='h-full w-11/12 m-auto max-w-7xl'>
            <div className='flex justify-center items-center'>
              <h1 className='text-3xl'>WikiFinder</h1>
              </div>
            <div className='flex flex-row justify-between h-20 w-11/12'>
              <div className='flex'>
              <p className='text-black text-xl'>Puntuación: {score}</p>
              </div>
              <div className='flex justify-evenly gap-x-5 '>
                <p className=' text-red-600'>Encuentra: {targetArticle}</p>
                <Timer duration={300} onTimeout={handleTimerFinish} />
                 <button className='mt-[5px]' onClick={handleChangeTarget}>Cambiar articulo objetivo</button>
                </div>
            </div>
          <Article title={initialArticle} content={articleContent} onNavigate={handleNavigation} />
          {foundTarget && <p className='text-3xl text-green-700'>Articulo encontrado. Sigue así!</p>}
    
        </div>
      )}
      
    </div>
  );
};

export default GamePage;