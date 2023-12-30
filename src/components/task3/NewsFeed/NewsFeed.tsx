import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './NewsFeed.css';
import NewsItem from '../NewsItem/NewsItem';

/**
 * Компонент для отображения ленты новостей.
 * Загружает и отображает список новостей, используя данные из контекста аутентификации.
 * 
 * @returns {React.ReactElement} JSX элемент ленты новостей.
 */
export const NewsFeed: React.FC = () => {
  const { news } = useAuth(); // Получение списка новостей из контекста аутентификации

  if (!news) return <div>Loading...</div>; // Отображение состояния загрузки, если новости ещё не загружены

  // Рендеринг списка новостей
  return (
    <div className="news-feed">
      {news.map((item) => (
        <NewsItem key={item.id} item={item} /> // Отображение каждой новости как отдельного элемента
      ))}
    </div>
  );
};

export default NewsFeed;
