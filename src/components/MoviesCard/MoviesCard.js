import cardExampleImage from '../../images/card__example-image.jpg';
import './card.css';

function MoviesCard() {
    return (
        <li className="card">
            <div className="card__wrapper">
                <div className="card__text-container">
                    <h2 className="card__title">33 слова о дизайне</h2>
                    <p className="card__text">1ч 47м</p>
                </div>
                <button type="button" className="card__button" />
            </div>
            <img className="card__image" src={cardExampleImage} alt="Пример изображения" />
        </li>
    )
}

export default MoviesCard;