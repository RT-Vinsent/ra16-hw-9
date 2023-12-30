import React from 'react';
import './NewsItem.css'; // Убедитесь, что создали и импортировали соответствующий CSS файл
import { useNavigate } from 'react-router-dom';

export interface NewsItemType {
  id: string;
  image: string;
  title: string;
  content: string;
}

interface NewsItemProps {
  item: NewsItemType;
}

/**
 * Компонент для отображения отдельного элемента новости.
 * При клике перенаправляет пользователя на страницу с деталями новости.
 * 
 * @param {NewsItemProps} props - Свойства, включая объект новости.
 * @returns {React.ReactElement} JSX элемент новостного блока.
 */
const NewsItem: React.FC<NewsItemProps> = ({ item }) => {
  const navigate = useNavigate();

  /**
   * Обработчик клика по новости.
   * Перенаправляет пользователя на страницу деталей новости.
   */
  const handleClick = () => {
    navigate(`${process.env.REACT_APP_HW_PROJECT_NAME}/task3/news/${item.id}`);
  };

  // Рендеринг элемента новости
  return (
    <div key={item.id} className="news-item" onClick={handleClick}>
      <div className="news-photo">
        <img src={item.image} alt={item.title} className="news-image" />
      </div>
      <h3 className="news-title">{item.title}</h3>
      <p className="news-content">{item.content}</p>
    </div>
  );
};

export default NewsItem;
