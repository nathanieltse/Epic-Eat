import greeting from '../../assets/animation/lf30_editor_q5izwk4x.json'
import Lottie from 'react-lottie'
import {Link} from 'react-router-dom'
import'./WelcomePage.scss'

const WelcomePage = () =>{
    const greetingAni = {
        loop: false,
        autoplay: true,
        animationData: greeting,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        }
    }

    const signin = (e) =>{
        e.preventDefault()
        console.log(e.target)
    }

    return (
        <section className="WelcomePage">
            <div className="WelcomePage__ani">
                <Lottie  options={greetingAni} height={400} width={400}/>
            </div>
            <div className="WelcomePage__container" onSubmit={(e) => signin(e)}>
                <form className="WelcomePage__form">
                    <label htmlFor="username">
                        <input name="username" className="WelcomePage__input" placeholder="Username" value=""></input>
                    </label>
                    <label htmlFor="password">
                        <input name="password" type="password" className="WelcomePage__input" placeholder="password" value=""></input>
                    </label>
                    <h4 className="WelcomePage__text">Forget password?</h4>
                    <div className="WelcomePage__btn-container">
                        <input className="WelcomePage__signup-btn" value="Sign up"></input>
                        <button type="submit" className="WelcomePage__login-btn" >Log In</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default WelcomePage