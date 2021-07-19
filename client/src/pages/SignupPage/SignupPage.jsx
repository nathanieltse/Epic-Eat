import { Component } from 'react';
import check from '../../assets/icons/check.svg'
import checkValid from '../../assets/icons/check-valid.svg'
import {Link} from 'react-router-dom'
import './SignupPage.scss'
import axios from 'axios';

const numRegex = new RegExp("^(?=.*[0-9])")
const letterRegex = new RegExp("^(?=.*[a-z])|(?=.*[A-Z])")
const emailRegex = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
const phoneRegex = new RegExp (/^[+]?[1]?[- ]?[(]?[0-9]{3}[)]?[- ]?([0-9]{3})[- ]?([0-9]{4})$/)

class SignupPage extends Component {
    state={
        userName:"",
        password:"",
        confirm:"",
        firstName: "",
        lastName: "",
        email:"",
        phone:"",
        userNameValid:false,
        passwordCharacter:false,
        passwordNum:false,
        passwordLetter:false,
        passwordconfirm:false,
        firstNameCharacter:false,
        lastNameCharacter:false,
        emailValid:false,
        phoneValid:false,
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

        if (e.target.name === "userName" ) return this.isUserNameValid()
        if (e.target.name === "password" || e.target.name === "confirm"){
            this.isPasswordValid()
            this.isPasswordMatch()
            return }
        if (e.target.name === "firstName" ) return this.isfirstNameValid()
        if (e.target.name === "lastName" ) return this.islastNameValid()
        if (e.target.name === "email" )return this.isEmailValid()
        if (e.target.name === "phone" )return this.isPhoneValid()
    }

