import './NewsDetail.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NewsItem, { NewsItemType } from '../NewsItem/NewsItem';

/**
 * Компонент для отображения детальной информации о новости.
 * Загружает и отображает информацию о конкретной новости, используя переданный ID.
 */
const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID новости из параметров маршрута
  const { fetchNewsDetail } = useAuth(); // Функция для получения деталей новости
  const [newsItem, setNewsItem] = useState<NewsItemType | null>(null); // Состояние для хранения деталей новости
  const [error, setError] = useState<string>(''); // Состояние для хранения ошибки

  useEffect(() => {
    const loadNewsDetail = async () => {
      try {
        if (id) {
          const fetchedItem = await fetchNewsDetail(id);
          setNewsItem(fetchedItem); // Установка полученных данных о новости
        }
      } catch (err) {
        setError('Ошибка при загрузке деталей новости'); // Установка сообщения об ошибке
        console.error(err); // Логирование ошибки для отладки
      }
    };

    loadNewsDetail();
  }, [id, fetchNewsDetail]);

  if (error) return <div>{error}</div>; // Отображение ошибки
  if (!newsItem) return <div>Loading...</div>; // Отображение состояния загрузки

  // Рендеринг детальной информации о новости
  return (
    <div className="news-detail">
      <NewsItem item={newsItem} /> {/* Отображение компонента с деталями новости */}
    </div>
  );
};

export default NewsDetail;
