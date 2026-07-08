import Logo from '../assets/images/Logo.png';
import NotificationIcon from './icons/NotificationIcon';

import '../styles/Header.css'
import LogoutIcon from './icons/LogoutIcon';
import { logout } from '../services/authService';
import { removeItem } from '../utils/LocalStorage';
import useAppNavigate from '../hooks/useNavigate';


function Header() {
    const { goToLogin } = useAppNavigate();
    
    const handleLogout = async () => {

        try {
            await logout();
        } catch (err) {
            console.log(err);
        } finally {
            removeItem('token');
            removeItem('user');
            removeItem('userID');
            goToLogin();
        }

    }

    return (
        <header className='headerPage'>
            <div className="brand">
                <img src={Logo} alt="Logo FreshCut" className='logoHeader' />
                <span className='brandName'>FreshCut</span>
            </div>

            <div className="options">
                <NotificationIcon />
                <button onClick={handleLogout}><LogoutIcon /></button>
            </div>

        </header>
    )
}

export default Header;