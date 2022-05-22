import './search.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import FilterMovies from '../FilterMovies/FilterMovies';
import {useEffect, useState} from "react";

function SearchForm({onSubmitSearch, isLoading, setFilteredMovies}) {

    const [inputValidity, setInputValidity] = useState(false);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(inputValidity);

    useEffect(() => {
        if (localStorage.getItem('searchRequest')) {
            setInputValue(localStorage.getItem('searchRequest'));
        }

        if (JSON.parse(localStorage.getItem('isCheckboxChecked'))) {
            setIsCheckboxChecked(JSON.parse(localStorage.getItem('isCheckboxChecked')));
        }
    }, [])

    function handleInputChange(event) {
        setInputValue(event.target.value);
        setInputValidity(event.target.validity.valid);

        if (!event.target.validity.valid || event.target.value.length < 2) {
            setIsErrorShown(true);
            setIsButtonDisabled(true);
        } else {
            setIsErrorShown(false);
            setIsButtonDisabled(false);
        }
    }

    function handleCheckboxClick() {
        setIsCheckboxChecked(!isCheckboxChecked);
        localStorage.setItem('isCheckboxChecked', JSON.stringify(!isCheckboxChecked));
    }

    function handleSubmitForm(event) {
        event.preventDefault();

        if (inputValidity && !isErrorShown) {

            localStorage.setItem('searchRequest', inputValue);
            localStorage.setItem('isCheckboxChecked', JSON.stringify(isCheckboxChecked));

            localStorage.removeItem('movieList');
            localStorage.removeItem('isMovieListButtonMoreShown');

            if (localStorage.getItem('allMovies')) {
                const moviesAfterFiltration = FilterMovies(JSON.parse(localStorage.getItem('allMovies')),
                    inputValue, isCheckboxChecked);
                setFilteredMovies(moviesAfterFiltration);
            } else {
                onSubmitSearch();
            }
             // todo Не выполняются лишние запросы к бэкенду, например:
            // запрос всех фильмов с сервиса beatfilm-movies производится только при первом поиске;
        }
    }

    return (
        <div className="search">
            <form className="search__form" onSubmit={handleSubmitForm} noValidate={true}>
                <input
                className="search__input"
                placeholder="Фильм"
                type="text"
                onChange={handleInputChange}
                disabled={isLoading}
                value={inputValue}
                />
                <button disabled={(isLoading || isButtonDisabled)} className={`search__button ${(isLoading || isButtonDisabled) && 'search__button_disabled'}`} type="submit">Найти</button>
                <span className="search__error">{isErrorShown && 'Нужно ввести ключевое слово'}</span>
            </form>
            <div className="search__container">
                <FilterCheckbox handleCheckboxClick={handleCheckboxClick} isCheckboxChecked={isCheckboxChecked} />
                <p className="search__text">Короткометражки</p>
            </div>
        </div>
    )
}

export default SearchForm;