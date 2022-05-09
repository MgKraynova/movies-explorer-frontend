import './button.css';

function Button({ButtonText, buttonSize}) {

    const buttonStyles = buttonSize === 'big' ? 'button button_size_big' : 'button button_size_small';

    return (
        <button type="submit" className={buttonStyles}>{ButtonText}</button>
    )
}

export default Button;