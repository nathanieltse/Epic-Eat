import RestaurantCard from "../../components/RestaurantCard/RestaurantCard"
import arrow from '../../assets/icons/arrow-down.svg'
import './RestaurantPage.scss'

const RestaurantPage = () => {
    return (
        <section className="RestaurantPage">
            <div className="RestaurantPage__header">
                <p className="RestaurantPage__header-text">88 wellesley street</p>
                <img className="RestaurantPage__header-icon" src={arrow} alt="arrow icon"/>
            </div>
            <RestaurantCard/>
            <RestaurantCard/>
            <RestaurantCard/>
            <RestaurantCard/>
            <RestaurantCard/>
            <RestaurantCard/>
        </section>
    )
}

export default RestaurantPage