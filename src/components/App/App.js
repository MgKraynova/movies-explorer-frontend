import {useState, useEffect} from "react";
import {Route, Routes, useNavigate} from 'react-router-dom';

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Main from "../Main/Main";
import Register from '../Register/Register';
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [isApiError, setIsApiError] = useState(false);
    const [allMovies, setAllMovies] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    console.log('currentUser', currentUser);
    console.log('loggedIn', loggedIn);

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        if (!loggedIn) {
            return;
        }

        mainApi.updateTokenInHeaders();

        mainApi.getUserInfo()
            .then(setCurrentUser)
            .catch((err) => {
                handleApiError(err);
            });
    }, [loggedIn]);

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
                setCurrentUser(res); // todo строки email, name, _id

                mainApi.loginUser(email, password)
                    .then((res) => {
                        if (res.token) {
                            localStorage.setItem('token', res.token);
                            console.log('получили ответ', res);
                            console.log('получили токен', res.token);
                            setLoggedIn(true);
                            navigate('/movies');
                        }
                    })
                    .catch((err) => {
                        handleApiError(err);
                    })
            })
            .catch((err) => {
                handleApiError(err);
                // todo ошибки д отображаться на стр.
            })
    }

    function handleLoginUser(email, password) {
        mainApi.loginUser(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    console.log('получили ответ', res);
                    console.log('получили токен', res.token);
                    setLoggedIn(true);
                    navigate('/movies');
                }
            })
            .catch((err) => {
                handleApiError(err);
            })
    }

    function checkToken() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');

            mainApi.updateTokenInHeaders();

            mainApi.getUserInfo()
                .then((res) => {
                    setLoggedIn(true);
                    setCurrentUser(res);
                })
                .catch((err) => {
                    handleApiError(err);
                });
        }
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
        <Routes>
                    <Route index path="/" element={<Main />} />
                    <Route path="/signin" element={<Login onLoginUser={handleLoginUser} />} />
                    <Route path="/signup" element={<Register onRegisterUser={handleRegisterUser} />} />
                    <Route path="/movies" element={<Movies onSubmitSearch={getAllMoviesFromApi} isLoading={isLoading}
                                                           isApiError={isApiError} allMovies={allMovies} />} />
                    <Route path="/saved-movies" element={<SavedMovies />} />
                    <Route path="/profile" element={<Profile setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                {/*<Footer />*/}
                {/*//todo delete*/}
        </CurrentUserContext.Provider>
    )

}

export default App;
