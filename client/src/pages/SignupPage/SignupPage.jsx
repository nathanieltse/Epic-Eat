import { Component } from 'react';
import error from '../../assets/icons/error.svg'
import check from '../../assets/icons/check.svg'
import checkValid from '../../assets/icons/check-valid.svg'
import {Link} from 'react-router-dom'
import './SignupPage.scss'

class SignupPage extends Component{
    state={
        userName:"",
        password:"",
        confirm:"",
        firstName: "",
        lastName: "",
        phone:"",
        email:"",
        passwordCharacter:false,
        passwordNum:false,
        passwordLetter:false,
        passwordconfirm:false,
        userNameInput:true,
        passwordInput:true,
        confirmInput:true,
        firstNameInput:true,
        lastNameInput:true,
        phoneInput:true,
        emailInput:true,
    }

    handleChange = async(e) => {
        await this.setState({[e.target.name]:e.target.value})
        this.isPasswordValid()
        this.isPasswordMatch()
    }

    isPasswordValid = () => {
        if(this.state.password.length >= 8) {
            this.setState({passwordCharacter:true}) 
        } else {
            this.setState({passwordCharacter:false}) 
        }
        const numRegex = new RegExp("^(?=.*[0-9])")
        const letterRegex = new RegExp("^(?=.*[a-z])|(?=.*[A-Z])")

        if(letterRegex.test(this.state.password)) {
            this.setState({passwordLetter:true}) 
        } else {
            this.setState({passwordLetter:false}) 
        }

        if(numRegex.test(this.state.password)) {
            this.setState({passwordNum:true}) 
        } else {
            this.setState({passwordNum:false}) 
        }
        
    }

    isPasswordMatch = () =>{
        if(this.state.password === this.state.confirm) {
            this.setState({passwordconfirm:true})
        } else {
            this.setState({passwordconfirm:false})
        }
    }

    render() {
        const{
                userName, password, confirm, firstName, lastName, phone, email, 
                passwordCharacter,passwordNum,passwordLetter,passwordconfirm, 
                userNameInput, passwordInput, confirmInput, firstNameInput, lastNameInput, phoneInput, emailInput
            } = this.state
        return(
            <section className="SignupPage">
                <form className="SignupPage__form">
                <h1 className="SignupPage__form-title">Sign Up</h1>
                    <label className="SignupPage__form-label" htmlFor="userName">
                        <input 
                            name="userName" 
                            className={userNameInput ? "SignupPage__input" :"SignupPage__input SignupPage__input--error" }
                            placeholder="Username" 
                            value={userName}
                            onChange={(e) => this.handleChange(e)}/>
                        {/* <div className="SignupPage__form-message">
                            <img className="SignupPage__form-message-icon" src={error}/>
                            <p className="SignupPage__form-message-text">username already exsist</p>
                        </div> */}
                    </label>
                    <label className="SignupPage__form-label" htmlFor="password">
                        <input 
                        type="password"
                        name="password" 
                        className={passwordInput ? "SignupPage__input" :"SignupPage__input SignupPage__input--error" }
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => this.handleChange(e)}/>
                        <div className="SignupPage__form-validate">
                            <img className="SignupPage__form-validate-icon" src={passwordCharacter ? checkValid : check} alt="check icon"/>
                            <p className={passwordCharacter ? "SignupPage__form-validate-text SignupPage__form-validate-text--valid" : "SignupPage__form-validate-text"}>
                                At least 8 characters
                            </p>
                        </div>
                        <div className="SignupPage__form-validate">
                            <img className="SignupPage__form-validate-icon" src={passwordNum ? checkValid : check} alt="check icon"/>
                            <p className={passwordNum ? "SignupPage__form-validate-text SignupPage__form-validate-text--valid" : "SignupPage__form-validate-text"}>
                                Consist of numbers
                            </p>
                        </div>
                        <div className="SignupPage__form-validate">
                            <img className="SignupPage__form-validate-icon" src={passwordLetter ? checkValid : check} alt="check icon"/>
                            <p className={passwordLetter ? "SignupPage__form-validate-text SignupPage__form-validate-text--valid" : "SignupPage__form-validate-text"}>
                                Consist of letters
                            </p>
                        </div>
                    </label>
                    <label className="SignupPage__form-label" htmlFor="confirm">
                        <input 
                        type="password"
                        name="confirm" 
                        className={confirmInput ? "SignupPage__input" :"SignupPage__input SignupPage__input--error" }
                        placeholder="Confirm password" 
                        value={confirm}
                        onChange={(e) => this.handleChange(e)}/>
                        <div className="SignupPage__form-validate">
                            <img className="SignupPage__form-validate-icon" src={passwordconfirm ? checkValid : check} alt="check icon"/>
                            <p className={passwordconfirm ? "SignupPage__form-validate-text SignupPage__form-validate-text--valid" : "SignupPage__form-validate-text"}>
                                Password matching
                            </p>
                        </div>
                    </label>
                    <label className="SignupPage__form-label" htmlFor="fistName">
                        
                        <input 
                        name="firstName" 
                        className="SignupPage__input"
                        placeholder="First name" 
                        value={firstName}
                        onChange={(e) => this.handleChange(e)}/>
                    </label>
                    <label className="SignupPage__form-label" htmlFor="lastName">
                        <input 
                        name="lastName" 
                        className="SignupPage__input"
                        placeholder="Last name" 
                        value={lastName}
                        onChange={(e) => this.handleChange(e)}/>
                    </label>
                    <label className="SignupPage__form-label" htmlFor="email">
                        <input 
                        name="email" 
                        className="SignupPage__input"
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => this.handleChange(e)}/>
                    </label>
                    <label className="SignupPage__form-label" htmlFor="phone">
                        <input 
                        name="phone" 
                        className="SignupPage__input"
                        placeholder="Phone number" 
                        value={phone}
                        onChange={(e) => this.handleChange(e)}/>
                    </label>
                    
                    <div className="SignupPage__btn-container">
                        <Link to="/" className="SignupPage__back-btn">Back</Link>
                        <button type="submit" className="SignupPage__signup-btn" >Sign up</button>
                    </div>
                </form>
            </section>
        )
    }
}

export default SignupPage