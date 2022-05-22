import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import {useEffect} from "react";

function SavedMovies({getAllSavedMovies, savedMovies, onDeleteMovie}) {

    useEffect(() => {
        getAllSavedMovies();
    }, []);

    return (
        <>
            <Header headerStyles={'header header_background_white header_type_logged-in'} navigationType={'afterLoggedInMenu'} />
            <main className="main-content">
                <SearchForm />
                <MoviesCardList onDeleteMovie={onDeleteMovie} savedMovies={savedMovies} />
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;