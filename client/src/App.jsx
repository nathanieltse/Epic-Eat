import NavBar from './components/NavBar/NavBar'
import RestaurantPage from './pages/RestaurantPage/RestaurantPage'
import RecommendationPage from './pages/RecommendationPage/RecommendationPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail'
import WelcomePage from './pages/WecomePage/WelcomePage'
import axios from 'axios'
import './App.scss'
import { Component } from 'react'

class App extends Component {
  state={
    onPage:"welcome",
    loggedIn:false,
    latitude:null,
    longitude:null,
    location:null,
    selected:null,
  }

  componentDidMount(){

    const getPosition = async() => {
      return new Promise((res,rej) =>{
        navigator.geolocation.getCurrentPosition(position => {
          return res(position)
        }, err => rej(err))
      }) 
    }
    getPosition().then(position => {
      const {latitude, longitude} = position.coords
      axios
        .get('/api/location',{
          params:{
            latitude:latitude,
            longitude:longitude
          }
        })
        .then(res => this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          location: res.data.split(",")[0]
        }))
        .catch(err => console.log(err))
    })
  }


  handlePageChange = (page) => {
    this.setState({onPage:page})
  }

  handleBack = () => {
      this.setState({selected:null})
  }

  handleSelect = (restaurant) => {
    this.setState({selected:restaurant})
  }
  

  render(){
    const {onPage, loggedIn,longitude, latitude, location, selected} = this.state
    return (
        <div className="App">
            {selected && <RestaurantDetail handleBack={this.handleBack} selected={selected}/>}

            {onPage === "welcome" && <WelcomePage/>}
            
            {onPage === "restaurants" && loggedIn && longitude && latitude && location ? 
            <RestaurantPage 
            location={location} 
            latitude={latitude} 
            longitude={longitude}
            selected={selected}
            handleSelect={this.handleSelect}/>
            :
            onPage === "restaurants" && loggedIn && <RestaurantPage
              location={location} 
              latitude={latitude} 
              longitude={longitude}/>
            }
            
            {onPage === "recommends" && loggedIn && longitude && latitude && location && <RecommendationPage
              latitude={latitude} 
              longitude={longitude}/>}

            {onPage === "profile" && loggedIn && <ProfilePage/>}
            
            
          
          
          {loggedIn && <NavBar onPage={onPage} handlePageChange={this.handlePageChange}/>}
        </div>
    )
  }
}

export default App;
