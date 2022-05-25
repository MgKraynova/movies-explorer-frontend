import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import {useEffect} from "react";

function SavedMovies({getAllSavedMovies, savedMoviesByUser, onDeleteMovie, setSavedMovies, isLoading}) {

    useEffect(() => {
        getAllSavedMovies();
    }, []);

    return (
        <>
            <Header headerStyles={'header header_background_white header_type_logged-in'} navigationType={'afterLoggedInMenu'} />
            <main className="main-content">
                <SearchForm isLoading={isLoading} savedMovies={savedMoviesByUser} setSavedMovies={setSavedMovies} />
                <MoviesCardList onDeleteMovie={onDeleteMovie} savedMovies={savedMoviesByUser} />
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;