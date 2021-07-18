import { useState } from 'react'
import locationIcon from '../../assets/icons/location.svg'
import './TopHeader.scss'


const TopHeader = ({location}) => {
    const [expandform, setExpandform] = useState(true)
    const [formInput, setFormInput] = useState("")
    return(
        <section className="TopHeader">
                <div className="TopHeader__header">
                    <h1 className="TopHeader__header-text">{location}</h1>
                    <img className="TopHeader__header-icon" src={locationIcon} alt="location icon"/>
                </div>
                {expandform &&
                    <div className="TopHeader__body">
                        <h1 className="TopHeader__body-title">Search</h1>
                        <h4 className="TopHeader__body-subtitle">Add city name to get more accurate result.</h4>
                        <form className="TopHeader__form">
                            <input className="TopHeader__form-input" value={formInput}/>
                            <button className="TopHeader__form-submit">Search</button>
                        </form>
                    </div>
                }
        </section>
    )
}

export default TopHeader