import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../LoginForm/LoginForm';
import NewsFeed from '../NewsFeed/NewsFeed';
import Profile from '../Profile/Profile';
import './Authentication.css';
import Welcome from '../Welcome/Welcome';
import { Routes, Route, useNavigate, Link, Navigate } from 'react-router-dom';
import NewsDetail from '../NewsDetail/NewsDetail';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

/**
 * Компонент для управления аутентификацией и навигацией в приложении.
 * Использует контекст аутентификации для управления доступом к разделам приложения.
 */
export const Authentication: React.FC = () => {
  const { token, profile, login, logout } = useAuth(); // Хуки для аутентификации
  const navigate = useNavigate(); // Хук для навигации
  const API_HW_PROJECT_NAME = process.env.REACT_APP_HW_PROJECT_NAME || '';

  useEffect(() => {
    // Редирект на страницу входа, если пользователь не аутентифицирован
    if (!token) {
      navigate(`${API_HW_PROJECT_NAME}/task3/`);
    }
  }, [token, navigate, API_HW_PROJECT_NAME]);

  // Рендеринг компонента
  return (
    <div className="container">
      <h2>«Authentication»</h2>
      <div className="authentication-content">
        <header className="authentication-header">
          <div className="authentication-logo">
            <Link to="/task3/news">Neto Social</Link> {/* Ссылка на главную страницу */}
          </div>
          <div className="authentication-login-form">
            {/* Отображение формы входа или профиля в зависимости от статуса аутентификации */}
            {!token ? 
              (<LoginForm onLogin={login} />) : 
              profile ? 
                (<Profile onLogout={logout} profileData={profile} />) : 
                (<div>Загрузка профиля...</div>)
            }
          </div>
        </header>

        <Routes>
          {/* Маршрутизация внутри приложения */}
          <Route path="/" element={token ? <Navigate to={`${API_HW_PROJECT_NAME}/task3/news`} /> : <Welcome />} />
          <Route path="/news" element={token ? <NewsFeed /> : <Welcome />} />
          <Route path="/news/:id" element={token ? <NewsDetail /> : <Welcome />} />

          {/* Обработка несуществующих маршрутов */}
          <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default Authentication;
