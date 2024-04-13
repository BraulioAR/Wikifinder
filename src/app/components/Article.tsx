import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ArticleProps {
  title: string;
  content: string;
  onNavigate: (title: string) => void;
}

const Article: React.FC<ArticleProps> = ({ title, content, onNavigate }) => {
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
    onNavigate(articleTitle);
  }
};

  return (
    <div onClick={handleLinkClick} dangerouslySetInnerHTML={{ __html: articleContent }}></div>
  );
};

export default Article;