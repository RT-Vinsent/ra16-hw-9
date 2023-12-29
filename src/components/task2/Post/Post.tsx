import React from 'react';
import './Post.css';
import PostBody, { PostBodyProps } from '../PostBody/PostBody';

/**
 * Компонент для отображения поста.
 * Включает в себя тело поста (PostBody) и поле для добавления комментария.
 * @param {PostBodyProps} props - Свойства, передаваемые в тело поста (PostBody).
 * @returns {React.ReactElement} Элемент поста для рендеринга.
 */
const Post: React.FC<PostBodyProps> = (props) => {
  return (
    <div className="post">
      <PostBody {...props} /> {/* Вставка компонента тела поста с передачей свойств */}
      <div className="post-add-comment">
        <input type="text" placeholder="Напишите комментарий..." /> {/* Поле для добавления комментария */}
      </div>
    </div>
  );
};

export default Post;
