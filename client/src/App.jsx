import NavBar from './components/NavBar/NavBar'
import RestaurantPage from './pages/RestaurantPage/RestaurantPage'
import RecommendationPage from './pages/RecommendationPage/RecommendationPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail'
import WelcomePage from './pages/WecomePage/WelcomePage'
import PageFooter from './components/PageFooter/PageFooter'
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.scss'
import { Component } from 'react'

class App extends Component {
  state={
    onPage:"recommends",
    loggedIn:true,
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


  handleNavChange = (page) => {
    this.setState({onPage:page})
  }

  handleModalBack = () => {
      this.setState({selected:null})
  }

  handleSelect = (restaurant) => {
    this.setState({selected:restaurant})
  }
  

  render(){
    const {onPage, loggedIn,longitude, latitude, location, selected} = this.state
    return (
        <div className="App">
          <BrowserRouter>
            {selected && <RestaurantDetail handleModalBack={this.handleModalBack} selected={selected}/>}
            <Switch>

              <Route exact path="/" component={WelcomePage}/>

              <Route path="/restaurants" render={()=>{
                return <RestaurantPage
                  location={location} 
                  latitude={latitude} 
                  longitude={longitude}
                  selected={selected}
                  handleSelect={this.handleSelect}
                  />
                }}/>

              <Route path="/recommends" render={(routeProps) => {
                return <RecommendationPage
                latitude={latitude} 
                longitude={longitude}
                {...routeProps}/>
              }}/>

              <Route path="/profile" render={(routeProps) => {
                return <ProfilePage {...routeProps}/>
              }}/>
              
            </Switch>
            
            {loggedIn && <NavBar onPage={onPage} handleNavChange={this.handleNavChange}/>}
            {!selected && <PageFooter/>}
          </BrowserRouter>
        </div>
    )
  }
}

export default App;
