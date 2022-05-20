import Auth from "../Auth/Auth";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function Login({onLoginUser}) {

    const [email, setEmail] = useState('');
    const [emailInputValidity, setEmailInputValidity] = useState(false);
    const [showEmailInputError, setShowEmailInputError] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordInputValidity, setPasswordInputValidity] = useState(false);
    const [showPasswordInputError, setShowPasswordInputError] = useState(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {

        if (passwordInputValidity && emailInputValidity) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }

    }, [emailInputValidity, passwordInputValidity]);

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

        console.log('отправляем на апи', email, password);
        onLoginUser(email, password);
    }

    return (
        <Auth title={'Рады видеть!'} ButtonText={'Войти'}
              caption={<p className="auth__text">Ещё не зарегистрированы?&nbsp;
                  <Link className="auth__link link" to="/signup">Регистрация</Link>
              </p>}
              authFormStyle={'auth__form auth__form_type_login'}
              isButtonDisabled={isButtonDisabled}
              onSubmit={handleSubmit}
        >
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
                />
                <span className="auth__input-error">{showPasswordInputError
                    ? 'Пароль должен содержать от 2 до 12 символов'
                    : ''}</span>
            </label>
        </Auth>
    )
}

export default Login;