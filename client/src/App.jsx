import RestaurantPage from './pages/RestaurantPage/RestaurantPage'
import RecommendationPage from './pages/RecommendationPage/RecommendationPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail'
import WelcomePage from './pages/WecomePage/WelcomePage'
import SignupPage from './pages/SignupPage/SignupPage'
import axios from 'axios'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { Component } from 'react'
import './App.scss'


const userToken = sessionStorage.getItem("usertoken")

class App extends Component {
  state={
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
        .then(res => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: res.data.split(",")[0],
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

    axios
      .get('/api/user',{
        headers:{
          authorization:`bearer ${userToken}`
        }
      })
      .then(res => {
        this.setState({loggedIn:true})
        sessionStorage.setItem("userInfo",JSON.stringify(res.data[0]))
      })
      .catch(err => {
        this.setState({loggedIn:false})
      })
  }


  handleModalBack = () => {
      this.setState({selected:null})
  }

  handleSelect = (restaurant) => {
    this.setState({selected:restaurant})
  }

  handlelogin = () =>{

    axios
      .get('/api/user',{
        headers:{
          authorization:`bearer ${userToken}`
        }
      })
      .then(res => {
        sessionStorage.setItem("userInfo",JSON.stringify(res.data[0]))
        this.setState({loggedIn:true})
      })
      .catch(err => {
        this.setState({loggedIn:false})
      })
  }

  handleLogout = () => {
    sessionStorage.clear()
    this.setState({loggedIn:false})
  }

  handleInfoUpdate = () => {
    axios
      .get('/api/user',{
        headers:{
          authorization:`bearer ${userToken}`
        }
      })
      .then(res => {
        sessionStorage.setItem("userInfo",JSON.stringify(res.data[0]))
      })
      .catch(err => {
        this.setState({loggedIn:false})
      })
  }

  handleLocationUpdate = (geoCode, locationName) => {
    const location = locationName.split(",")[0]
    this.setState({
      latitude:geoCode[1],
      longitude:geoCode[0],
      location:location,
    })
  }

  

  render(){
    const {loggedIn,longitude, latitude, location, selected} = this.state
    return (
        <div className="App">
          <BrowserRouter>

              {selected && <RestaurantDetail 
                                handleModalBack={this.handleModalBack} 
                                id={selected.id} 
                                distance={selected.distance}/>}
            
            <Switch>

              <Route exact path="/"> 
                {loggedIn ?
                <Redirect to="/restaurants"/>
                :
                <WelcomePage handlelogin={this.handlelogin}/>}   
              </Route>

              <Route path="/signup">
                {loggedIn ?
                  <Redirect to="/restaurants"/>
                  :
                  <SignupPage handlelogin={this.handlelogin}/>
                }
              </Route> 

              <Route path="/restaurants">
                {loggedIn ?
                  <RestaurantPage
                  location={location} 
                  latitude={latitude} 
                  longitude={longitude}
                  selected={selected}
                  handleSelect={this.handleSelect}
                  handleLocationUpdate={this.handleLocationUpdate}
                  />
                  :
                  <Redirect to="/" />
                }
              </Route> 

              <Route path="/recommends">
                {loggedIn ?  
                  <RecommendationPage 
                    latitude={latitude} 
                    longitude={longitude}
                    handleSelect={this.handleSelect}
                    handleInfoUpdate={this.handleInfoUpdate}/>
                  :
                  <Redirect to="/" />
                }
              </Route>

              <Route path="/profile">
                {loggedIn ?  
                  <ProfilePage 
                    handleLogout={this.handleLogout} 
                    handleInfoUpdate={this.handleInfoUpdate}
                    handleSelect={this.handleSelect}/>
                  :
                  <Redirect to="/" />
                }
              </Route>

              
            </Switch>
            
          </BrowserRouter>
        </div>
    )
  }
}

export default App;
