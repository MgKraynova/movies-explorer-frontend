import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import './movies.css';

function Movies() {
    return (
        <>
            <Header headerStyles={'header header_background_white header_type_logged-in'} navigationType={'afterLoggedInMenu'} />
            <main className="movies">
                <SearchForm />
            </main>
            <Footer />
        </>
    )
}

export default Movies;