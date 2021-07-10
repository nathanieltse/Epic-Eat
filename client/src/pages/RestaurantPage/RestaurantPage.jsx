import RestaurantCard from "../../components/RestaurantCard/RestaurantCard"
import arrow from '../../assets/icons/arrow-down.svg'
import './RestaurantPage.scss'
import { Component } from "react"

class RestaurantPage extends Component {

    render(){
        return (
            <section className="RestaurantPage">
                <div className="RestaurantPage__header">
                    <p className="RestaurantPage__header-text">{this.props.location ? this.props.location : "location private"}</p>
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
}

export default RestaurantPage