import {useLocation} from "react-router-dom";
import './card.css';
import '../Link/link.css';

function MoviesCard({movie}) {

    const location = useLocation();

    return (
        <li className="card">
            <div className="card__wrapper">
                <div className="card__text-container">
                    <h2 className="card__title">{movie.nameRU}</h2>
                    <p className="card__text">{movie.duration}</p>
                </div>
                <button type="button" className={location.pathname === "/movies"
                    ? "card__button card__button_type_save"
                    : "card__button card__button_type_delete"}   />
            </div>
            <a className="link" href={movie.trailerLink}>
                <img className="card__image" src={'https://api.nomoreparties.co/' + movie.image.url} alt={movie.nameRU} />
            </a>
        </li>
    )
}

export default MoviesCard;