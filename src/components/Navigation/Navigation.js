import {NavLink} from "react-router-dom";
import './navigation.css';

function Navigation({type}) {

    const MainPageMenu = <nav className="navigation__auth-menu">
        <NavLink className="navigation__auth-link link" to="/signup">Регистрация</NavLink>
        <NavLink className="navigation__auth-link navigation__auth-link_type_button link" to="/signin">Войти</NavLink>
    </nav>

    const AfterLoggedInMenu = <nav className="navigation__logged-menu">
        <div className="navigation__wrapper" >
            <NavLink className="navigation__link navigation__logged-menu-link_type_active link" to="/movies">Фильмы</NavLink>
            <NavLink className="navigation__link link" to="/signin">Сохраненные фильмы</NavLink>
        </div>
        <NavLink className="navigation__button link" to="/signin">Аккаунт</NavLink>
    </nav>

    return (
        type === 'mainPageMenu' && MainPageMenu || type === 'afterLoggedInMenu' && AfterLoggedInMenu
    )
}

export default Navigation;