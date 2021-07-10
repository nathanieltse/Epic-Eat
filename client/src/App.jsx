import NavBar from './components/NavBar/NavBar'
import RestaurantPage from './pages/RestaurantPage/RestaurantPage'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import axios from 'axios'
import './App.scss'
import { Component } from 'react'

class App extends Component {
  state={
    onPage:"recommends",
    latitude:null,
    longitude:null,
    location:null
  }

  componentDidMount(){

    // async function getLocation() {
    //   let position = await navigator.geolocation.getCurrentPosition((position) => position)
    //   console.log(position)
    //   
    // }
    // getLocation()

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

  render(){

    return (
      <BrowserRouter>
        <div className="App">
          <RestaurantPage location={this.state.location}/>
          <NavBar onPage={this.state.onPage} handlePageChange={this.handlePageChange}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
