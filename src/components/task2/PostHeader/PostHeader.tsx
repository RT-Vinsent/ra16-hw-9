import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserProvider';
import './PostHeader.css';

/**
 * Определяет свойства для компонента PostHeader.
 */
export interface PostHeaderProps {
  /** Идентификатор поста, опциональный */
  id?: number;
  /** Дата создания поста, опциональная */
  created?: Date;
}

/**
 * Компонент для отображения заголовка поста.
 * Включает в себя информацию о пользователе и ссылку на просмотр поста.
 * @param {PostHeaderProps} props - Свойства, необходимые для отображения заголовка поста.
 * @returns {React.ReactElement} Элемент заголовка поста для рендеринга.
 */
const PostHeader: React.FC<PostHeaderProps> = ({ id, created }) => {
  const user = useUser(); // Использование контекста пользователя

  return (
    <div className="post-header">
      <div className="user-info">
        {/* Отображение аватара и имени пользователя */}
        {user && <img src={user.avatar} alt={user.name} className="user-avatar" />}
        {user && <div>
          <h4 className="user-name">{user.name}</h4>
          {/* Отображение даты создания поста, если она доступна */}
          {created && <span className="post-date">Опубликовано: {new Date(created).toLocaleString()}</span>}
        </div>}
      </div>
      {/* Ссылка на просмотр поста, если ID доступен */}
      {id && (
        <div className="post-options">
          <Link to={`/task2/posts/${id}`}>Просмотр</Link>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
