import NavBar from './components/NavBar/NavBar'
import RestaurantPage from './pages/RestaurantPage/RestaurantPage'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import './App.scss'
import { Component } from 'react'

class App extends Component {

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <RestaurantPage/>
          <NavBar/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
