import {Route, Routes} from 'react-router-dom';
import Main from "../Main/Main";
import Register from '../Register/Register';
import Footer from "../Footer/Footer";
import Login from "../Login/Login";

function App() {
    return (
        <>
            <Routes>
                <Route index path="/" element={<Main />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />

                {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
            {/*<Footer />*/}



        </>
    )

}

export default App;
