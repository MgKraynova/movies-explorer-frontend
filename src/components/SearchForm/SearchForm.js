import './search.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useState} from "react";

function SearchForm({onSubmitSearch, isLoading}) {

    const [inputValidity, setInputValidity] = useState(false);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    function handleInputChange(event) {
        setInputValue(event.target.value);
        setIsErrorShown(false);
        setInputValidity(event.target.validity.valid);
    }

    function handleCheckboxClick() {
        setIsCheckboxChecked(!isCheckboxChecked);
    }

    function handleSubmitForm(event) {
        event.preventDefault();

        if (!inputValidity || inputValue.length === 0) {
            setIsErrorShown(true);
        } else {
            setIsErrorShown(false);

            localStorage.setItem('searchRequest', inputValue);
            localStorage.setItem('isCheckboxChecked', isCheckboxChecked.toString());

            if (!localStorage.getItem('allMovies')) {
                onSubmitSearch();
            }
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
                disabled={isLoading ? true : false}
                />
                <button className="search__button" type="submit">Найти</button>
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