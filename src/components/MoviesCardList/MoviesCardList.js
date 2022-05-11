import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import './movies.css';

function MoviesCardList() {

    const location = useLocation();

    return (
        <section className="movies">
            <ul className="movies__list list">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </ul>
            {location.pathname === "/movies" && <button type="button" className="movies__button">Еще</button>}
        </section>
    )
}

export default MoviesCardList;