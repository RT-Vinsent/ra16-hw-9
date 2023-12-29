import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './NavigationMenu.css';

function Menu() {
  const location = useLocation();
  const isActive = 'menu__item menu__item-active';
  const isNoActive = 'menu__item';

  const isExactActive = (path: string) => location.pathname === path;

  return (
    <nav className="menu">
      {/* <NavLink to="/task1/" className={(navData) => navData.isActive ? isActive : isNoActive}>Главная</NavLink> */}
      <NavLink to="/task1/" className={isExactActive('/task1/') ? isActive : isNoActive}>Главная</NavLink>
      <NavLink to="/task1/drift" className={(navData) => navData.isActive ? isActive : isNoActive}>Дрифт-такси</NavLink>
      <NavLink to="/task1/timeattack" className={(navData) => navData.isActive ? isActive : isNoActive}>Time Attack</NavLink>
      <NavLink to="/task1/forza" className={(navData) => navData.isActive ? isActive : isNoActive}>Forza Karting</NavLink>
    </nav>
  )
}

export function HomePage() {
  return (
    <article className="article">
      <h1 className="article__title">Гоночн​ое такси</h1>
      <p className="article__paragraph">
        Гоночн​ое такси – отличная возможность насладиться скоростью и мастерством гонщика,
        сидя на месте штурмана, и стать свидетелем настоящего мастерства профессиональных
        инструкторов Сочи Автодрома, в полной мере ощутив крутые виражи на самой современной
        гоночной трассе России.
      </p>
    </article>
  )
}

export function DriftPage() {
  return (
    <article className="article">
      <h1 className="article__title">Дрифт-такси</h1>
      <p className="article__paragraph">
        Только ​на Сочи Автодроме вас ждет уникальная возможность
        промчаться по трассе Формулы 1 на максимально возможной
        скорости в управляемом заносе на легендарной «королеве дрифта» Nissan Silvia!
      </p>
      <p className="article__paragraph">
        Прокатитесь на дрифт-такси с вице-чемпионом Межконтинентального
        кубка по дрифту под эгидой FIA 2017 года Аркадием Цареградцевым и
        испытайте на себе, что значат скоростные постановки и эффектные заносы!
      </p>
    </article>
  )
}

export function ForzaPage() {
  return (
    <article className="article">
      <h1 className="article__title">Forza Karting Sochi</h1>
      <p className="article__paragraph">
        В Олимпийском парке работает новый открытый развлекательный картинг центр мирового уровня!
      </p>
      <p className="article__paragraph">
        Вас ждут большая, широкая, безопасная трасса и супер современные карты
        европейского производства c двигателями мощностью 13 л.с.
        Трасса длинной более 500 метров  оборудована системой хронометража,
        фиксирующей данные заезда в режиме реального времени.
        По окончании заезда каждый пилот получает распечатку со своими результатами.
      </p>
    </article>
  )
}

export function TimeAttackPage() {
  return (
    <article className="article">
      <h1 className="article__title">Гонка ​​​​​​Time Attack</h1>
      <p className="article__paragraph">
        Гонка Time Attack создана для тех, кто любит ставить рекорды –
        открытое соревнование на гражданских автомобилях не предполагает
        контактной борьбы пилотов во время заезда, но позволит в полной мере
        ощутить скорость, найти идеальную траекторию и реализовать весь
        потенциал своего автомобиля. Каждый участник проезжает по Сочи Автодрому
        определённое количество кругов, а в зачёт идёт только лучшее время одного
        круга из всех заездов. Для того, чтобы попробовать свои силы на лучшей
        гоночной трассе страны, Вам понадобится исправный легковой автомобиль
        на летних шинах и шлем.
      </p>
    </article>
  )
}

export default function NavigationMenu() {
  return (
    <div className="container navigation-menu">
      <h2>«Список и детали»</h2>
      <Menu />
      <div className="page">
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="drift" element={<DriftPage />} />
          <Route path="timeattack" element={<TimeAttackPage />} />
          <Route path="forza" element={<ForzaPage />} />
        </Routes>
      </div>
    </div>
  );
}
