import {Navigate} from "react-router-dom";

function ProtectedRoute(props) {
    if (!localStorage.getItem('token')) {
        return (
            <Navigate to="/signin" />
        );
    }

    return props.children;
}

export default ProtectedRoute;