import './Main.css';
import './section.css';
import './title-page.css';
import './about-project.css'
import './technology.css';
import './student-info.css';
import '../List/List.css';
import './portfolio.css';
import titlePageLogo from '../../images/title-page__logo.svg';
import photo from '../../images/student-info__img.jpg';
import portfolioIcon from '../../images/portfolio__icon.svg';

function Main() {
    return (
        <>
            <main className="main">
                <section className="title-page section">
                    <h1 className="title-page__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <img className="title-page__logo" alt="Логотип титульной страницы в виде абстракции"
                         src={titlePageLogo} />
                </section>
                <section className="about-project section">
                    <div className="section__header">
                        <h2 className="section__title">О проекте</h2>
                    </div>
                    <div className="about-project__wrapper">
                        <div className="about-project__info">
                            <div className="about-project__text-container">
                                <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                                <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                            </div>
                            <div className="about-project__text-container">
                                <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                                <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                            </div>
                        </div>
                        <div className="about-project__time-line">
                            <div className="about-project__time-block about-project__time-block_size_small">
                                <p className="about-project__time">1 неделя</p>
                                <p className="about-project__caption">Back-end</p>
                            </div>
                            <div className="about-project__time-block about-project__time-block_size_big">
                                <p className="about-project__time about-project__time_color_grey">4 недели</p>
                                <p className="about-project__caption">Front-end</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="technology section">
                    <div className="section__header">
                        <h2 className="section__title">Технологии</h2>
                    </div>
                    <div className="technology__wrapper">
                        <div className="technology__text-container">
                            <h3 className="technology__subtitle">7 технологий</h3>
                            <p className="technology__text">На курсе веб-разработки мы освоили технологии,
                                которые применили в дипломном проекте.</p>
                        </div>
                        <ul className="technology__list list">
                            <li className="technology__list-item">
                                <p className="technology__item">HTML</p>
                            </li>
                            <li className="technology__list-item">
                                <p className="technology__item">CSS</p>
                            </li>
                            <li className="technology__list-item">
                                <p className="technology__item">JS</p>
                            </li>
                            <li className="technology__list-item">
                                <p className="technology__item">React</p>
                            </li>
                            <li className="technology__list-item">
                                <p className="technology__item">Git</p>
                            </li>
                            <li className="technology__list-item">
                                <p className="technology__item">Express.js</p>
                            </li>
                            <li className="technology__list-item">
                                <p className="technology__item">mongoDB</p>
                            </li>
                        </ul>
                    </div>
                </section>
                {/*<section className="student-info section">*/}
                {/*    <div className="section__header">*/}
                {/*        <h2 className="section__title">Студент</h2>*/}
                {/*    </div>*/}
                {/*    <div className="student-info__content">*/}
                {/*        <div className="student-info__text-container">*/}
                {/*            <div className="student-info__main-info">*/}
                {/*                <div className="student-info__wrapper">*/}
                {/*                    <h3 className="student-info__subtitle">Марина</h3>*/}
                {/*                    <p className="student-info__caption">Фронтенд-разработчик, 26 лет</p>*/}
                {/*                </div>*/}
                {/*                <p className="student-info__description">Я родился и живу в Саратове, закончил факультет экономики СГУ.*/}
                {/*                    У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.*/}
                {/*                    Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того,*/}
                {/*                    как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>*/}
                {/*            </div>*/}
                {/*            <ul className="student-info__list list">*/}
                {/*                <li>*/}
                {/*                    <a href="https://ru-ru.facebook.com/" className="student-info__link link">Facebook</a>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <a href="https://github.com/MgKraynova" className="student-info__link link">Github</a>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*        <img className="student-info__img" src={photo} alt="Фото Марины"/>*/}
                {/*    </div>*/}
                {/*</section>*/}
                {/*<section className="portfolio section" >*/}
                {/*    <h2 className="portfolio__title">Портфолио</h2>*/}
                {/*    <ul className="portfolio__list list">*/}
                {/*        <li className="portfolio__item">*/}
                {/*            <a className="portfolio__link link" href="https://github.com/MgKraynova/how-to-learn">Статичный сайт</a>*/}
                {/*            <img className="portfolio__icon" src={portfolioIcon} alt="Изображение стрелки" />*/}
                {/*        </li>*/}
                {/*        <li className="portfolio__item">*/}
                {/*            <a className="portfolio__link link" href="https://github.com/MgKraynova/russian-travel">Адаптивный сайт</a>*/}
                {/*            <img className="portfolio__icon" src={portfolioIcon} alt="Изображение стрелки" />*/}
                {/*        </li>*/}
                {/*        <li className="portfolio__item">*/}
                {/*            <a className="portfolio__link link" href="https://github.com/MgKraynova/react-mesto-api-full">Одностраничное приложение</a>*/}
                {/*            <img className="portfolio__icon" src={portfolioIcon} alt="Изображение стрелки" />*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</section>*/}
            </main>
        </>
    )
}

export default Main;

//todo птимизировать img