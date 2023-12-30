import './CreatePost.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserProvider';

/**
 * Компонент для создания нового поста.
 * Использует контекст пользователя и локальное состояние для управления содержимым поста.
 * Позволяет сохранять черновики и отправлять данные на сервер.
 */
const CreatePost: React.FC = () => {
  const [content, setContent] = useState(''); // Состояние для содержимого поста
  const navigate = useNavigate(); // Хук для навигации
  const user = useUser(); // Текущий пользователь из контекста

  // Эффект для загрузки сохраненного контента из localStorage при инициализации
  useEffect(() => {
    const draftContent = localStorage.getItem('draftContent');
    if (draftContent) {
      setContent(draftContent);
    }
  }, []);

  /**
   * Обработчик для отмены создания поста.
   * Сохраняет текущее содержимое в localStorage и перенаправляет пользователя.
   */
  const handleCancel = () => {
    localStorage.setItem('draftContent', content); // Сохранение в localStorage
    navigate(`${process.env.REACT_APP_HW_PROJECT_NAME}/task2/`); // Перенаправление
  };

  /**
   * Обработчик отправки формы для создания поста.
   * Отправляет содержимое поста на сервер и обрабатывает ответ.
   * @param {React.FormEvent} event - Событие формы
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 0, content }) // Отправка содержимого на сервер
      });
      if (response.ok) {
        localStorage.removeItem('draftContent'); // Удаление черновика после успешного создания
        navigate(`${process.env.REACT_APP_HW_PROJECT_NAME}/task2/`);
      } else {
        console.error('Не удалось создать пост');
      }
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
    }
  };

  // Рендеринг компонента
  return (
    <div className="create-post">

      {/* Заголовок и контролы */}
      <div className="create-post-header">
        
        {/* Ссылки и кнопки для действий с постом */}
        <div className="post-links">
          <span className="post-link">Публикация</span>
          <span className="post-link">Фото/видео</span>
          <span className="post-link">Прямой эфир</span>
          <span className="post-link">Ещё</span>
        </div>
        <button onClick={handleCancel} className="close-button">×</button>
      </div>

      {/* Форма для создания поста */}
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="user-and-textarea">

          {/* Отображение аватара пользователя */}
          {user && <img src={user.avatar} alt={user.name} className="user-avatar" />}

          {/* Поле для ввода текста поста */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Пост, относящийся к курсу React"
            required
          />
        </div>
        <div className="post-form-controls">
          <button type="submit" className="publish-button">Опубликовать</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
