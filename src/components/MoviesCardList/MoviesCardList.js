import {useLocation} from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import './movies.css';
import Preloader from "../Preloader/Preloader";
import {useEffect, useState, useLayoutEffect} from "react";

function MoviesCardList({isLoading, isApiError, allMovies}) {

    localStorage.clear(); //todo delete

    const location = useLocation();

    const [content, setContent] = useState(null);
    const [numberOfMoviesAtPage, setNumberOfMoviesAtPage] = useState(3);
    const [movieList, setMovieList] = useState(null);
    const [isButtonShown, setIsButtonShown] = useState(false);

    const notFoundMessage = (<p className="movies__text">Ничего не найдено</p>);

    const apiErrorMessage = (<p className="movies__text">Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>);

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
        if (allMovies) {
            if (allMovies.length === 0) {
                setContent(notFoundMessage);
                return;
            }

            setContent(<ul className="movies__list list">
                {allMovies.slice(numberOfMoviesAtPage - 3, numberOfMoviesAtPage).map((movie) => {
                    return <MoviesCard key={movie.id} movie={movie}/>
                })}
            </ul>);

            setIsButtonShown(true);

            setNumberOfMoviesAtPage(numberOfMoviesAtPage + 3);
        }
    }, [allMovies]);

    useEffect(() => {
        if (allMovies) {
            setMovieList(allMovies.slice(0, numberOfMoviesAtPage));
        }
    }, [numberOfMoviesAtPage]);

    function handleButtonClick() {
        setNumberOfMoviesAtPage(numberOfMoviesAtPage + 3);
        console.log('click');
        console.log('numberOfMoviesAtPage', numberOfMoviesAtPage);
        console.log('movieList', movieList);


        if (movieList && movieList.length > 0) {
            console.log('запускаем movieList', movieList);
            const movieListElement = <ul className="movies__list list">
                {movieList.map((movie) => {
                    return <MoviesCard key={movie.id} movie={movie}/>
                })}
            </ul>;

            setContent(movieListElement);
        }

        if (numberOfMoviesAtPage >  allMovies.length) {
            setIsButtonShown(false);
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