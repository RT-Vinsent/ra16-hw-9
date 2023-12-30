import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NewsItemType } from '../NewsItem/NewsItem';
import { useNavigate } from 'react-router-dom';

/**
 * Определяет тип контекста аутентификации.
 */
interface AuthContextType {
  token: string | null;
  profile: any; // TODO: Замените 'any' на более конкретный тип, соответствующий вашему профилю пользователя
  news: any[]; // TODO: Замените 'any[]' на тип новостей
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  fetchNews: () => Promise<void>;
  fetchNewsDetail: (newsId: string) => Promise<NewsItemType>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Хук для использования контекста аутентификации.
 * @throws Ошибка, если хук используется вне провайдера AuthProvider.
 * @returns Контекст аутентификации.
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7070';

/**
 * Провайдер контекста аутентификации.
 * Управляет состоянием аутентификации и предоставляет функции для взаимодействия с API.
 * @param {React.PropsWithChildren<{}>} props - Дочерние компоненты.
 * @returns {React.ReactElement} Элемент провайдера аутентификации.
 */
const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [profile, setProfile] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchApi = useCallback(async (endpoint: string, options = {}) => {
    if (!token) {
      navigate('/task3/');
      // return Promise.reject('No token found');
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        ...options
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setProfile(null);
        setNews([]);
        navigate('/task3/');
        return Promise.reject('Unauthorized: Please login again');
        // console.error('Unauthorized: Please login again');
      }


      if (response.status === 404) {
        console.log('response.status === 404');
        navigate('/task3/404');
      }

      if (!response.ok) {
        // throw new Error(`Error: ${response.status}`);
        console.error(`Error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      // throw error;
      console.error('fetchApi', error);
    }
  }, [token, navigate]);
  

  const fetchProfile = useCallback(async () => {
    if (token) {
      try {
        const data = await fetchApi('/private/me');
        setProfile(data);
      } catch (error) {
        console.error('Ошибка при получении профиля:', error);

      }
    }
  }, [token, fetchApi]);

  const fetchNews = useCallback(async () => {
    if (token) {
      try {
        const data = await fetchApi('/private/news');
        setNews(data);
      } catch (error) {
        console.error('Ошибка при получении новостей:', error);

      }
    }
  }, [token, fetchApi]);

  const login = async (login: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem('token', data.token);
        await fetchProfile();
        await fetchNews();
        navigate('/task3/news');
      } else {
        console.error('Ответ сервера:', await response.text());
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  const logout = () => {
    setToken(null);
    setProfile(null);
    setNews([]);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchNews();
    }
  }, [token, fetchProfile, fetchNews]);

  const fetchNewsDetail = useCallback(async (newsId: string) => {
    if (token) {
      try {
        const data = await fetchApi(`/private/news/${newsId}`);
        console.log('data', data);
        return data as NewsItemType;
      } catch (error) {
        console.error('Ошибка при получении деталей новости:', error);
        navigate('/task3/404');
        throw error;
      }
    } else {
      throw new Error('No token found');
    }
  }, [token, fetchApi, navigate]);

  return (
    <AuthContext.Provider value={{ token, profile, news, login, logout, fetchProfile, fetchNews, fetchNewsDetail }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
