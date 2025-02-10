import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ArticleProps {
  title: string;
  targetArticle: string;
  onNavigate: (title: string) => Promise<void>;
  setInitialArticle: React.Dispatch<React.SetStateAction<string>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setFoundTarget: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  initialArticle: string;
  content: string; // Recibe el contenido del artículo
}

const Article: React.FC<ArticleProps> = ({ title, targetArticle, onNavigate, setInitialArticle, setScore, setFoundTarget, score, initialArticle, content }) => {
  const [articleContent, setArticleContent] = useState<string>(content);

  useEffect(() => {
    const fetchArticleContent = async () => {
      try {
        const response = await axios.get(`https://es.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(title)}`);
        setArticleContent(response.data);
      } catch (error) {
        console.error('Error fetching article content:', error);
      }
    };

    fetchArticleContent();
  }, [title]);

  const handleLinkClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    if (target.nodeName === 'A') {
      event.preventDefault();
      const url = target.getAttribute('href') || '';
      const articleTitle = decodeURIComponent(url.split('/').pop() || '');

      try {
        const response = await axios.get(`https://es.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(articleTitle)}`);
        setArticleContent(response.data);
        setInitialArticle(articleTitle); // Actualiza el artículo inicial

        const targetResponse = await axios.get(`https://es.wikipedia.org/api/rest_v1/page/title/${encodeURIComponent(targetArticle)}`);
        const targetArticleTitle = targetResponse.data.title; // Obtén el título del artículo objetivo

        if (encodeURIComponent(articleTitle) === encodeURIComponent(targetArticleTitle)) {
          setScore(score + 1);
          setFoundTarget(true);
          onNavigate(initialArticle);
        }
      } catch (error) {
        console.error("Error navigating or checking target:", error);
      }
    }
  };

  return (
    <div onClick={handleLinkClick} dangerouslySetInnerHTML={{ __html: articleContent }}></div>
  );
};

export default Article;
