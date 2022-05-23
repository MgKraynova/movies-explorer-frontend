import './Main.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Technology from "../Technology/Technology";
import StudentInfo from "../StudentInfo/StudentInfo";
import Portfolio from "../Portfolio/Portfolio";

function Main({loggedIn}) {
    return (
        <>
            <Header loggedIn={loggedIn} headerStyles={`header header_background_dark-blue ${loggedIn ? 'header_type_logged-in' : 'header_type_main-page'}`}
            navigationType={loggedIn ? 'afterLoggedInMenu' : 'mainPageMenu'}/>
            <main className="main">
                <Promo />
                <AboutProject />
                <Technology />
                <StudentInfo />
                <Portfolio />
            </main>
            <Footer />
        </>
    )
}

export default Main;