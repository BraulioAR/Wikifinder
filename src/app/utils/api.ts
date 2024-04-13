import axios from 'axios';

export async function getRandomArticle(): Promise<string> {
  const response = await axios.get('https://es.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1&origin=*');
  const articleTitle = response.data.query.random[0].title;
  return articleTitle;
}