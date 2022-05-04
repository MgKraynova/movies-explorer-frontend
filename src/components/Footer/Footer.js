import './footer.css';

function Footer() {

    const date = new Date();

    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__year">&copy; {date.getFullYear()}</p>
                <nav className="footer__menu">
                    <ul className="footer__list list">
                        <li>
                            <a href="https://practicum.yandex.ru" className="footer__link link">Яндекс.Практикум</a>
                        </li>
                        <li>
                            <a href="https://practicum.yandex.ru" className="footer__link link">Github</a>
                        </li>
                        <li>
                            <a href="https://ru-ru.facebook.com/" className="footer__link link">Facebook</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;