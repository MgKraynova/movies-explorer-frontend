import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import './profile.css';
import Button from "../Button/Button";
import '../Link/link.css';
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({setLoggedIn, setCurrentUser}) {

    const [isEditModeOn, setIsEditModeOn] = useState(false);

    const navigate = useNavigate();

    const currentUser = useContext(CurrentUserContext);

    function handleEditButton() {
        setIsEditModeOn(true);
    }

    function handleSubmitButtonClick(e) {
        e.preventDefault();
        setIsEditModeOn(false);
    }

    function signOut() {
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
        navigate('/');
    }

    const profileLinks = (<><button onClick={handleEditButton} type="button"
                                           className="profile__link profile__link_type_ordinary">Редактировать</button>
        <Link to="/" type="button" onClick={signOut} className="profile__link link profile__link_type_stressed">Выйти из аккаунта</Link>
    </>)


    const profileButton = (<><span className="profile__error">При обновлении профиля произошла ошибка.</span>
        <Button ButtonText={'Сохранить'} buttonSize={'big'} />
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
                                autoComplete="on"
                                minLength="2"
                                maxLength="15"
                                value={currentUser.name || ''}
                                disabled={!isEditModeOn}
                            />
                        </label>
                        <label className="profile__label">
                            <p className="profile__input-caption">Почта</p>
                            <input
                                className="profile__input"
                                type="email"
                                required
                                name="email"
                                autoComplete="on"
                                minLength="2"
                                value={currentUser.email || ''}
                                disabled={!isEditModeOn}
                            />
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