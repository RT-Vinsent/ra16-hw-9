import React, { createContext, useContext } from 'react';

/**
 * Определяет интерфейс для объекта пользователя.
 */
interface User {
  /** Имя пользователя */
  name: string;
  /** Ссылка на аватар пользователя */
  avatar: string;
}

/**
 * Значение по умолчанию для пользователя.
 */
const defaultUser: User = {
  name: 'Ilnaz Giyazov',
  avatar: 'https://i.pravatar.cc/300?img=12',
};

/**
 * Создает контекст для пользователя.
 */
const UserContext = createContext<User | null>(null);

/**
 * Пользовательский хук для доступа к контексту пользователя.
 * @returns {User} Текущий пользователь из контекста.
 * @throws Если хук использован вне провайдера UserProvider.
 */
export const useUser = (): User => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

/**
 * Свойства для компонента провайдера пользователя.
 */
interface UserProviderProps {
  /** Внутренние компоненты, которые будут иметь доступ к контексту */
  children: React.ReactNode;
  /** Пользователь, который будет использоваться как значение по умолчанию */
  user?: User;
}

/**
 * Провайдер для контекста пользователя.
 * @param props Свойства для провайдера пользователя.
 * @returns {React.ReactElement} Элемент провайдера с заданным контекстом.
 */
export const UserProvider = ({ children, user = defaultUser }: UserProviderProps): React.ReactElement => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
