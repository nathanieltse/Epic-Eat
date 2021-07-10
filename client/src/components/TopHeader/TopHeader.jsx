import locationIcon from '../../assets/icons/location.svg'
import './TopHeader.scss'


const TopHeader = ({location}) => {
    return(
        <div className="TopHeader">
                <h1 className="TopHeader__text">{location}</h1>
                <img className="TopHeader__icon" src={locationIcon} alt="location icon"/>
        </div>
    )
}

export default TopHeader