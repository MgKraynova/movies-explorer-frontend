import {useLocation} from "react-router-dom";
import './card.css';
import '../Link/link.css';
import {useState} from "react";

function MoviesCard({movie}) {

    const location = useLocation();

    const [isLiked, setIsLiked] = useState(false);

    const cardSaveButtonClassName = (`card__button card__button_type_save ${isLiked && 'card__button_active'}`);
    const cardDeleteButtonClassName = ('card__button card__button_type_delete');

    function handleButtonClick() {
        setIsLiked(!isLiked);
    }

    return (
        <li className="card">
            <div className="card__wrapper">
                <div className="card__text-container">
                    <h2 className="card__title">{movie.nameRU}</h2>
                    <p className="card__text">{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
                </div>
                <button type="button" className={location.pathname === "/movies"
                    ? cardSaveButtonClassName
                    : cardDeleteButtonClassName} onClick={handleButtonClick}/>
            </div>
            <a className="link" href={movie.trailerLink}>
                <img className="card__image" src={'https://api.nomoreparties.co/' + movie.image.url}
                     alt={movie.nameRU}/>
            </a>
        </li>
    )
}

export default MoviesCard;