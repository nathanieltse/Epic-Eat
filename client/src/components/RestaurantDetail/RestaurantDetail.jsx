import {useEffect, useState} from 'react';
import { createTheme, ThemeProvider } from "@material-ui/core";
import Lottie from 'react-lottie'
import check from'../../assets/animation/check.json'
import axios from 'axios';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import phone from '../../assets/icons/phone.svg'
import cross from '../../assets/icons/close-cross.svg'
import './RestaurantDetail.scss'

const RestaurantDetail = ({handleModalBack, id, distance}) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [details, setDetails] = useState(null)
    const [categoryList, setCategoryList] = useState([])
    const [bookingform, setBookingform] = useState(false)
    const [bookingSuccess, setBookingSuccess] = useState(false)
    const [showcheck, setShowcheck] = useState(false)

    const userToken = sessionStorage.getItem("usertoken")
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))

    const pickertheme = createTheme({
        palette: {
          primary: {
            main: "#fcc435",
          }
        }
    })

    useEffect(() => {
        axios
            .get('/api/restaurants/detail',{
                params:{
                    id:id
                }
            })
            .then(res => {
                setDetails(res.data)
            })
            .catch(err => console.log(err))
    },[id])

    useEffect(() => {
        axios 
            .get('api/categories')
            .then(res => {
                setCategoryList(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const timeConvert = (time) => {
        let newTime = time[0]+time[1]+":"+time[2]+time[3]+(time >= 1200 ? "pm" : "am")
        return newTime
    }

    const dayConvert = (day) => {
        if(day === 0) return "Monday"
        if(day === 1) return "Tuesday"
        if(day === 2) return "Wednesday"
        if(day === 3) return "Thursday"
        if(day === 4) return "Friday"
        if(day === 5) return "Saturday"
        if(day === 6) return "Sunday"
    }

    const showbooking = () => {
        setBookingform(true)
    }

    const bookdate = () => {
        scroeUpdate(details)
        axios
            .post('api/booking',{
                id:details.id,
                restaurant:details.name,
                image:details.image_url,
                date:Date.parse(selectedDate)
            },{
                headers:{
                    authorization:`bearer ${userToken}`
                }
            })
            .then(res => {
                sessionStorage.setItem("userInfo",JSON.stringify(res.data))
                setBookingSuccess(true)
                setTimeout(() => {
                    setShowcheck(true)
                }, 800);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const scroeUpdate = (restaurant) => {
        const restuarantCategory = restaurant.categories.map(category => category.alias)
                
        const newUserCategory = restuarantCategory.reduce((acc,cur) => {
            categoryList.map(category => {
                if (category.category === cur){
                    acc.map(userCategory =>  {
                        if(userCategory.category === cur){
                            return userCategory.rate+= 5
                        } else {
                            return cur
                        }
                    })
                } else{
                    return acc
                }
                return acc
            })
            return acc
        },userInfo.categories)

        axios
            .put('/api/user/categories',{
                categories:newUserCategory,
            },{
                headers:{
                    authorization:`bearer ${userToken}`
                }
            })
            .then(res => {
                return res
            })
            .catch(err => {
                console.log(err)
            })

    }

    const checkAni = {
        loop: false,
        autoplay: true,
        animationData: check,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        }
    }

    return (
        details &&
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <section className="RestaurantDetail">
            <div className="RestaurantDetail__container">
                <section className="RestaurantDetail__hero">
                    <button className="RestaurantDetail__hero-back-btn" onClick={()=>handleModalBack()}>
                        <img className="RestaurantDetail__hero-back-icon" src={cross} alt="close icon"/>
                    </button>
                    <img className="RestaurantDetail__hero-image" src={details.image_url} alt="name"/>
                </section>
                <section className="RestaurantDetail__info">
                    <div className="RestaurantDetail__info-scrollbar"> 
                        <section className="RestaurantDetail__category">
                            {details.categories.map((category, i) => {
                                return <p key={i} className="RestaurantDetail__category-text">{category.title}</p>
                            })}
                        </section>
                        <button className="RestaurantDetail__info-phone-btn">
                            <img className="RestaurantDetail__info-phone-icon" src={phone} alt="phone icon"/>
                        </button>
                        <h1 className="RestaurantDetail__info-name">{details.name}</h1>
                        <p className="RestaurantDetail__info-address">
                            {details.location.address1}, {details.location.city}
                            {distance && 
                                <span className="RestaurantDetail__info-distance">
                                {(distance/1000).toFixed(1)} km
                                </span>
                            }
                            <span className="RestaurantDetail__info-price">
                                {details.price}
                            </span>
                        </p>
                        <section className="RestaurantDetail__photos">
                            <div className="RestaurantDetail__photos-scollbar"> 
                                {details.photos.map((photo,i) => {
                                    return <div key={i} className="RestaurantDetail__photos-wrapper">
                                                <img 
                                                    className="RestaurantDetail__photos-image" 
                                                    src={photo} 
                                                    alt="restaurant and food"/>
                                            </div>
                                })}
                            </div>
                        </section>

                        <section className="RestaurantDetail__hour">
                            <h3 className="RestaurantDetail__hour-title">Restaurant hours</h3>
                            <div className="RestaurantDetail__hour-scrollbar"> 
                                {details.hours[0].open.map((hour,i) => {
                                    return <div key={i} className="RestaurantDetail__hour-wrapper">
                                                <p className="RestaurantDetail__hour-day">
                                                    {dayConvert(hour.day)}
                                                </p>
                                                <p className="RestaurantDetail__hour-time">
                                                    {timeConvert(hour.start)} - {timeConvert(hour.end)}
                                                </p>
                                            </div>
                                })}
                            </div>
                        </section>
                        {bookingform &&
                            <section className={bookingSuccess? "RestaurantDetail__date-container RestaurantDetail__date-container--success" : "RestaurantDetail__date-container"}>
                                <h3 className="RestaurantDetail__date-container-title">Pick a date</h3>
                                <div className="RestaurantDetail__date-container-picker">                        
                                    <ThemeProvider theme={pickertheme}>
                                        <KeyboardDatePicker
                                            label="Date"
                                            placeholder="Date"
                                            value={selectedDate}
                                            onChange={date => handleDateChange(date)}
                                            format="yyyy/MM/dd"
                                            />
                                        <KeyboardTimePicker
                                            label="Time"
                                            placeholder=""
                                            mask="__:__ _M"
                                            value={selectedDate}
                                            onChange={date => handleDateChange(date)}
                                            />
                                    </ThemeProvider>
                                </div>
                            </section>
                        }
                        <section className="RestaurantDetail__action">
                            {bookingSuccess && <h3 className="RestaurantDetail__action-message">Your table is booked!</h3>}
                            {bookingform ? 
                                <button 
                                    className={bookingSuccess ? "RestaurantDetail__book-btn RestaurantDetail__book-btn--success" : "RestaurantDetail__book-btn"} 
                                    onClick={bookdate}>
                                    {bookingSuccess? 
                                        showcheck && 
                                        <div className="RestaurantDetail__book-btn-check">
                                            <Lottie options={checkAni} height={80} width={70}/>
                                        </div>
                                        : 
                                        "Confirm Booking"
                                    }
                                </button>
                                :
                                <button className="RestaurantDetail__book-btn" onClick={showbooking}>
                                    Book Now
                                </button>
                            }
                        </section>
                    </div>
                </section>
            </div>
        </section>
        </MuiPickersUtilsProvider>
        
    )
}

export default RestaurantDetail