import {Link} from 'react-router-dom'
import './NavBar.scss'


const NavBar = ({onPage}) => {
    return(
        <nav className="NavBar">
            <Link 
                to="/restaurants"
                className={onPage === "restaurants" ? "NavBar__item NavBar__item--selected" : "NavBar__item"}>
                <svg 
                    className={onPage === "restaurants" ? "NavBar__icon NavBar__icon--selected" : "NavBar__icon"} 
                    viewBox="0 0 24 24" fill="#000000">
                    <g><rect fill="none"/></g><g><g/><g>
                        <path d="M21.9,8.89l-1.05-4.37c-0.22-0.9-1-1.52-1.91-1.52H5.05C4.15,3,3.36,3.63,3.15,4.52L2.1,8.89 c-0.24,1.02-0.02,2.06,0.62,2.88C2.8,11.88,2.91,11.96,3,12.06V19c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.94 c0.09-0.09,0.2-0.18,0.28-0.28C21.92,10.96,22.15,9.91,21.9,8.89z M18.91,4.99l1.05,4.37c0.1,0.42,0.01,0.84-0.25,1.17 C19.57,10.71,19.27,11,18.77,11c-0.61,0-1.14-0.49-1.21-1.14L16.98,5L18.91,4.99z M13,5h1.96l0.54,4.52 c0.05,0.39-0.07,0.78-0.33,1.07C14.95,10.85,14.63,11,14.22,11C13.55,11,13,10.41,13,9.69V5z M8.49,9.52L9.04,5H11v4.69 C11,10.41,10.45,11,9.71,11c-0.34,0-0.65-0.15-0.89-0.41C8.57,10.3,8.45,9.91,8.49,9.52z M4.04,9.36L5.05,5h1.97L6.44,9.86 C6.36,10.51,5.84,11,5.23,11c-0.49,0-0.8-0.29-0.93-0.47C4.03,10.21,3.94,9.78,4.04,9.36z M5,19v-6.03C5.08,12.98,5.15,13,5.23,13 c0.87,0,1.66-0.36,2.24-0.95c0.6,0.6,1.4,0.95,2.31,0.95c0.87,0,1.65-0.36,2.23-0.93c0.59,0.57,1.39,0.93,2.29,0.93 c0.84,0,1.64-0.35,2.24-0.95c0.58,0.59,1.37,0.95,2.24,0.95c0.08,0,0.15-0.02,0.23-0.03V19H5z"/>
                    </g></g>
                </svg>
                <p className={onPage === "restaurants" ? "NavBar__text NavBar__text--selected" : "NavBar__text"}>Restaurants</p>
            </Link>
            <Link 
                to="/recommends"
                className={onPage === "recommends" ? "NavBar__item NavBar__item--selected" : "NavBar__item"}>
                <svg 
                    className={onPage === "recommends" ? "NavBar__icon NavBar__icon--selected" : "NavBar__icon"}
                    viewBox="0 0 24 24" fill="#000000">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                </svg>
                <p className={onPage === "recommends" ? "NavBar__text NavBar__text--selected" : "NavBar__text"}>Recommends</p>
            </Link>
            <Link 
                to="/profile"
                className={onPage === "profile" ? "NavBar__item NavBar__item--selected" : "NavBar__item"}>
                <svg 
                    className={onPage === "profile" ? "NavBar__icon NavBar__icon--selected" : "NavBar__icon"} 
                    viewBox="0 0 24 24" fill="#000000">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <p className={onPage === "profile" ? "NavBar__text NavBar__text--selected" : "NavBar__text"}>Profile</p>
            </Link>

        </nav>
    )
}

export default NavBar