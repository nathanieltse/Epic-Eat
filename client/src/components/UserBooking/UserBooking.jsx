import { useState } from 'react'
import axios from 'axios'
import search from '../../assets/animation/search.json'
import remove from '../../assets/icons/remove-circle.svg'
import Lottie from 'react-lottie'
import './UserBooking.scss'

const UserBooking = ({userInfo, updateProfileState, handleInfoUpdate, handleSelect}) => {
    const [bookingBox, setBookingBox] = useState(false)


    const userToken = sessionStorage.getItem("usertoken")

    const dateTimeConvert = (input) => {
        let date = `${(new Date(input)).getFullYear()}-${(new Date(input)).getMonth()+1}-${(new Date(input)).getDate()}`
        let today = Date.now()
        let todayString = `${(new Date(today)).getFullYear()}-${(new Date(today)).getMonth()+1}-${(new Date(today)).getDate()}`
        let hour = (new Date(input)).getHours()
        let minute = ("0" + (new Date(input)).getMinutes()).slice(-2)
        let time = hour === 0 ? `12:${minute} am` : hour < 11 ? `${hour}:${minute} am` : hour === 12 ? `${hour}:${minute} pm` : `${hour-12}:${minute} pm`

        if (date === todayString) {
            return `Today  ${time}`
        } else {
            return `${date}  ${time}`
        }
        
    }

    const cancelBooking = (bookingid) => {
        axios
            .delete('/api/booking',{
                data:{
                    id:bookingid
                },
                headers:{
                    authorization:`bearer ${userToken}`
                }
            })
            .then(res => {
                updateProfileState(res.data)
                handleInfoUpdate()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const searchAni = {
        loop: true,
        autoplay: true,
        animationData: search,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        }
    }

    const expandBookingBox = () => {
        setBookingBox(!bookingBox)
    }
    return (
        <section 
            className={bookingBox ? "booking booking--expand" : "booking booking--close"} 
            onClick={() => {!bookingBox && expandBookingBox()}}>
            {bookingBox && !!userInfo.bookings.length && 
                <img className="booking__remove-icon" onClick={()=>expandBookingBox()} src={remove} alt="remove icon"/>}
            {userInfo.bookings.length ? 
                <article className="booking__container">
                    <h3 className="booking__title">Upcoming booking</h3>
                    <p className="booking__subtitle">
                        {dateTimeConvert(userInfo.bookings[0].date)}
                    </p>
                    <p className="booking__text">{userInfo.bookings[0].restaurant}</p>
                    <div className="booking__action-btn-container">
                        {bookingBox && 
                            <button className="booking__remove-btn" 
                                    onClick={() => cancelBooking(userInfo.bookings[0].bookingID)}>
                                    Remove
                            </button>}
                        <button 
                            className="booking__detail-btn"
                            onClick={() => handleSelect(userInfo.bookings[0])}>
                            Details
                        </button>
                    </div>
                    <img className="booking__image" src={userInfo.bookings[0].image} alt="restaurant"/>
                </article>
                :
                <article className="booking__placeholder">
                    <h3 className="booking__placeholder-title">Upcoming booking</h3>
                    <div className="booking__animate">
                        <Lottie  options={searchAni} height={70} width={70}/>
                    </div>
                    <p className="booking__placeholder-text">You don't have any reservations</p>
                </article>
            }
            {bookingBox && userInfo.bookings.slice(1).map((booking) => {
                    return <article 
                                key={booking.bookingID} 
                                className="booking__container">
                                    <h3 className="booking__title">Upcoming booking</h3>
                                    <p className="booking__subtitle">{dateTimeConvert(booking.date)}</p>
                                    <p className="booking__text">{booking.restaurant}</p>

                                    <div className="booking__action-btn-container">
                                        <button 
                                            className="booking__remove-btn" 
                                            onClick={() => cancelBooking(booking.bookingID)}>
                                                Remove
                                        </button>
                                        <button 
                                            className="booking__detail-btn"
                                            onClick={() => handleSelect(booking)}>
                                            Details
                                        </button>
                                    </div>
                                <img className="booking__image" src={booking.image} alt="restaurant"/>
                            </article>
                
            })}
    </section>
    )
}

export default UserBooking