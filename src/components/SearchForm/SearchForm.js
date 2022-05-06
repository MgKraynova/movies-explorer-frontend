import './search.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return(
        <div className="search">
            <form className="search__form">
                <input
                className="search__input"
                placeholder="Фильм"
                required
                type="text"
                minLength="1"
                />
                <button className="search__button" type="submit">Найти</button>
            </form>
            <div className="search__container">
                <FilterCheckbox />
                <p className="search__text">Короткометражки</p>
            </div>
        </div>
    )
}

export default SearchForm;