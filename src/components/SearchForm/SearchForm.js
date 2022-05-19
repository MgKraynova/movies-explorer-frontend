import './search.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useEffect, useState} from "react";

function SearchForm({onSubmitSearch, isLoading}) {

    const [inputValidity, setInputValidity] = useState(false);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

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
        setIsErrorShown(false);
        setInputValidity(event.target.validity.valid);
    }

    function handleCheckboxClick() {
        setIsCheckboxChecked(!isCheckboxChecked);
        localStorage.setItem('isCheckboxChecked', JSON.stringify(!isCheckboxChecked));
    }

    function handleSubmitForm(event) {
        event.preventDefault();

        if (!inputValidity || inputValue.length === 0) {
            setIsErrorShown(true);
        } else {
            setIsErrorShown(false);

            localStorage.setItem('searchRequest', inputValue);
            localStorage.setItem('isCheckboxChecked', JSON.stringify(isCheckboxChecked));

            localStorage.removeItem('movieList');
            localStorage.removeItem('isMovieListButtonMoreShown');

            onSubmitSearch();
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
                <button disabled={isLoading} className={`search__button ${isLoading && 'search__button_disabled'}`} type="submit">Найти</button>
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