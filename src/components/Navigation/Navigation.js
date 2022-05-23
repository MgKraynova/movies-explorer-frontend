import {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import AccountButton from "../AccountButton/AccountButton";
import './navigation.css';
import './burger.css';
import './burger-icon.css';
import './burger-menu.css';

function Navigation({type, loggedIn}) {

    const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

    const location = useLocation();

    const MainPageMenu = <nav className="navigation__auth-menu">
        <NavLink className="navigation__auth-link link" to="/signup">Регистрация</NavLink>
        <NavLink className="navigation__auth-link navigation__auth-link_type_button link" to="/signin">Войти</NavLink>
    </nav>

    const AfterLoggedInMenu = <nav className="navigation__logged-menu">
        <div className="navigation__wrapper">
            <NavLink className={`navigation__link link ${loggedIn && 'navigation__link_color_white'}
            ${location.pathname === '/movies' && 'navigation__link_type_active'}`}
                     to="/movies">Фильмы</NavLink>
            <NavLink className={`navigation__link link ${loggedIn && 'navigation__link_color_white'}
            ${location.pathname === '/saved-movies' && 'navigation__link_type_active'}`} to="/saved-movies">Сохраненные фильмы</NavLink>
        </div>
        <AccountButton styles={"account-button account-button_invisible link"} />

        <div className="burger">
            <div className="burger-icon" onClick={handleBurgerIconClick}>
                <div className={isBurgerMenuOpened
                    ? "burger-icon__line burger-icon__line_animation_first-line"
                    : "burger-icon__line"}/>
                <div className={isBurgerMenuOpened
                    ? "burger-icon__line burger-icon__line_animation_second-line"
                    : "burger-icon__line"}/>
                <div className={isBurgerMenuOpened
                    ? "burger-icon__line burger-icon__line_animation_third-line"
                    : "burger-icon__line"}/>
            </div>
            <nav className={isBurgerMenuOpened
                ? "burger-menu burger-menu_opened"
                : "burger-menu"}>
                <ul className="burger-menu__list list">
                    <li>
                        <NavLink className={location.pathname === "/"
                        ? "burger-menu__link link burger-menu__link_active"
                        : "burger-menu__link link"} to="/">Главная</NavLink>
                    </li>
                    <li>
                        <NavLink className={location.pathname === "/movies"
                            ? "burger-menu__link link burger-menu__link_active"
                            : "burger-menu__link link"} to="/movies">Фильмы</NavLink>
                    </li>
                    <li>
                        <NavLink className={location.pathname === "/saved-movies"
                            ? "burger-menu__link link burger-menu__link_active"
                            : "burger-menu__link link"} to="/saved-movies">Сохранённые фильмы</NavLink>
                    </li>
                </ul>
                <AccountButton styles={"account-button link"} />
            </nav>
        </div>
    </nav>

    function handleBurgerIconClick() {
        setIsBurgerMenuOpened(!isBurgerMenuOpened);
    }

    return (
        (type === 'mainPageMenu' && MainPageMenu) || (type === 'afterLoggedInMenu' && AfterLoggedInMenu)
    )
}

export default Navigation;