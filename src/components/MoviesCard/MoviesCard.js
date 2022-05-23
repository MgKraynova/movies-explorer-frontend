import {useLocation} from "react-router-dom";
import './card.css';
import '../Link/link.css';
import {useEffect, useState} from "react";

function MoviesCard({movie, onSaveMovie, onDeleteMovie, savedMovies, allMovies, filteredMovies}) {

    const location = useLocation();

    const [isLiked, setIsLiked] = useState(false);

    const cardSaveButtonClassName = (`card__button card__button_type_save ${isLiked && 'card__button_active'}`);
    const cardDeleteButtonClassName = ('card__button card__button_type_delete');


    useEffect(() => {

        checkMovieData();

        if (JSON.parse(localStorage.getItem('savedMovies'))) {
            checkForLike(JSON.parse(localStorage.getItem('savedMovies')));
        }
    }, []);

    useEffect(() => {
        if (savedMovies) {
            checkForLike(savedMovies);
        }
    }, [savedMovies, allMovies, filteredMovies, movie]);

    function checkMovieData() {
        if (movie.country === null) {
            movie.country = 'не указано';
        }

        if (movie.nameRU === null || !(/[\Wа-яА-ЯёЁ0-9\s\-?]+/g.test(movie.nameRU))) {
            movie.nameRU = 'не указано';
        }

        if (movie.nameEN === null || !(/[\w\d\s\-?]+/gi.test(movie.nameEN))) {
            movie.nameEN = 'not specified';
        }

        if (movie.trailerLink === null ||
            !(/https?:\/\/(www)?(\.)?[0-9а-яa-zё]{1,}\.[а-яa-zё]{2}.*/.test(movie.trailerLink))) {
            movie.trailerLink = 'https://www.youtube.com/';
        }
    }

    function checkForLike(arrayOfMovies) {
        if (arrayOfMovies) {
            arrayOfMovies.forEach((item) => {
                if (item.nameRU === movie.nameRU || item.nameEN === movie.nameEN) {
                    setIsLiked(true);
                }
            })
        }
    }

    function handleButtonClick() {
        const movieImage = 'https://api.nomoreparties.co' + movie.image.url;
        const movieThumbnail = 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url;

        if (isLiked) {
            const savedMovie = JSON.parse(localStorage.getItem('savedMovies')).filter((savedMovie) =>
                movie.id === savedMovie.movieId)[0];
            if (savedMovie) {
                onDeleteMovie(savedMovie._id);
            }
        } else {
            checkMovieData();
            onSaveMovie(movie.country, movie.director, movie.duration, movie.year, movie.description, movieImage,
                movie.trailerLink, movieThumbnail, movie.id, movie.nameRU, movie.nameEN);
        }
        setIsLiked(!isLiked);
    }

    function handleDeleteButtonClick() {
        onDeleteMovie(movie._id);
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
                    : cardDeleteButtonClassName}
                        onClick={location.pathname === "/movies" ? handleButtonClick : handleDeleteButtonClick}/>
            </div>
            <a className="link" href={movie.trailerLink}>
                <img className="card__image"
                     src={movie.image.url ? 'https://api.nomoreparties.co/' + movie.image.url : movie.image}
                     alt={movie.nameRU}/>
            </a>
        </li>
    )
}

export default MoviesCard;