import {useEffect} from "react";
import './popup.css';

function Popup({isOpen, type, onClose}) {
    const popupMessage = (type === 'delete')
        ? 'При удалении фильма на сервере произошла ошибка, пожалуйста, обновите страницу и попробуйте еще раз'
        : 'При сохранении карточки на сервере произошла ошибка, пожалуйста, обновите страницу и попробуйте еще раз';


    useEffect(() => {
        if (!isOpen) return;

        function closePopupByPressEsc(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', closePopupByPressEsc);

        return () => document.removeEventListener('keydown', closePopupByPressEsc);
    }, [isOpen, onClose])

    function handleOverlay(event) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return(
        <div onClick={handleOverlay} className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__content">
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}
                />
                <p className="popup__text">{popupMessage}</p>
            </div>
        </div>
    )
}

export default Popup;