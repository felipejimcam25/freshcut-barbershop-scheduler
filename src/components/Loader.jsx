import '../styles/Loader.css'

export default function Loader ({ message }) {
    return (
        <div className="loaderContainer">
            <div class="loader"></div>
            <span>{ message }</span>
        </div>
    )
}