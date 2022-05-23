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

import ProtectedRoute from "../../utils/ProtectedRoute";
import RedirectToMoviesIfLoggedIn from "../../utils/RedirectToMoviesIfLoggedIn";

function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [isApiError, setIsApiError] = useState(false);
    const [allMovies, setAllMovies] = useState(null);
    const [savedMovies, setSavedMovies] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || null);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const [isErrorOnUpdateProfile, setIsErrorOnUpdateProfile] = useState(false);
    const [isSuccessOnUpdateProfile, setIsSuccessOnUpdateProfile] = useState(false);

    const [isErrorOnLogin, setIsErrorOnLogin] = useState(false);
    const [isErrorOnRegister, setIsErrorOnRegister] = useState(false);

    const navigate = useNavigate();

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
                    getAllSavedMovies();
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
                setIsErrorOnRegister(true);
            })
    }

    function handleLoginUser(email, password) {
        mainApi.loginUser(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    setLoggedIn(true);
                    navigate('/movies');
                }
            })
            .catch((err) => {
                handleApiError(err);
                setIsErrorOnLogin(true);
            })
    }

    function checkToken() {
        if (localStorage.getItem('token')) {
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

    function handleUpdateUser(name, email) {
        mainApi.updateUserInfo(name, email)
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
                console.log(err);
                setIsErrorOnUpdateProfile(true);
                console.log('IsErrorOnUpdateProfile', isErrorOnUpdateProfile);
                handleApiError(err);
            })
            .finally(() => {
                setIsSuccessOnUpdateProfile(true);
            })
    }

    function handleSaveMovie(country, director, duration, year, description, image, trailerLink, thumbnail,
                             movieId, nameRU, nameEN) {
        mainApi.saveMovie(country, director, duration, year, description, image, trailerLink, thumbnail,
            movieId, nameRU, nameEN)
            .then((res) => {
                console.log('получили данные movie', res);
                getAllSavedMovies();
            })
            .catch((err) => {
                handleApiError(err);
            })
    }

    function handleDeleteMovie(id) {
        mainApi.deleteMovie(id)
            .then((res) => {
                console.log('удалили movie', res);
                getAllSavedMovies();
            })
            .catch((err) => {
                handleApiError(err);
            })
    }

    function getAllSavedMovies() {

        mainApi.updateTokenInHeaders();

        mainApi.getAllSavedMovies()
            .then((res) => {
                setSavedMovies(res);
                localStorage.setItem('savedMovies', JSON.stringify(res));
            })
            .catch((err) => {
                handleApiError(err);
            })
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Routes>
                <Route index path="/" element={<Main loggedIn={loggedIn}/>}/>
                <Route path="/signin" element={
                    <RedirectToMoviesIfLoggedIn>
                        <Login isErrorOnLogin={isErrorOnLogin} setIsErrorOnLogin={setIsErrorOnLogin} onLoginUser={handleLoginUser}/>
                    </RedirectToMoviesIfLoggedIn>
                }/>
                <Route path="/signup" element={
                    <RedirectToMoviesIfLoggedIn>
                        <Register setIsErrorOnRegister={setIsErrorOnRegister}
                                  isErrorOnRegister={isErrorOnRegister} onRegisterUser={handleRegisterUser}/>
                    </RedirectToMoviesIfLoggedIn>
                }/>
                <Route path="/movies" element={
                    <ProtectedRoute>
                        <Movies onSubmitSearch={getAllMoviesFromApi} isLoading={isLoading}
                                isApiError={isApiError} allMovies={allMovies}
                                onSaveMovie={handleSaveMovie} onDeleteMovie={handleDeleteMovie}
                                setFilteredMovies={setFilteredMovies} filteredMovies={filteredMovies}
                        />
                    </ProtectedRoute>}/>
                <Route path="/saved-movies" element={
                    <ProtectedRoute>
                        <SavedMovies onDeleteMovie={handleDeleteMovie} savedMoviesByUser={savedMovies}
                                     getAllSavedMovies={getAllSavedMovies} setSavedMovies={setSavedMovies}/>
                    </ProtectedRoute>}/>
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile setIsErrorOnUpdateProfile={setIsErrorOnUpdateProfile}
                                 isErrorOnUpdateProfile={isErrorOnUpdateProfile}
                                 onUpdateUser={handleUpdateUser} setLoggedIn={setLoggedIn}
                                 setCurrentUser={setCurrentUser} setAllMovies={setAllMovies}
                                 setSavedMovies={setSavedMovies}
                                 setFilteredMovies={setFilteredMovies}
                                 isSuccessOnUpdateProfile={isSuccessOnUpdateProfile}
                                 setIsSuccessOnUpdateProfile={setIsSuccessOnUpdateProfile}
                        />
                    </ProtectedRoute>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </CurrentUserContext.Provider>
    )

}

export default App;
