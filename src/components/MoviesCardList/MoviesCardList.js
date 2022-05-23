import {useLocation} from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import './movies.css';
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";
import useWindowWidth from "../../utils/useWindowWidth";
import {
    NUMBER_OF_MOVIES_AT_PAGE_AT_BIG_SCREENS,
    NUMBER_OF_MOVIES_AT_PAGE_AT_TABLETS,
    NUMBER_OF_MOVIES_AT_PAGE_AT_PHONES,
    NUMBER_OF_ADDITIONAL_MOVIES_AT_BIG_SCREENS,
    NUMBER_OF_ADDITIONAL_MOVIES_AT_TABLETS,
    NUMBER_OF_ADDITIONAL_MOVIES_AT_PHONES
} from '../../utils/config';

function MoviesCardList({isLoading, isApiError, onSaveMovie, onDeleteMovie, savedMovies, filteredMovies, allMovies}) {

    const windowWidth = useWindowWidth();

    const location = useLocation();

    const [content, setContent] = useState(null);
    const [numberOfMoviesAtPage, setNumberOfMoviesAtPage] = useState(12);
    const [numberOfAdditionalMovies, setNumberOfAdditionalMovies] = useState(3);
    const [isButtonShown, setIsButtonShown] = useState(false);

    const notFoundMessage = (<p className="movies__text">Ничего не найдено</p>);

    const apiErrorMessage = (<p className="movies__text">Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>);

    useEffect(() => {
        setNumberOfMoviesAtPageAndNumberOfAdditionalMovies();
    }, [windowWidth]);

    useEffect(() => {
        setNumberOfMoviesAtPageAndNumberOfAdditionalMovies();

        if (location.pathname === '/movies' && (!(filteredMovies === undefined))) {
            console.log('savedMovies', savedMovies);
            setContent(<ul className="movies__list list">
                {renderMovieCards(filteredMovies)}
            </ul>);
        }
    }, []);

    useEffect(() => {
        if (location.pathname === '/saved-movies' && savedMovies) {

            if (numberOfMoviesAtPage > savedMovies.length) {
                setIsButtonShown(false);
            } else {
                setIsButtonShown(true);
            }

            setContent(<ul className="movies__list list">
                {renderMovieCards(savedMovies)}
            </ul>);
        }
    }, [savedMovies, location.pathname, numberOfMoviesAtPage]);

    useEffect(() => {
        if (isLoading) {
            setContent(<Preloader/>);
        }
    }, [isLoading]);

    useEffect(() => {
        if (isApiError) {
            setContent(apiErrorMessage);
        }
    }, [isApiError]);

    useEffect(() => {
        if (localStorage.getItem('searchRequest')) {
            if (filteredMovies && filteredMovies.length > 0) {
                if (numberOfMoviesAtPage >= filteredMovies.length) {
                    setIsButtonShown(false);
                } else {
                    setIsButtonShown(true);
                }
                console.log('filteredMovies', filteredMovies);

                setContent(<ul className="movies__list list">
                    {renderMovieCards(filteredMovies)}
                </ul>);
            } else if (filteredMovies && filteredMovies.length === 0) {
                console.log('filteredMovies', filteredMovies);
                setContent(notFoundMessage);
            }
        }
    }, [filteredMovies, numberOfMoviesAtPage]);

    function setNumberOfMoviesAtPageAndNumberOfAdditionalMovies() {
        if (windowWidth > 1087) {
            setNumberOfMoviesAtPage(NUMBER_OF_MOVIES_AT_PAGE_AT_BIG_SCREENS);
            setNumberOfAdditionalMovies(NUMBER_OF_ADDITIONAL_MOVIES_AT_BIG_SCREENS);
        } else if (windowWidth > 426) {
            setNumberOfMoviesAtPage(NUMBER_OF_MOVIES_AT_PAGE_AT_TABLETS);
            setNumberOfAdditionalMovies(NUMBER_OF_ADDITIONAL_MOVIES_AT_TABLETS);
        } else {
            setNumberOfMoviesAtPage(NUMBER_OF_MOVIES_AT_PAGE_AT_PHONES);
            setNumberOfAdditionalMovies(NUMBER_OF_ADDITIONAL_MOVIES_AT_PHONES);
        }
    }

    function renderMovieCards(arrayOfMovies) {
        if (!arrayOfMovies) {
            return;
        }

        return (
            <>
                {
                    arrayOfMovies.slice(0, numberOfMoviesAtPage).map((movie) => {
                        return <MoviesCard savedMovies={savedMovies} onDeleteMovie={onDeleteMovie}
                                           onSaveMovie={onSaveMovie} key={movie.id || movie.movieId} movie={movie}
                                           allMovies={allMovies}
                        />
                    })
                }
            </>
        )
    }

    function handleButtonClick() {
        if (location.pathname === "/movies") {
            setNumberOfMoviesAtPage(numberOfMoviesAtPage + numberOfAdditionalMovies);
        }

        if (location.pathname === '/saved-movies') {
            setNumberOfMoviesAtPage(numberOfMoviesAtPage + numberOfAdditionalMovies);

            if (savedMovies && savedMovies.length > 0) {
                const movieListElement = <ul className="movies__list list">
                    {renderMovieCards(savedMovies)}
                </ul>;

                setContent(movieListElement);

                if (numberOfMoviesAtPage > savedMovies.length) {
                    setIsButtonShown(false);
                } else {
                    setIsButtonShown(true);
                }
            }
        }
    }

    return (
        <section className="movies">
            {content}
            {isButtonShown && <button type="button" onClick={handleButtonClick} className="movies__button">Еще</button>}
        </section>
    )
}


export default MoviesCardList;