import photo from "../../images/student-info__img.jpg";
import './student-info.css';
import '../Section/section.css';
import '../List/list.css';
import '../Link/link.css';

function StudentInfo() {
    return (
        <section className="student-info section">
            <div className="section__header">
                <h2 className="section__title">Студент</h2>
            </div>
            <div className="student-info__content">
                <div className="student-info__text-container">
                    <div className="student-info__main-info">
                        <div className="student-info__wrapper">
                            <h3 className="student-info__subtitle">Марина</h3>
                            <p className="student-info__caption">Фронтенд-разработчик, 26 лет</p>
                        </div>
                        <p className="student-info__description">Я родился и живу в Саратове, закончил факультет экономики СГУ.
                            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
                            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
                            как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    </div>
                    <ul className="student-info__list list">
                        <li>
                            <a target="_blank" href="https://ru-ru.facebook.com/" className="student-info__link link">Facebook</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://github.com/MgKraynova" className="student-info__link link">Github</a>
                        </li>
                    </ul>
                </div>
                <img className="student-info__img" src={photo} alt="Фото Марины"/>
            </div>
        </section>
    )
}

export default StudentInfo;