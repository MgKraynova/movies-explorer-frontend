import logo from "../../images/logo.svg";
import {Link, NavLink} from "react-router-dom";
import './Header.css';
import '../Link/link.css';
import Navigation from "../Navigation/Navigation";

function Header({headerStyles, navigationType, loggedIn}) {
    return(
        <header className={headerStyles}>
            <Link to="/">
                <img className="header__logo" src={logo} alt="Логотип проекта" />
            </Link>
            {navigationType && <Navigation loggedIn={loggedIn} type={navigationType} />}
        </header>
    )
}

export default Header;