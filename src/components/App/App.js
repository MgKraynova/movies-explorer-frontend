import {Route, Routes, useNavigate} from 'react-router-dom';
import Main from "../Main/Main";
import Register from '../Register/Register';
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import {useState} from "react";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [isApiError, setIsApiError] = useState(false);
    const [allMovies, setAllMovies] = useState(null);

    const navigate = useNavigate();

    function handleApiError(err) {
        console.log('Запрос не выполнен: ', err);
        setIsApiError(true);
    } //todo мб улучшить

    function getAllMoviesFromApi() {
        setIsApiError(false);
        setIsLoading(true);

        moviesApi.getAllMovies()
            .then((res) => {
                if (res) {
                    localStorage.setItem('allMovies', JSON.stringify(res));
                    setAllMovies(res);
                }
            })
            .catch((err) => {
                handleApiError(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleRegisterUser(name, email, password) {
        mainApi.registerNewUser(name, email, password)
            .then((res) => {
                console.log('получили ответ от сервера', res);
                navigate('/movies');
            })
            .catch((err) => {
                handleApiError(err);
                // todo ошибки д отображаться на стр.
            })
    }


    return (
        <>
            <Routes>
                <Route index path="/" element={<Main />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register onRegisterUser={handleRegisterUser} />} />
                <Route path="/movies" element={<Movies onSubmitSearch={getAllMoviesFromApi} isLoading={isLoading}
                                                       isApiError={isApiError} allMovies={allMovies} />} />
                <Route path="/saved-movies" element={<SavedMovies />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/*<Footer />*/}



        </>
    )

}

export default App;
