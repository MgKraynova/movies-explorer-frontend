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

function MoviesCardList({isLoading, isApiError, allMovies, onSaveMovie, onDeleteMovie, savedMovies, filteredMovies}) {

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
        setNumberOfMoviesAtPageAndNumberOfAdditionalMovies();
    }, [windowWidth]);

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

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem('allMovies') && !filteredMovies) {
            console.log('запустили useEffect');
            renderMovieCards(JSON.parse(localStorage.getItem('allMovies')));
        }
    }, [])

    useEffect(() => {
        if (location.pathname === '/saved-movies' && savedMovies) {
            setContent(<ul className="movies__list list">
                {renderMovieCards(savedMovies)}
            </ul>);
        }
    }, [savedMovies, location.pathname]);

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
        if (filteredMovies && filteredMovies.length > 0) {
            setNumberOfMoviesAtPageAndNumberOfAdditionalMovies();
            if (numberOfMoviesAtPage > filteredMovies.length) {
                setIsButtonShown(false);
            } else {
                setIsButtonShown(true);
            }
            console.log('filteredMovies', filteredMovies);
            setContent(<ul className="movies__list list">
                {renderMovieCards(filteredMovies)}
            </ul>);

        } else if (filteredMovies && filteredMovies.length === 0) {
            setContent(notFoundMessage);
        }
    }, [filteredMovies]);

    useEffect(() => {
        if (location.pathname === "/movies") {
            if (allMovies && allMovies.length > 0 && !filteredMovies) {
                console.log('numberOfMoviesAtPage', numberOfMoviesAtPage);

                setContent(<ul className="movies__list list">
                    {renderMovieCards(allMovies)}
                </ul>);

                setIsButtonShown(true);
                setNumberOfMoviesAtPage(numberOfMoviesAtPage + numberOfAdditionalMovies);
            } else if (allMovies && allMovies.length === 0) {
                setContent(notFoundMessage);

                // setContent(null);
                //
                // setContent(<ul className="movies__list list">
                //     {allMovies.slice(0, numberOfMoviesAtPage).map((movie) => {
                //         return <MoviesCard savedMovies={savedMovies} onDeleteMovie={onDeleteMovie}
                //                            onSaveMovie={onSaveMovie} key={movie.id} movie={movie}/>
                //     })}
                // </ul>);
                //
                // localStorage.setItem('movieList', JSON.stringify(allMovies.slice(0, numberOfMoviesAtPage)));
                //
                // setIsButtonShown(true);
                //
                // localStorage.setItem('isMovieListButtonMoreShown', JSON.stringify(isButtonShown));
                //
                // setNumberOfMoviesAtPage(numberOfMoviesAtPage + numberOfAdditionalMovies);
            }
        }
    }, [allMovies, windowWidth]);

    useEffect(() => {
        if (location.pathname === "/movies") {
            if (allMovies && !filteredMovies) {
                setMovieList(allMovies.slice(0, numberOfMoviesAtPage));
            }
        }
    }, [numberOfMoviesAtPage]);

    function renderMovieCards(arrayOfMovies) {
        return (
            <>
                {
                    arrayOfMovies.slice(0, numberOfMoviesAtPage).map((movie) => {
                        return <MoviesCard savedMovies={savedMovies} onDeleteMovie={onDeleteMovie}
                                           onSaveMovie={onSaveMovie} key={movie.id} movie={movie}/>
                    })
                }
            </>
        )
    }

    function handleButtonClick() {
        if (location.pathname === "/movies") {
            setNumberOfMoviesAtPage(numberOfMoviesAtPage + numberOfAdditionalMovies);

            if (movieList && movieList.length > 0) {
                console.log('запускаем отрисовку новых карточек');
                const movieListElement = <ul className="movies__list list">
                    {renderMovieCards(movieList)}
                </ul>;

                setContent(movieListElement);

                localStorage.setItem('movieList', JSON.stringify(movieList));
            }

            if (allMovies && numberOfMoviesAtPage > allMovies.length) {
                setIsButtonShown(false);

                localStorage.setItem('isMovieListButtonMoreShown', JSON.stringify(isButtonShown));
            }
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