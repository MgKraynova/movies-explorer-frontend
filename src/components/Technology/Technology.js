import './technology.css';
import '../Section/section.css';
import '../List/list.css';

function Technology() {
    return (
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
    )
}

export default Technology;