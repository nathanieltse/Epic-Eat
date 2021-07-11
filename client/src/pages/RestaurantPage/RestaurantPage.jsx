import RestaurantCard from "../../components/RestaurantCard/RestaurantCard"
import axios from 'axios'
import TopHeader from "../../components/TopHeader/TopHeader"
import './RestaurantPage.scss'
import { Component } from "react"

class RestaurantPage extends Component {
    state={
        restaurants:null,
    }

    componentDidMount(){
        if(this.props.latitude){
            axios
                .get('/api/restaurants',{
                    params:{
                        latitude:this.props.latitude,
                        longitude:this.props.longitude
                    }
                })
                .then(res => {
                    this.setState({restaurants:res.data.businesses})
                })
                .catch(err => console.log(err))
        }
    }

    componentDidUpdate(prevProps){{
        if(prevProps !== this.props){
            return axios
                        .get('/api/restaurants',{
                            params:{
                                latitude:this.props.latitude,
                                longitude:this.props.longitude
                            }
                        })
                        .then(res => {
                            setTimeout(()=>{
                                this.setState({restaurants:res.data.businesses})
                            }, 3000)
                        })
                        .catch(err => console.log(err))
        }
    }}

    noScroll = () => {
        window.scrollTo(0, 0)
      }

    render(){
        let nearby =[]
        if(this.state.restaurants){ 
            nearby = this.state.restaurants.sort((a, b) => {
            return (a.distance - b.distance)
        })}

        return (
            <section className={this.props.selected ? "RestaurantPage RestaurantPage--popup" : "RestaurantPage"}>
                <TopHeader location={this.props.location}/>

                {this.state.restaurants ? 
                    nearby.map(restaurant => {
                        return <RestaurantCard 
                                key={restaurant.id} 
                                id={restaurant.id} 
                                image={restaurant.image_url} 
                                name={restaurant.name} 
                                distance={restaurant.distance} 
                                restaurant={restaurant}
                                handleSelect={this.props.handleSelect}/>
                    })
                    :
                    <>
                    <RestaurantCard/>
                    <RestaurantCard/>
                    <RestaurantCard/>
                    <RestaurantCard/>
                    <RestaurantCard/>
                    <RestaurantCard/>
                    <RestaurantCard/>
                    <RestaurantCard/>
                    </>
                }
                
            </section>
        )
    }
}

export default RestaurantPage