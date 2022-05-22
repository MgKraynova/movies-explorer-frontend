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

function MoviesCardList({isLoading, isApiError, allMovies, onSaveMovie}) {

    // localStorage.clear(); //todo delete

    const windowWidth = useWindowWidth();

    const location = useLocation();

    const [content, setContent] = useState(null);
    const [numberOfMoviesAtPage, setNumberOfMoviesAtPage] = useState(12);
    const [numberOfAdditionalMovies, setNumberOfAdditionalMovies] = useState(3);
    const [movieList, setMovieList] = useState(null);
    const [isButtonShown, setIsButtonShown] = useState(false);

    const notFoundMessage = (<p className="movies__text">Ничего не найдено</p>);

    const apiErrorMessage = (<p className="movies__text">Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>);

    useEffect(() => {
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
    }, [windowWidth])

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

        if (JSON.parse(localStorage.getItem('movieList')) &&
            JSON.parse(localStorage.getItem('isMovieListButtonMoreShown'))) {

            setContent(<ul className="movies__list list">
                {JSON.parse(localStorage.getItem('movieList')).map((movie) => {
                    return <MoviesCard onSaveMovie={onSaveMovie} key={movie.id} movie={movie}/>
                })}
            </ul>);

            setIsButtonShown(JSON.parse(localStorage.getItem('isMovieListButtonMoreShown')));
        } else if (allMovies) {

            if (allMovies.length === 0) {
                setContent(notFoundMessage);
                return;
            }

            setContent(null);

            setContent(<ul className="movies__list list">
                {allMovies.slice(0, numberOfMoviesAtPage).map((movie) => {
                    return <MoviesCard onSaveMovie={onSaveMovie} key={movie.id} movie={movie}/>
                })}
            </ul>);

            localStorage.setItem('movieList', JSON.stringify(allMovies.slice(0, numberOfMoviesAtPage)));

            setIsButtonShown(true);

            localStorage.setItem('isMovieListButtonMoreShown', JSON.stringify(isButtonShown));

            setNumberOfMoviesAtPage(numberOfMoviesAtPage + numberOfAdditionalMovies);
        }
    }, [allMovies, windowWidth]);

    useEffect(() => {
        if (allMovies) {
            setMovieList(allMovies.slice(0, numberOfMoviesAtPage));
        }
    }, [numberOfMoviesAtPage]);

    function handleButtonClick() {
        setNumberOfMoviesAtPage(numberOfMoviesAtPage + numberOfAdditionalMovies);

        if (movieList && movieList.length > 0) {
            console.log('запускаем отрисовку новых карточек');
            const movieListElement = <ul className="movies__list list">
                {movieList.map((movie) => {
                    return <MoviesCard onSaveMovie={onSaveMovie} key={movie.id} movie={movie}/>
                })}
            </ul>;

            setContent(movieListElement);

            localStorage.setItem('movieList', JSON.stringify(movieList));
        }

        if (allMovies && numberOfMoviesAtPage >  allMovies.length) {
            setIsButtonShown(false);

            localStorage.setItem('isMovieListButtonMoreShown', JSON.stringify(isButtonShown));
        }
    }

        return (
            <section className="movies">
                {content}
                {location.pathname === "/movies"
                    && isButtonShown
                    && <button type="button" onClick={handleButtonClick} className="movies__button">Еще</button>}
            </section>
        )
    }



export default MoviesCardList;