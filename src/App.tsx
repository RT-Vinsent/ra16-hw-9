import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import NavigationMenu from './components/task1/NavigationMenu/NavigationMenu';

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
        <h2>Задачи расположены последовательно в столбик</h2>
      </header>
      
      {/* Компонент задачи №1 */}
      <NavigationMenu />

      {/* Компонент задачи №2 */}
      {/* < /> */}

      {/* Компонент задачи №3 */}
      {/* < /> */}
      
      {/* Просто подвал */}
      <footer className='footer'><p>Просто подвал</p></footer>
    </Router>
  );
}

export default App;
