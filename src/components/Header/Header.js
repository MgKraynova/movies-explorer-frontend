import logo from "../../images/logo.svg";
import {Link, NavLink} from "react-router-dom";
import './Header.css';
import '../Link/Link.css';

function Header({headerStyles, showAuthMenu}) {
    return(
        <header className={headerStyles}>
            <Link to="/">
                <img className="header__logo" src={logo} alt="Логотип проекта" />
            </Link>
            { showAuthMenu && <nav className="header__auth-menu">
                <NavLink className="header__auth-link link" to="/signup">Регистрация</NavLink>
                <NavLink className="header__auth-link header__auth-link_type_button link" to="/signin">Войти</NavLink>
            </nav> }
        </header>
    )
}

export default Header;