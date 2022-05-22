import {useState, useContext, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import './profile.css';
import Button from "../Button/Button";
import '../Link/link.css';
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({setLoggedIn, setCurrentUser, onUpdateUser, isErrorOnUpdateProfile, setIsErrorOnUpdateProfile, setAllMovies,
setSavedMovies}) {

    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isApiErrorShown, setIsApiErrorShown] = useState(false);

    const [email, setEmail] = useState('');
    const [emailInputValidity, setEmailInputValidity] = useState(false);
    const [showEmailInputError, setShowEmailInputError] = useState(false);

    const [name, setName] = useState('');
    const [nameInputValidity, setNameInputValidity] = useState(false);
    const [showNameInputError, setShowNameInputError] = useState(false);

    const navigate = useNavigate();

    const currentUser = useContext(CurrentUserContext);

    const nameInputErrorText = nameInputValidity ? 'Нужно ввести новое имя'
        : 'Введите от 2 до 12 знаков латиницы, кириллицы, пробела или дефиса';
    const emailInputErrorText = emailInputValidity ? 'Нужно ввести новый email' : 'Введите новый корректный email';

    useEffect(() => {
        setName(currentUser.name || '');
        setEmail(currentUser.email || '');
    }, [currentUser]);

    useEffect(() => {

        if (isErrorOnUpdateProfile) {
            setIsApiErrorShown(true);
            setIsEditModeOn(true);
            setIsButtonDisabled(true);
        } else {
            setIsApiErrorShown(false);
        }
    }, [isErrorOnUpdateProfile]);

    useEffect(() => {

        if (nameInputValidity && emailInputValidity && !(name === currentUser.name) && !(email === currentUser.email)) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }

    }, [email, name]);

    function handleNameInputChange(event) {
        setIsApiErrorShown(false);
        setName(event.target.value);
        setNameInputValidity(event.target.validity.valid);

        if (!event.target.validity.valid || currentUser.name === event.target.value) {
            setShowNameInputError(true);
        } else {
            setShowNameInputError(false);
        }
    }

    function handleEmailInputChange(event) {
        setIsApiErrorShown(false);
        setEmail(event.target.value);
        setEmailInputValidity(event.target.validity.valid);

        if (!event.target.validity.valid || currentUser.email === event.target.value) {
            setShowEmailInputError(true);
        } else {
            setShowEmailInputError(false);
        }
    }

    function handleEditButton() {
        setIsEditModeOn(true);
    }

    function handleSubmitButtonClick(e) {
        e.preventDefault();
        onUpdateUser(name, email);
        setIsEditModeOn(false);
    }

    function signOut() {
        setLoggedIn(false);
        setCurrentUser({});
        setAllMovies(null);
        setSavedMovies(null);
        localStorage.clear();
        navigate('/');
    }

    const profileLinks = (<><button onClick={handleEditButton} type="button"
                                           className="profile__link profile__link_type_ordinary">Редактировать</button>
        <Link to="/" type="button" onClick={signOut} className="profile__link link profile__link_type_stressed">Выйти из аккаунта</Link>
    </>)


    const profileButton = (<><span className="profile__error">{isApiErrorShown && 'При обновлении профиля произошла ошибка. Попробуйте еще раз'}</span>
        <Button isButtonDisabled={isButtonDisabled} ButtonText={'Сохранить'} buttonSize={'big'} />
    </>)

    return (
        <>
            <Header headerStyles={'header header_background_white header_type_logged-in'}
                    navigationType={'afterLoggedInMenu'}/>
            <main className="profile">
                <h1 className="profile__title">Привет, {currentUser.name}</h1>
                <form className="profile__form" onSubmit={handleSubmitButtonClick} >
                    <fieldset className="profile__fieldset">
                        <label className="profile__label">
                            <p className="profile__input-caption">Имя</p>
                            <input
                                className="profile__input"
                                type="text"
                                required
                                name="name"
                                pattern="[a-zA-Zа-яА-ЯёЁ\-\s]+"
                                autoComplete="on"
                                minLength="2"
                                maxLength="15"
                                value={name}
                                disabled={!isEditModeOn}
                                onChange={handleNameInputChange}
                            />
                            <span className="profile__input-error">{showNameInputError
                                ? nameInputErrorText
                                : ''}</span>
                        </label>
                        <label className="profile__label">
                            <p className="profile__input-caption">Почта</p>
                            <input
                                className="profile__input"
                                type="email"
                                required
                                name="email"
                                autoComplete="on"
                                pattern="[0-9a-zA-Z_\\-\\]+@[0-9a-zA-Z_\\-\\]+\.[a-zA-Z]+"
                                minLength="2"
                                value={email}
                                disabled={!isEditModeOn}
                                onChange={handleEmailInputChange}
                            />
                            <span className="profile__input-error">{showEmailInputError ? emailInputErrorText : ''}</span>
                        </label>
                    </fieldset>

                    <div className="profile__wrapper">
                        {isEditModeOn ? profileButton : profileLinks}
                    </div>
                </form>
            </main>
        </>
    )
}

export default Profile;