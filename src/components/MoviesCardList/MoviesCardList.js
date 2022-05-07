import MoviesCard from "../MoviesCard/MoviesCard";
import './movies.css';

function MoviesCardList() {
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
                {/*<MoviesCard />*/}
            </ul>
            <button type="button" className="movies__button">Еще</button>
        </section>
    )
}

export default MoviesCardList;