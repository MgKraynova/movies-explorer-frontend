import titlePageLogo from "../../images/title-page__logo.svg";
import './promo.css';

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <img className="promo__logo" alt="Логотип титульной страницы в виде абстракции"
                 src={titlePageLogo} />
        </section>
    )
}

export default Promo;