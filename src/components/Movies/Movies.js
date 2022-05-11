import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import './main-content.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
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

export default Movies;