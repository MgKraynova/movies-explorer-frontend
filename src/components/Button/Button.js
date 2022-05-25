import './button.css';

function Button({ButtonText, buttonSize, isButtonDisabled}) {

    const buttonStyles = (`button 
    ${buttonSize === 'big' ? 'button_size_big' : 'button_size_small'}
    ${isButtonDisabled && 'button_disabled'}`);

    return (
        <button disabled={isButtonDisabled} type="submit" className={buttonStyles}>{ButtonText}</button>
    )
}

export default Button;