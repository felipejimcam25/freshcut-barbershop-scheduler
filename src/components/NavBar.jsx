import '../styles/NavBar.css'
import LinkOption from "./LinkOption";
import BookIcon from "./icons/BookIcon";
import DashboardIcon from '../components/icons/DashboardIcon'
import LoyaltyIcon from './icons/LoyaltyIcon';
import ProfileIcon from './icons/ProfileIcon';

function NavBar () {


    return (
        <nav className="navContainer">
            <ul className="navigation">
                {/* BOOK OPTION LINK */}
                <li>
                    <LinkOption 
                        text="Dashboard" 
                        icon={<DashboardIcon/>} 
                        link="/dashboard"
                    />
                </li>
                {/* BOOK OPTION LINK */}
                <li>
                    <LinkOption 
                        text="Book" 
                        icon={<BookIcon/>} 
                        link="/book"
                    />
                </li>
                {/* LOYALTY LINK OPTION */}
                <li>
                    <LinkOption 
                        text="Loyalty" 
                        icon={<LoyaltyIcon/>} 
                        link="/loyalty"
                    />
                </li>
                {/* PROFILE LINK OPTION */}
                <li>
                    <LinkOption 
                        text="Profile" 
                        icon={<ProfileIcon/>} 
                        link="/profile"
                    />
                </li>
            </ul>
        </nav>
    )

}

export default NavBar;