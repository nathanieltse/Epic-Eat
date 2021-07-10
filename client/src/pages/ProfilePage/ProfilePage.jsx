import { Component } from 'react'
import add from '../../assets/icons/add.svg'
import './ProfilePage.scss'

class ProfilePage extends Component {
    render() {
        return (
            <section className="ProfilePage">
                <article className="ProfilePage__booking">
                    <h3 className="ProfilePage__booking-title">Upcoming booking</h3>
                    <p className="ProfilePage__booking-subtitle">12:00 pm today </p>
                    <p className="ProfilePage__booking-text">restaurant name</p>
                    <img className="ProfilePage__booking-image" src="https://media.cntraveler.com/photos/5b22bfdff04a775484b99dfc/1:1/w_800%2Cc_limit/Alo-Restaurant__2018_Raffi-Photo-2.jpg" alt="restaurant"/>
                </article>
                <article className="ProfilePage__contact">
                    <h3 className="ProfilePage__contact-title">Contact Info</h3>
                    <div className="ProfilePage__contact-name-container">
                        <h4 className="ProfilePage__name-title">Name</h4>
                        <p className="ProfilePage__name">Nate</p>
                    </div>
                    <div className="ProfilePage__contact-phone-container">
                        <h4 className="ProfilePage__phone-title">Phone</h4>
                        <p className="ProfilePage__phone">647-666-2132</p>
                    </div>
                </article>
                <article className="ProfilePage__preference">
                    <div className="ProfilePage__preference-tilte-container">
                        <h3 className="ProfilePage__preference-title">Your preference</h3>
                        <h4 className="ProfilePage__preference-subtitle">tab to remove category</h4>
                    </div>
                    <button className="ProfilePage__preference-add">
                        <img className="ProfilePage__preference-add-icon"src={add} alt="add icon"/>
                    </button>
                    <div className="ProfilePage__preference-btn-container">
                        <button className="ProfilePage__preference-btn">Korean</button>
                        <button className="ProfilePage__preference-btn">Korean</button>
                        <button className="ProfilePage__preference-btn">Korean</button>
                    </div>
                </article>
                <button className="ProfilePage__logout">Log out</button>
            </section>
        )
    }
}

export default ProfilePage