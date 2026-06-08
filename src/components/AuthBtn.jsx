import '../styles/AuthBtn.css'

import ArrowRightIcon from './icons/ArrowRight';

function AuthBtn ({ text }) {

    return (
        <button className="authBtn">
            { text }
            <span><ArrowRightIcon /> </span>
        </button>
    )

}

export default AuthBtn;