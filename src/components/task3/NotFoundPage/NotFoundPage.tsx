import React from 'react';
import './NotFoundPage.css';

/**
 * Компонент NotFoundPage представляет страницу с сообщением о том, что запрашиваемая страница не найдена.
 * @component
 */
const NotFoundPage = () => {
  return (
    <div className='not-found-page'>
      <h2>404 - Страница не найдена</h2>
      <p>Извините, запрашиваемая вами страница не существует.</p>
    </div>
  );
};

export default NotFoundPage;
