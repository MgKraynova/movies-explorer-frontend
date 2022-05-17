import Header from "../Header/Header";
import './Auth.css';
import Button from "../Button/Button";

function Auth({title, ButtonText, children, caption, authFormStyle, isButtonDisabled, onSubmit}) {
    return (
        <div className="auth">
            <Header headerStyles={'header header_background_white header_type_auth-page'} />
            <main className="auth__content">
                <h1 className="auth__title">{title}</h1>
                <form className={authFormStyle} onSubmit={onSubmit}>
                    <fieldset className="auth__fieldset">
                        {children}
                    </fieldset>
                    <div className="auth__wrapper">
                        <Button isButtonDisabled={isButtonDisabled} buttonSize={'small'} ButtonText={ButtonText} />
                        {caption}
                    </div>
                </form>
            </main>
        </div>
    )
}

export default Auth;