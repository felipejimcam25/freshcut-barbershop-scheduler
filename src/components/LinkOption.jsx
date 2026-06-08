import { NavLink } from "react-router-dom";

function LinkOption ( { text, icon, link } ) {
    console.log(icon);
    
    return (
        <NavLink className={({ isActive }) => 
            isActive ? 'navLink active' : "navLink"
        } 
        to={link}>
            <div className="icon">
                { icon }
            </div>
            <span>{text}</span>
        </NavLink>
    )
}

export default LinkOption;