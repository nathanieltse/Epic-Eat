import axios from 'axios'
import { useEffect, useState } from 'react'
import add from '../../assets/icons/add.svg'
import search from '../../assets/animation/search.json'
import Lottie from 'react-lottie'
import remove from '../../assets/icons/remove-circle.svg'
import NavBar from '../../components/NavBar/NavBar'
import PageFooter from '../../components/PageFooter/PageFooter'
import './ProfilePage.scss'

const ProfilePage = ({handleLogout, handleInfoUpdate}) => {
    const [categoryBox, setCategoryBox] = useState(false)
    const [userPrefer, setUserPrefer] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [bookingBox, setBookingBox] = useState(false)

    const userToken = localStorage.getItem("usertoken")

    useEffect(()=> {
        const storageInfo = JSON.parse(localStorage.userInfo)
        setUserInfo(storageInfo)
        setUserPrefer(storageInfo.categories.filter(category => category.rate !== 0) )
    },[])

    const expandCategoryBox = () => {
        setCategoryBox(!categoryBox)
    }
    

    const handleCategorySubmmit = (category, action) => {
        const newCategories = userInfo.categories.map(data => {
            if(data === category){
                action === "add" ? data.rate++ : data.rate = 0
            }
            return data
        })

        axios
            .put('/api/user/categories',{
                categories:newCategories
            },{
                headers:{
                    authorization:`bearer ${userToken}`
                }
            })
            .then(res => {
                setUserPrefer(newCategories.filter(category => category.rate !== 0))
                handleInfoUpdate()
            })
            .catch(err => {
                console.log(err)
            })
    }

    let filterCategory = []
    if (userInfo){
        filterCategory = userInfo.categories.filter(data => {
        return data.rate === 0
    })}

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

    const expandBookingBox = () => {
        setBookingBox(!bookingBox)
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
                setUserInfo(res.data)
                handleInfoUpdate()
                setBookingBox(!bookingBox)
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


    
    return (
        userInfo &&
        <section className="ProfilePage">
            <section 
                className={bookingBox ? "ProfilePage__booking ProfilePage__booking--expand" : "ProfilePage__booking ProfilePage__booking--close"} 
                onClick={() => {!bookingBox && expandBookingBox()}}>
                {bookingBox && !!userInfo.bookings.length && 
                    <img className="ProfilePage__booking-remove-icon" onClick={()=>expandBookingBox()} src={remove} alt="remove icon"/>}
                {userInfo.bookings.length ? 
                    <article className="ProfilePage__booking-container">
                        <h3 className="ProfilePage__booking-title">Upcoming booking</h3>
                        <p className="ProfilePage__booking-subtitle">
                            {dateTimeConvert(userInfo.bookings[0].date)}
                        </p>
                        <p className="ProfilePage__booking-text">{userInfo.bookings[0].restaurant}</p>
                        {bookingBox && 
                            <button 
                                className="ProfilePage__booking-cancel" 
                                onClick={()=>cancelBooking(userInfo.bookings[0].id)}>
                                Cancel
                            </button> }
                        <img className="ProfilePage__booking-image" src={userInfo.bookings[0].image} alt="restaurant"/>
                    </article>
                    :
                    <article className="ProfilePage__booking-placeholder">
                        <h3 className="ProfilePage__booking-placeholder-title">Upcoming booking</h3>
                        <div className="ProfilePage__booking-animate">
                            <Lottie  options={searchAni} height={70} width={70}/>
                        </div>
                        <p className="ProfilePage__booking-placeholder-text">You don't have any reservations</p>
                    </article>
                }
                {bookingBox && userInfo.bookings.slice(1).map((booking) => {
                        return <article 
                                    key={booking.id} 
                                    className="ProfilePage__booking-container">
                                        <h3 className="ProfilePage__booking-title">Upcoming booking</h3>
                                        <p className="ProfilePage__booking-subtitle">{dateTimeConvert(booking.date)}</p>
                                        <p className="ProfilePage__booking-text">{booking.restaurant}</p>
                                    {bookingBox && 
                                        <button 
                                            className="ProfilePage__booking-cancel" 
                                            onClick={() => cancelBooking(booking.id)}>
                                                Cancel
                                        </button> }
                                    <img className="ProfilePage__booking-image" src={booking.image} alt="restaurant"/>
                                </article>
                    
                })}
            </section>
            <section className="ProfilePage__contact">
                <h3 className="ProfilePage__contact-title">Contact Info</h3>
                <div className="ProfilePage__contact-container">
                    <h4 className="ProfilePage__contact-label">Name</h4>
                    <p className="ProfilePage__contact-text">{userInfo.firstName +" "+userInfo.lastName}</p>
                </div>
                <div className="ProfilePage__contact-container">
                    <h4 className="ProfilePage__contact-label">Phone</h4>
                    <p className="ProfilePage__contact-text">{userInfo.phone}</p>
                </div>
                <div className="ProfilePage__contact-container">
                    <h4 className="ProfilePage__contact-label">Email</h4>
                    <p className="ProfilePage__contact-text">{userInfo.email}</p>
                </div>
            </section>
            <section className="ProfilePage__preference">
                <div className="ProfilePage__preference-tilte-container">
                    <h3 className="ProfilePage__preference-title">Your preference</h3>
                    <h4 className="ProfilePage__preference-subtitle">Tab to remove category</h4>
                </div>
                <button className="ProfilePage__preference-add">
                    {categoryBox? 
                    <img 
                        className="ProfilePage__preference-remove-icon" 
                        onClick={() => expandCategoryBox()} 
                        src={remove} 
                        alt="remove icon"/>
                    :
                    <img 
                        className="ProfilePage__preference-add-icon" 
                        onClick={() => expandCategoryBox()} 
                        src={add} 
                        alt="add icon"/>
                    }
                </button>
                {categoryBox && 
                    <div className="ProfilePage__add-prefer">
                        <h3 className="ProfilePage__add-prefer-title">Add your preference</h3>

                        <div className="ProfilePage__add-prefer-container">
                            {filterCategory.map((category, i)=> {
                                return <button 
                                            key={i} 
                                            className="ProfilePage__add-prefer-btn" 
                                            onClick={()=>handleCategorySubmmit(category, "add")}>
                                                {category.category.replace(category.category[0], category.category[0].toUpperCase())}
                                        </button>
                            })}
                        </div>
                    </div>
                }
                <div className="ProfilePage__preference-btn-container">
                    {!!userPrefer.length && userPrefer.map((category,i) => {
                        return <button 
                                    key={i} 
                                    className="ProfilePage__preference-btn" 
                                    onClick={()=>handleCategorySubmmit(category, "remove")}>
                                        {category.category.replace(category.category[0], category.category[0].toUpperCase())}
                                </button>
                    })}
                </div>
            </section>
            <button className="ProfilePage__logout" onClick={handleLogout}>Log Out</button>
            <NavBar onPage="profile"/>
            <PageFooter/>

        </section>
        

    )
    
}

export default ProfilePage