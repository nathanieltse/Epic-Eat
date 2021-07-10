
import './NavBar.scss'


const NavBar = ({onPage, handlePageChange}) => {
    return(
        <nav className="NavBar">
            <div 
                className={onPage === "restaurants" ? "NavBar__item NavBar__item--selected" : "NavBar__item"}
                onClick={() => handlePageChange("restaurants")}>
                <svg 
                    className={onPage === "restaurants" ? "NavBar__icon NavBar__icon--selected" : "NavBar__icon"} 
                    viewBox="0 0 24 24" fill="#000000">
                     <g><path d="M0,0h24 M24,24H0" fill="none"/>
                     <path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/>
                     <path d="M0,0h24v24H0V0z" fill="none"/></g>
                </svg>
                <p className={onPage === "restaurants" ? "NavBar__text NavBar__text--selected" : "NavBar__text"}>Restaurants</p>
            </div>
            <div 
                className={onPage === "recommends" ? "NavBar__item NavBar__item--selected" : "NavBar__item"}
                onClick={() => handlePageChange("recommends")}>
                <svg 
                    className={onPage === "recommends" ? "NavBar__icon NavBar__icon--selected" : "NavBar__icon"}
                    viewBox="0 0 24 24" fill="#000000">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                </svg>
                <p className={onPage === "recommends" ? "NavBar__text NavBar__text--selected" : "NavBar__text"}>Recommends</p>
            </div>
            <div 
                className={onPage === "profile" ? "NavBar__item NavBar__item--selected" : "NavBar__item"}
                onClick={() => handlePageChange("profile")}>
                <svg 
                    className={onPage === "profile" ? "NavBar__icon NavBar__icon--selected" : "NavBar__icon"} 
                    viewBox="0 0 24 24" fill="#000000">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <p className={onPage === "profile" ? "NavBar__text NavBar__text--selected" : "NavBar__text"}>Profile</p>
            </div>

        </nav>
    )
}

export default NavBar