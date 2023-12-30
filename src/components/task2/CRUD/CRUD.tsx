import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './CRUD.css';
import { UserProvider } from '../context/UserProvider';
import PostsList from '../PostsList/PostsList.tsx';
import CreatePost from '../CreatePost/CreatePost';
import ViewPost from '../ViewPost/ViewPost';
import EditPost from '../EditPost/EditPost';

/**
 * Компонент для отображения навигационного меню.
 * Использует текущее местоположение для определения активной ссылки.
 */
function Menu() {
  const location = useLocation();
  const isActive = 'crud-menu__item crud-menu__item-active';
  const isNoActive = 'crud-menu__item';

  /**
   * Проверяет, является ли путь активным.
   * @param {string} path Путь для проверки.
   * @returns {boolean} Возвращает true, если путь активен.
   */
  const isExactActive = (path: string) => location.pathname === path;

  const API_HW_PROJECT_NAME = process.env.REACT_APP_HW_PROJECT_NAME || '';

  // Рендеринг навигационного меню
  return (
    <nav className="crud-menu">
      <NavLink to={`${API_HW_PROJECT_NAME}/task2/`} className={isExactActive('/task2/') ? isActive : isNoActive}>Посты</NavLink>
      <NavLink to={`${API_HW_PROJECT_NAME}/task2/posts/new`} className={(navData) => navData.isActive ? isActive : isNoActive}>Создать пост</NavLink>
    </nav>
  )
}

/**
 * Главный компонент для CRUD-приложения.
 * Обеспечивает навигацию и маршрутизацию для различных страниц приложения.
 */
export default function CRUD() {
  // Рендеринг контейнера CRUD с навигацией и маршрутизацией
  return (
    <UserProvider>
      <div className="container navigation-menu">
        <h2>«CRUD»</h2>
        <Menu />
        <div className="page-crud">
          <Routes>
            <Route path="" element={<PostsList />} />
            <Route path="/posts/new" element={<CreatePost />} />
            <Route path="/posts/:id" element={<ViewPost />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
}
