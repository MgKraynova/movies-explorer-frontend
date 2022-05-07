import {NavLink} from "react-router-dom";
import './account-button.css';
import '../Link/link.css';

function AccountButton({styles}) {
    return (
        <NavLink className={styles} to="/signin">Аккаунт</NavLink>
            // todo изменить роут
    )
}

export default AccountButton;