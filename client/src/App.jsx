import NavBar from './components/NavBar/NavBar'
import RestaurantPage from './pages/RestaurantPage/RestaurantPage'
import RecommendationPage from './pages/RecommendationPage/RecommendationPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail'
import WelcomePage from './pages/WecomePage/WelcomePage'
import SignupPage from './pages/SignupPage/SignupPage'
import PageFooter from './components/PageFooter/PageFooter'
import axios from 'axios'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import './App.scss'
import { Component } from 'react'

class App extends Component {
  state={
    onPage:"restaurants",
    loggedIn:false,
    latitude:null,
    longitude:null,
    location:null,
    selected:null,
    userInfo:null
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
    
    const userInfo = localStorage.getItem("usertoken")
    this.setState({            
      userInfo: userInfo,
      loggedIn: userInfo ? true : false})

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

  handlelogin = () =>{
    const userInfo = localStorage.getItem("usertoken")
    this.setState({loggedIn:true, userInfo:userInfo})
  }

  handleLogout = () => {
    localStorage.removeItem("usertoken")
    this.setState({loggedIn:false, userInfo:null})
  }
  

  render(){
    const {onPage, loggedIn,longitude, latitude, location, selected, userInfo} = this.state
    return (
        <div className="App">
          <BrowserRouter>
            {selected && <RestaurantDetail handleModalBack={this.handleModalBack} selected={selected}/>}
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
              
              {loggedIn &&  <Route path="/restaurants" render={()=>{
                return <RestaurantPage
                  location={location} 
                  latitude={latitude} 
                  longitude={longitude}
                  selected={selected}
                  handleSelect={this.handleSelect}
                  />
                }}/>}

              {loggedIn && <Route path="/recommends" render={(routeProps) => {
                return <RecommendationPage
                latitude={latitude} 
                longitude={longitude}
                {...routeProps}/>
              }}/>}

              <Route path="/profile">
                {loggedIn ?  
                  <ProfilePage userInfo={userInfo} handleLogout={this.handleLogout}/>
                  :
                  <Redirect to="/" />
                }
              </Route>

              
            </Switch>
            
            {loggedIn && <NavBar onPage={onPage} handleNavChange={this.handleNavChange}/>}
          </BrowserRouter>
        </div>
    )
  }
}

export default App;
