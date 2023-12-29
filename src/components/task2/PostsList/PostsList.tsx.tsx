import './PostsList.css';
import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { PostBodyProps } from '../PostBody/PostBody';

/**
 * Компонент для отображения списка постов.
 * Использует состояние для хранения списка постов и асинхронный запрос для их загрузки с сервера.
 */
const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<PostBodyProps[]>([]); // Состояние для хранения списка постов

  // Эффект для асинхронной загрузки списка постов с сервера при монтировании компонента
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
        const data = await response.json();
        setPosts(data); // Обновление состояния с загруженными постами
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Рендеринг списка постов
  return (
    <div className='posts'>
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          content={post.content}
          created={post.created}
        /> // Отображение каждого поста
      ))}
    </div>
  );
};

export default PostsList;
