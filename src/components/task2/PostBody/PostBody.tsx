import './PostBody.css';
import React from 'react';
import PostHeader from '../PostHeader/PostHeader';

/**
 * Определяет свойства для компонента PostBody.
 */
export interface PostBodyProps {
  /** Идентификатор поста */
  id?: number;
  /** Содержимое поста */
  content: string;
  /** Дата создания поста */
  created: Date;
}

/**
 * Компонент для отображения тела поста.
 * Включает в себя заголовок поста (PostHeader), содержимое и кнопки действий.
 * @param {PostBodyProps} props - Свойства, необходимые для отображения тела поста.
 * @returns {React.ReactElement} Элемент тела поста для рендеринга.
 */
const PostBody: React.FC<PostBodyProps> = ({ id, content, created }) => {
  return (
    <>
      <PostHeader id={id} created={created}/> {/* Заголовок поста с ID и датой создания */}
      <div className="post-content">
        <p>{content}</p> {/* Отображение содержимого поста */}
      </div>
      <div className="post-actions">
        <button className="like-button">Нравится</button> {/* Кнопка 'Нравится' */}
        <button className="comment-button">Комментировать</button> {/* Кнопка 'Комментировать' */}
      </div>
    </>
  );
};

export default PostBody;
