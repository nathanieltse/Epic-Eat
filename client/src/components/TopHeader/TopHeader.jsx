import arrow from '../../assets/icons/arrow-down.svg'
import './TopHeader.scss'


const TopHeader = ({location}) => {
    return(
        <div className="TopHeader">
                <p className="TopHeader__text">{location}</p>
                <img className="TopHeader__icon" src={arrow} alt="arrow icon"/>
        </div>
    )
}

export default TopHeader