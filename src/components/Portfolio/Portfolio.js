import portfolioIcon from "../../images/portfolio__icon.svg";
import './portfolio.css';
import '../Section/section.css';
import '../List/list.css';
import '../Link/link.css';

function Portfolio() {
    return (
        <section className="portfolio section" >
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list list">
                <li className="portfolio__item">
                    <a target="_blank" className="portfolio__link link" href="https://github.com/MgKraynova/how-to-learn">Статичный сайт</a>
                    <a target="_blank" className="link" href="https://github.com/MgKraynova/how-to-learn">
                        <img className="portfolio__icon" src={portfolioIcon} alt="Изображение стрелки" />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a target="_blank" className="portfolio__link link" href="https://github.com/MgKraynova/russian-travel">Адаптивный сайт</a>
                    <a target="_blank" className="link" href="https://github.com/MgKraynova/russian-travel">
                        <img className="portfolio__icon" src={portfolioIcon} alt="Изображение стрелки" />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a target="_blank" className="portfolio__link link" href="https://github.com/MgKraynova/react-mesto-api-full">Одностраничное приложение</a>
                    <a target="_blank" className="link" href="https://github.com/MgKraynova/react-mesto-api-full">
                        <img className="portfolio__icon" src={portfolioIcon} alt="Изображение стрелки" />
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;