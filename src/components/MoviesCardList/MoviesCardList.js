import {useLocation} from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import './movies.css';
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";

function MoviesCardList({isLoading, isApiError, allMovies}) {

    localStorage.clear(); //todo delete

    const location = useLocation();

    const [content, setContent] = useState(null);

    const notFoundMessage = (<p className="movies__text">Ничего не найдено</p>);

    const apiErrorMessage = (<p className="movies__text">Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>);

    useEffect(() => {
        setContent(null);
    }, []);

    useEffect(() => {
        if (allMovies) {
            if (allMovies.length === 0) {
                setContent(notFoundMessage);
                return;
            }

            const movieList = <ul className="movies__list list">
                {allMovies.slice(0, 3).map((movie) => {
                    return <MoviesCard key={movie.id} movie={movie}/>
                })
                }</ul>;

            setContent(movieList);
        } else if (isLoading) {
            setContent(<Preloader/>);
        } else if (isApiError) {
            setContent(apiErrorMessage);
        }
    }, [isLoading, allMovies, isApiError]);

    return (
        <section className="movies">
            {content}
            {location.pathname === "/movies"
                && !isLoading
                && allMovies
                && <button type="button" className="movies__button">Еще</button>}
        </section>
    )
}

export default MoviesCardList;