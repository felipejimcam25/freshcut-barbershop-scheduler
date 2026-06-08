import PlusIcon from "./icons/PlusIcon";
import '../styles/BookBtn.css'
import useAppNavigate from "../hooks/useNavigate";

export default function QuickBookButton () {
    const { goToBook } = useAppNavigate();
    const handleClick = () => {

        goToBook();
        
    }
    return (
        <div className="container">
            <button className="bookBtn" onClick={handleClick}>
                <PlusIcon />
                <span>Quick Book New Cut</span>
            </button>
        </div>
    )
}