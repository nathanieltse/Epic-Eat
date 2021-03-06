import axios from 'axios'
import { useState } from 'react'
import Lottie from 'react-lottie'
import check from'../../assets/animation/check.json'
import locationIcon from '../../assets/icons/location.svg'
import search from '../../assets/icons/search.svg'
import './TopHeader.scss'


const TopHeader = ({location, handleLocationUpdate, resetRestaurantList}) => {
    const [expandform, setExpandform] = useState(false)
    const [formInput, setFormInput] = useState("")
    const [formValid, setFormValid] = useState(true)
    const [btnSuccess, setBtnSuccess] = useState(false)
    const [showcheck, setShowcheck] = useState(false)

    const changeLocation = (e) => {
        e.preventDefault()
        axios
            .post('/api/location/search',{
                userSearch:formInput
            })
            .then(res => {
                resetRestaurantList()
                setFormValid(true)
                setBtnSuccess(true)
                setTimeout(() => {
                    handleLocationUpdate(res.data.center, res.data.place_name) 
                    setShowcheck(true)
                }, 800);
                setTimeout(() => {
                    setBtnSuccess(false)
                    setShowcheck(false)
                }, 4000);
            })
            .catch(err => {
                setFormValid(false)
            })
    }

    const checkAni = {
        loop: false,
        autoplay: true,
        animationData: check,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        }
    }

    return(
        <section className="TopHeader">
                <div className="TopHeader__header" onClick={()=>setExpandform(true)}>
                    <div className="TopHeader__header-text">
                        <h1 className={location ? "TopHeader__header-title" : "TopHeader__header-title--loading"}>{location || "Searching for places"}</h1>
                        {!location && <p className="TopHeader__header-subtitle">enable location sharing to see nearby restaurants</p>}
                    </div>
                    <img className="TopHeader__header-icon" src={locationIcon} alt="location icon"/>
                </div>
                {expandform &&
                    <div className="TopHeader__body">
                        <svg 
                            className="TopHeader__body-close-btn" 
                            width="24" 
                            height="24" 
                            fill="none"
                            onClick={()=>setExpandform(false)}>
                            <path d="M13.4 12L19.7 5.7C20.1 5.3 20.1 4.7 19.7 4.3C19.3 3.9 18.7 3.9 18.3 4.3L12 10.6L5.7 4.3C5.3 3.9 4.7 3.9 4.3 4.3C3.9 4.7 3.9 5.3 4.3 5.7L10.6 12L4.3 18.3C4.1 18.5 4 18.7 4 19C4 19.6 4.4 20 5 20C5.3 20 5.5 19.9 5.7 19.7L12 13.4L18.3 19.7C18.5 19.9 18.7 20 19 20C19.3 20 19.5 19.9 19.7 19.7C20.1 19.3 20.1 18.7 19.7 18.3L13.4 12Z" fill="black"/>
                        </svg>
                        <h1 className="TopHeader__body-title">Search</h1>
                        <h4 className="TopHeader__body-subtitle">Add city, province or country to get more accurate result</h4>
                        <form className="TopHeader__form" onSubmit={(e) => changeLocation(e)}>
                            <img className="TopHeader__form-icon" src={search} alt="search icon"/>
                            <input 
                                name="address"
                                className={formValid ? "TopHeader__form-input" : "TopHeader__form-input TopHeader__form-input--invalid" }
                                value={formInput}
                                onChange={(e)=>setFormInput(e.target.value)}/>
                            {!formValid && <p className="TopHeader__form-message">Unable to find the address, try search for nearby intersaction</p>}
                            {btnSuccess ? 
                                <button className="TopHeader__form-submit TopHeader__form-submit--success">
                                        {showcheck &&
                                            <div className="TopHeader__form-submit-check">
                                                <Lottie options={checkAni} height={80} width={70}/>
                                            </div>
                                        }
                                </button>
                                :
                                <button className="TopHeader__form-submit">
                                    Change location
                                </button>
                            }
                        </form>
                    </div>
                }
        </section>
    )
}

export default TopHeader