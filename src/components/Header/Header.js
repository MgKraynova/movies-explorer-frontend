import logo from "../../images/logo.svg";
import {NavLink} from "react-router-dom";
import './Header.css';
import '../Link/Link.css';

function Header() {
    return(
        <header className="header header_background_dark-blue">
            <img className="header__logo" src={logo} alt="Логотип проекта" />
            <nav className="header__auth-menu">
                <NavLink className="header__auth-link link" to="/singin">Регистрация</NavLink>
                <NavLink className="header__auth-link header__auth-link_type_button link" to="/signup">Войти</NavLink>
            </nav>
        </header>
    )
}

export default Header;