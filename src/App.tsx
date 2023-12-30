import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';
import NavigationMenu from './components/task1/NavigationMenu/NavigationMenu';
import CRUD from './components/task2/CRUD/CRUD';
import Authentication from './components/task3/Authentication/Authentication';
import { AuthProvider } from './components/task3/contexts/AuthContext';
import NotFoundPage from './components/task3/NotFoundPage/NotFoundPage';

/**
 * Главный компонент приложения
 * @returns {JSX.Element} - Основной элемент приложения
 */
function App(): JSX.Element {

  return (
    <Router>
      {/* шапка */}
      <header className='header'>
        <h1>Домашнее задание «React Router»</h1>
        <h2>Задачи расположены по разделам</h2>

        <nav className="nav-link-container">
          {/* <NavLink to="/" className="nav-link">Главная</NavLink> */}
          <NavLink to="/task1/" className="nav-link">Задача №1</NavLink>
          <NavLink to="/task2/" className="nav-link">Задача №2</NavLink>
          <NavLink to="/task3/" className="nav-link">Задача №3</NavLink>
        </nav>
      </header>

      <Routes>
        {/* Редирект на задачу №1 */}
        <Route path="/" element={<Navigate replace to="/task1/" />}/>

        {/* Компонент задачи №1 */}
        <Route path="/task1/*" element={<NavigationMenu />} />

        {/* Компонент задачи №2 */}
        <Route path="/task2/*" element={<CRUD />} />

        {/* Компонент задачи №3 */}
        <Route path="/task3/*" element={<AuthProvider><Authentication/></AuthProvider>} />

        {/* Обработка 404 ошибок */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Просто подвал */}
      <footer className='footer'><p>Просто подвал</p></footer>
    </Router>
  );
}

export default App;
