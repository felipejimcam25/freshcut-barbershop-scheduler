import '../styles/Content.css';

function ContentHead () {


    const hour = new Date().getHours();

    let greeting = "";

    if(hour >= 5 && hour < 12) {
        greeting = "Good Morning"
    } else if( hour >= 12 && hour < 18 ) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const username = localStorage.getItem('user'); 

    return(
        <div className="headContent container">
            <span className="greeting" > { greeting } </span>
            <span className='username'>Hello, { username }</span>
        </div>
    )
}

export default ContentHead;