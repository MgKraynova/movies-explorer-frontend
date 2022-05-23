import {Navigate} from "react-router-dom";

function RedirectToMoviesIfLoggedIn(props) {
    if (localStorage.getItem('token')) {
        return (
            <Navigate to="/movies" />
        );
    }

    return props.children;
}

export default RedirectToMoviesIfLoggedIn;