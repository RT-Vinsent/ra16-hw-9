import React, { useState } from 'react';
import './LoginForm.css';

interface LoginFormProps {
  /**
   * Функция, вызываемая при отправке формы.
   * @param username - Имя пользователя.
   * @param password - Пароль пользователя.
   */
  onLogin: (username: string, password: string) => void;
}

/**
 * Компонент формы входа.
 * Позволяет пользователю ввести свои учетные данные для аутентификации.
 * 
 * @param {LoginFormProps} props - Свойства, включая функцию onLogin для обработки данных формы.
 * @returns {React.ReactElement} JSX элемент формы для входа в систему.
 */
export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('admin'); // Состояние для имени пользователя
  const [password, setPassword] = useState('admin'); // Состояние для пароля

  /**
   * Обрабатывает отправку формы.
   * @param {React.FormEvent<HTMLFormElement>} event - Событие формы.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Предотвращение стандартного поведения формы
    onLogin(username, password); // Вызов функции onLogin с текущими значениями состояний
  };

  // Рендеринг формы входа
  return (
    <form className="auth-profile" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Имя пользователя"
        autoComplete="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        autoComplete="current-password"
      />
      <button className="login-button" type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