    isPasswordValid = () => {
        if(this.state.password.length >= 8) {
            this.setState({passwordCharacter:true}) 
        } else {
            this.setState({passwordCharacter:false}) 
        }

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

    isPasswordMatch = () => {
        if(this.state.password === this.state.confirm && this.state.password.length >= 8) {
            this.setState({passwordconfirm:true})
        } else {
            this.setState({passwordconfirm:false})
        }
    }

    isUserNameValid = () => {
        if(!this.state.userName.includes(' ') && this.state.userName.length > 0){
            axios
                .get('/api/checkusername',{
                    params:{
                        userName:this.state.userName,
                    }
                })
                .then(res=>{
                    this.setState({userNameValid:true})
                })
                .catch(err=> {
                    console.log(err.message)
                    this.setState({userNameValid:false})
                })    
        } else {
            this.setState({userNameValid:false})
        }
    }

    isfirstNameValid = () => {
        if (!this.state.firstName.includes(' ') && this.state.firstName.length > 0 && letterRegex.test(this.state.firstName) && !numRegex.test(this.state.firstName)){
            this.setState({firstNameCharacter:true})
            
        } else {
            this.setState({firstNameCharacter:false})
        }
    }

    islastNameValid = () => {
        if (!this.state.lastName.includes(' ') && this.state.lastName.length > 0 && letterRegex.test(this.state.lastName) && !numRegex.test(this.state.firstName)){
            this.setState({lastNameCharacter:true})
            
        } else {
            this.setState({lastNameCharacter:false})
        }
    }

    isEmailValid = () => {
        if (emailRegex.test(this.state.email)){
            this.setState({emailValid:true})
        } else {
            this.setState({emailValid:false})
        }

    }

    isPhoneValid = () => {
        if (phoneRegex.test(this.state.phone)){
            this.setState({phoneValid:true})
        } else {
            this.setState({phoneValid:false})
        }
    }

    handleSubmit = (e) => {
        const {userName, confirm, firstName, lastName, phone, email,
                userNameValid, passwordCharacter,passwordNum,passwordLetter,passwordconfirm, firstNameCharacter, lastNameCharacter, emailValid, phoneValid, 
        } = this.state
        e.preventDefault()
        if(!userNameValid)return this.setState({userNameInput:false})
        if(!passwordCharacter || !passwordNum || !passwordLetter)return this.setState({passwordInput:false})
        if(!passwordconfirm)return this.setState({confirmInput:false})
        if(!firstNameCharacter)return this.setState({firstNameInput:false})
        if(!lastNameCharacter)return this.setState({lastNameInput:false})
        if(!emailValid)return this.setState({emailInput:false})
        if(!phoneValid)return this.setState({phoneInput:false})

        axios
            .post('api/register',{
                userName:userName,
                password:confirm,
                firstName:firstName,
                lastName:lastName,
                phone:phone,
                email:email
            })
            .then(res => {
                sessionStorage.setItem("usertoken", res.data.authToken)
                this.props.handlelogin()
            })
            .catch(err => console.log(err))
        
    }

    render() {
        const{
                userName, password, confirm, firstName, lastName, phone, email, 
                userNameValid, passwordCharacter,passwordNum,passwordLetter,passwordconfirm, firstNameCharacter, lastNameCharacter, emailValid, phoneValid, 
                userNameInput, passwordInput, confirmInput, firstNameInput, lastNameInput, phoneInput, emailInput
            } = this.state
        return(
            <section className="SignupPage">
                <form className="SignupPage__form" onSubmit={(e) => this.handleSubmit(e)}>
                <h1 className="SignupPage__form-title">Sign Up</h1>
                    <label className="SignupPage__form-label" htmlFor="userName">
                        <input 
                            name="userName" 
                            className={userNameInput ? "SignupPage__input" :"SignupPage__input SignupPage__input--error" }
                            placeholder="Username" 
                            value={userName}
                            onChange={(e) => this.handleChange(e)}/>
                        <div className="SignupPage__form-validate">
                            <img className="SignupPage__form-validate-icon" src={userNameValid ? checkValid : check} alt="check icon"/>
                            <p className={userNameValid ? "SignupPage__form-validate-text SignupPage__form-validate-text--valid" : "SignupPage__form-validate-text"}>
                                Username available
                            </p>
                        </div>
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
                        className={firstNameInput ? "SignupPage__input" :"SignupPage__input SignupPage__input--error" }
                        placeholder="First name" 
                        value={firstName}
                        onChange={(e) => this.handleChange(e)}/>
                        <div className="SignupPage__form-validate">
                            <img className="SignupPage__form-validate-icon" src={firstNameCharacter ? checkValid : check} alt="check icon"/>
                            <p className={firstNameCharacter ? "SignupPage__form-validate-text SignupPage__form-validate-text--valid" : "SignupPage__form-validate-text"}>
                                At least 1 character
                            </p>
                        </div>
                    </label>
                    <label className="SignupPage__form-label" htmlFor="lastName">
                        <input 
                        name="lastName"
                        className={lastNameInput ? "SignupPage__input" :"SignupPage__input SignupPage__input--error" }
                        placeholder="Last name" 
                        value={lastName}
                        onChange={(e) => this.handleChange(e)}/>
                        <div className="SignupPage__form-validate">
                            <img className="SignupPage__form-validate-icon" src={lastNameCharacter ? checkValid : check} alt="check icon"/>
                            <p className={lastNameCharacter ? "SignupPage__form-validate-text SignupPage__form-validate-text--valid" : "SignupPage__form-validate-text"}>
                            At least 1 character
                            </p>
                        </div>
                    </label>
                    <label className="SignupPage__form-label" htmlFor="email">
                        <input 
                        name="email" 
                        className={emailInput ? "SignupPage__input" :"SignupPage__input SignupPage__input--error" }
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => this.handleChange(e)}/>
                        <div className="SignupPage__form-validate">
                            <img className="SignupPage__form-validate-icon" src={emailValid ? checkValid : check} alt="check icon"/>
                            <p className={emailValid ? "SignupPage__form-validate-text SignupPage__form-validate-text--valid" : "SignupPage__form-validate-text"}>
                                Valid email
                            </p>
                        </div>
                    </label>
                    <label className="SignupPage__form-label" htmlFor="phone">
                        <input 
                        name="phone" 
                        className={phoneInput ? "SignupPage__input" :"SignupPage__input SignupPage__input--error" }
                        placeholder="Phone number" 
                        value={phone}
                        onChange={(e) => this.handleChange(e)}/>
                        <div className="SignupPage__form-validate">
                            <img className="SignupPage__form-validate-icon" src={phoneValid ? checkValid : check} alt="check icon"/>
                            <p className={phoneValid ? "SignupPage__form-validate-text SignupPage__form-validate-text--valid" : "SignupPage__form-validate-text"}>
                                Valid phone number
                            </p>
                        </div>
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