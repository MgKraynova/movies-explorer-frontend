import './search.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import FilterMovies from '../FilterMovies/FilterMovies';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import savedMovies from "../SavedMovies/SavedMovies";

function SearchForm({onSubmitSearch, isLoading, setFilteredMovies, allMovies, setSavedMovies, savedMovies}) {

    const [inputValidity, setInputValidity] = useState(false);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [inputValue, setInputValue] = useState(localStorage.getItem('searchRequest') || '');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(inputValidity);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/movies') {
            if (localStorage.getItem('searchRequest')) {
                setInputValue(localStorage.getItem('searchRequest'));
            }

            if (JSON.parse(localStorage.getItem('isCheckboxChecked'))) {
                setIsCheckboxChecked(JSON.parse(localStorage.getItem('isCheckboxChecked')));
            }
        }

        if (location.pathname === '/saved-movies') {
            setInputValue('');
            setIsCheckboxChecked(false);

            if (inputValue.length === 0) {
                setIsErrorShown(true);
            }
        }
    }, []);

    useEffect(() => {
        if (location.pathname === '/movies')
            updateLocalStorage();
    }, [isCheckboxChecked]);

    useEffect(() => {
        if (localStorage.getItem('allMovies') && location.pathname === '/movies') {
            const moviesAfterFiltration = FilterMovies(JSON.parse(localStorage.getItem('allMovies')),
                inputValue, isCheckboxChecked);
            if (!(moviesAfterFiltration === undefined)) {
                localStorage.setItem('filteredMovies', JSON.stringify(moviesAfterFiltration));
                setFilteredMovies(moviesAfterFiltration);
            }
        }
    }, [allMovies, isCheckboxChecked]);

    useEffect(() => {
        if (location.pathname === '/saved-movies' && localStorage.getItem('savedMovies')) {
            const moviesAfterFiltration = FilterMovies(JSON.parse(localStorage.getItem('savedMovies')),
                inputValue, isCheckboxChecked);
            if (!(moviesAfterFiltration === undefined)) {
                localStorage.setItem('filteredMovies', JSON.stringify(moviesAfterFiltration));
                setSavedMovies(moviesAfterFiltration);
            }
        }
    }, [isCheckboxChecked]);

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

        if (location.pathname === '/movies') {
            if (localStorage.getItem('allMovies')) {
                const moviesAfterFiltration = FilterMovies(JSON.parse(localStorage.getItem('allMovies')),
                    inputValue, isCheckboxChecked);
                console.log('isCheckboxChecked', isCheckboxChecked, 'moviesAfterFiltration',
                    moviesAfterFiltration, 'inputValue', inputValue.length);
                if (!(moviesAfterFiltration === undefined)) {
                    localStorage.setItem('filteredMovies', JSON.stringify(moviesAfterFiltration));
                    setFilteredMovies(moviesAfterFiltration);
                }
            }
        }

        // if (location.pathname === '/saved-movies') {
        //     if (savedMovies) {
        //         const moviesAfterFiltration = FilterMovies(JSON.parse(localStorage.getItem('savedMovies')),
        //             inputValue, isCheckboxChecked);
        //         console.log('isCheckboxChecked', isCheckboxChecked, 'moviesAfterFiltration',
        //             moviesAfterFiltration, 'inputValue', inputValue);
        //
        //         if (!(moviesAfterFiltration === undefined)) {
        //             setSavedMovies(moviesAfterFiltration);
        //         }
        //     }
        // }
    }

    function updateLocalStorage() {
        localStorage.setItem('searchRequest', inputValue);
        localStorage.setItem('isCheckboxChecked', JSON.stringify(isCheckboxChecked));

        localStorage.removeItem('movieList');
        localStorage.removeItem('isMovieListButtonMoreShown');
    }

    function handleSubmitForm(event) {
        event.preventDefault();

        if (inputValidity && !isErrorShown && location.pathname === '/movies') {

            updateLocalStorage();

            if (localStorage.getItem('allMovies')) {
                const moviesAfterFiltration = FilterMovies(JSON.parse(localStorage.getItem('allMovies')),
                    inputValue, isCheckboxChecked);
                localStorage.setItem('filteredMovies', JSON.stringify(moviesAfterFiltration));
                setFilteredMovies(moviesAfterFiltration);
            } else {
                onSubmitSearch();
            }
        }

        if (location.pathname === '/saved-movies') {

            if (savedMovies) {
                const moviesAfterFiltration = FilterMovies(JSON.parse(localStorage.getItem('savedMovies')),
                    inputValue, isCheckboxChecked);
                console.log('isCheckboxChecked', isCheckboxChecked, 'moviesAfterFiltration',
                    moviesAfterFiltration, 'inputValue', inputValue);

                if (!(moviesAfterFiltration === undefined)) {
                    setSavedMovies(moviesAfterFiltration);
                }
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
                    disabled={isLoading}
                    value={inputValue}
                />
                <button disabled={(isLoading || isButtonDisabled)}
                        className={`search__button ${(isLoading || isButtonDisabled) && 'search__button_disabled'}`}
                        type="submit">Найти
                </button>
                <span className="search__error">{isErrorShown && 'Нужно ввести ключевое слово'}</span>
            </form>
            <div className="search__container">
                <FilterCheckbox handleCheckboxClick={handleCheckboxClick} isCheckboxChecked={isCheckboxChecked}/>
                <p className="search__text">Короткометражки</p>
            </div>
        </div>
    )
}

export default SearchForm;