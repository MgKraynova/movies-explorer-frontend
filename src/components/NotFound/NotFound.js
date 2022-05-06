import {useNavigate} from "react-router-dom";
import './not-found.css';

function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="not-found">
            <div className="not-found__container">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__text">Страница не найдена</p>
            </div>
            <button onClick={() => {
                navigate(-1)
            }} className="not-found__button">Назад</button>
        </main>
    )
}

export default NotFound;