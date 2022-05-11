import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies() {
    return (
        <>
            <Header headerStyles={'header header_background_white header_type_logged-in'} navigationType={'afterLoggedInMenu'} />
            <main className="main-content">
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;