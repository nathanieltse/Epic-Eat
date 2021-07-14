import greeting from '../../assets/animation/lf30_editor_q5izwk4x.json'
import Lottie from 'react-lottie'
import error from '../../assets/icons/error.svg'
import {Link} from 'react-router-dom'
import'./WelcomePage.scss'
import { Component } from 'react'
import axios from 'axios'

class WelcomePage extends Component {
    state={
        userName:"",
        password:"",
        invalid:false
    }

    greetingAni = {
        loop: false,
        autoplay: true,
        animationData: greeting,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        }
    }

    signin = (e) =>{
        e.preventDefault()
        axios
            .post('/api/login',{
                userName:this.state.userName,
                password:this.state.password
            })
            .then(res=>{
                localStorage.setItem("usertoken", res.data.authToken)
                this.props.handlelogin()
            })
            .catch(err=> {
                this.setState({invalid:true})
            })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value, invalid:false})
    }

    render(){
        const {userName, password, invalid} = this.state
        
        return (
                <section className="WelcomePage">
                    <div className="WelcomePage__ani">
                        <Lottie  options={this.greetingAni} height={400} width={400}/>
                    </div>
                    <div className="WelcomePage__container">
                        <form className="WelcomePage__form" onSubmit={(e) => this.signin(e)}>
                            <h1 className="WelcomePage__form-title">Sign In</h1>
                            <label className="WelcomePage__form-label" htmlFor="userName">
                                <input 
                                    name="userName" 
                                    className={invalid ? "WelcomePage__input WelcomePage__input--error" :"WelcomePage__input" }
                                    placeholder="Username" 
                                    value={userName}
                                    onChange={(e) => this.handleChange(e)}/>
                                {invalid && 
                                <div className="WelcomePage__form-message">
                                    <img className="WelcomePage__form-message-icon" src={error} alt="error icon"/>
                                    <p className="WelcomePage__form-message-text">account info invalid</p>
                                </div>}
                            </label>
                            <label className="WelcomePage__form-label" htmlFor="password">
                                <input 
                                    name="password" 
                                    type="password" 
                                    className={invalid ? "WelcomePage__input WelcomePage__input--error" :"WelcomePage__input" }
                                    placeholder="password" 
                                    value={password}
                                    onChange={(e) => this.handleChange(e)}/>
                                {invalid && 
                                <div className="WelcomePage__form-message">
                                    <img className="WelcomePage__form-message-icon" src={error} alt="error icon"/>
                                    <p className="WelcomePage__form-message-text">account info invalid</p>
                                </div>}
                            </label>
                            <h4 className="WelcomePage__text">Forget password?</h4>
                            <div className="WelcomePage__btn-container">
                                <Link to="/signup" className="WelcomePage__signup-btn">Sign Up</Link>
                                <button type="submit" className="WelcomePage__login-btn" >Log In</button>
                            </div>
                        </form>
                        
                    </div>
                </section>
        )
    }
}

export default WelcomePage