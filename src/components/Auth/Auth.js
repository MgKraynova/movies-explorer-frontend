import Header from "../Header/Header";
import './Auth.css';

function Auth({title, ButtonText, children, caption, authFormStyle}) {
    return (
        <div className="auth">
            <Header headerStyles={'header header_background_white header_type_auth-page'} />
            <main className="auth__content">
                <h1 className="auth__title">{title}</h1>
                <form className={authFormStyle} >
                    <fieldset className="auth__fieldset">
                        {children}
                    </fieldset>
                    <div className="auth__wrapper">
                        <button type="submit" className="auth__button">{ButtonText}</button>
                        {/*todo заменить кнопку на компонент*/}
                        {caption}
                    </div>
                </form>
            </main>
        </div>
    )
}

export default Auth;