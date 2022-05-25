import {Link} from "react-router-dom";
import Auth from "../Auth/Auth";
import {useEffect, useState} from "react";

function Register({onRegisterUser, isErrorOnRegister, setIsErrorOnRegister, isLoading}) {

    const [email, setEmail] = useState('');
    const [emailInputValidity, setEmailInputValidity] = useState(false);
    const [showEmailInputError, setShowEmailInputError] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordInputValidity, setPasswordInputValidity] = useState(false);
    const [showPasswordInputError, setShowPasswordInputError] = useState(false);

    const [name, setName] = useState('');
    const [nameInputValidity, setNameInputValidity] = useState(false);
    const [showNameInputError, setShowNameInputError] = useState(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const authCaption = (<p className="auth__text">Уже зарегистрированы?&nbsp;
        <Link className="auth__link link" to="/signin">Войти</Link>
    </p>);

    useEffect(() => {
        setIsErrorOnRegister(false);
    }, []);

    useEffect(() => {
        if (isLoading) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }, [isLoading]);

    useEffect(() => {
        if (passwordInputValidity && nameInputValidity && emailInputValidity) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }

        setIsErrorOnRegister(false);
    }, [email, password, name]);

    function handleNameInputChange(event) {
        setName(event.target.value);
        setNameInputValidity(event.target.validity.valid);

        if (!event.target.validity.valid) {
            setShowNameInputError(true);
        } else {
            setShowNameInputError(false);
        }
    }

    function handleEmailInputChange(event) {
        setEmail(event.target.value);
        setEmailInputValidity(event.target.validity.valid);

        if (!event.target.validity.valid) {
            setShowEmailInputError(true);
        } else {
            setShowEmailInputError(false);
        }
    }

    function handlePasswordInputChange(event) {
        setPassword(event.target.value);
        setPasswordInputValidity(event.target.validity.valid);

        if (!event.target.validity.valid) {
            setShowPasswordInputError(true);
        } else {
            setShowPasswordInputError(false);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        onRegisterUser(name, email, password);
    }

    return (
        <Auth title={'Добро пожаловать!'}
              ButtonText={'Зарегистрироваться'}
              caption={authCaption}
              authFormStyle={'auth__form auth__form_type_register'}
              isButtonDisabled={isButtonDisabled}
              onSubmit={handleSubmit} isErrorOnRegister={isErrorOnRegister}
        >
            <label className="auth__label">
                <p className="auth__input-caption">Имя</p>
                <input
                    className="auth__input"
                    type="text"
                    required
                    name="name"
                    pattern="[a-zA-Zа-яА-ЯёЁ\-\s]+"
                    autoComplete="on"
                    minLength="2"
                    maxLength="15"
                    placeholder="Имя"
                    onChange={handleNameInputChange}
                    disabled={isLoading}
                />
                <span className="auth__input-error">{showNameInputError
                    ? 'Имя должно содержать от 2 до 12 символов из латиницы, кириллицы, пробела или дефиса'
                    : ''}</span>
            </label>
            <label className="auth__label">
                <p className="auth__input-caption">E-mail</p>
                <input
                    className="auth__input"
                    type="email"
                    pattern="[0-9a-zA-Z_\\-\\]+@[0-9a-zA-Z_\\-\\]+\.[a-zA-Z]+"
                    required
                    name="email"
                    autoComplete="on"
                    placeholder="E-mail"
                    onChange={handleEmailInputChange}
                    disabled={isLoading}
                />
                <span className="auth__input-error">{showEmailInputError ? 'Введите корректный email' : ''}</span>
            </label>
            <label className="auth__label">
                <p className="auth__input-caption">Пароль</p>
                <input
                    className="auth__input"
                    type="password"
                    minLength="2"
                    maxLength="12"
                    required
                    name="password"
                    autoComplete="on"
                    placeholder="Пароль"
                    onChange={handlePasswordInputChange}
                    disabled={isLoading}
                />
                <span className="auth__input-error">{showPasswordInputError
                    ? 'Пароль должен содержать от 2 до 12 символов'
                    : ''}</span>
            </label>
        </Auth>
    )
}

export default Register;