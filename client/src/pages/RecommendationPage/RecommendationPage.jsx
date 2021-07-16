import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import axios from 'axios'
import heart from '../../assets/icons/heart.svg'
import cross from '../../assets/icons/dislike_cross.svg'
import PickReason from '../../components/PickReason/PickReason'
import './RecommendationPage.scss'

const RecommendationPage = ({latitude, longitude}) => {
        const [pickReason, setPickReason] = useState(null)
        const [userRec , setUserRec] = useState([])
        const [currentView, setCurrentView] = useState(null)
        const [nextView, setNextView] = useState(null)
        const [like, setLike] = useState("Dxp9SElV1f5MwPxIun_47w")
        const [dislike, setDislike] = useState("Dxp9SElV1f5MwPxIun_47w")

        const userToken = localStorage.getItem("usertoken")


        const picked = (reason) => {
            setPickReason(reason)
            sessionStorage.setItem("lastpickReason",reason)
            
            let lastpickReason = sessionStorage.getItem("lastpickReason")

            
            const userRecArr = JSON.parse(sessionStorage.getItem("userRec"))
            shuffle(userRecArr)
            setUserRec(userRecArr)

            if(userRec.length || reason !== lastpickReason){
                axios
                    .get('/api/recommendation',{
                        headers:{
                        authorization:`bearer ${userToken}`
                        },
                        params:{
                            latitude:latitude,
                            longitude:longitude,
                            reason:reason,
                        }
                    })
                    .then(res => {
                        console.log("axios")
                        sessionStorage.setItem("userRec",JSON.stringify(res.data))
                        setUserRec(shuffle(JSON.parse(sessionStorage.getItem("userRec"))))
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } 
        }

        const shuffle = (array) => {
            let newArr = []
            let sortArr =  array.sort((a,b)=> a.id - b.id)

            newArr = sortArr.forEach((item, i) => {
                if(i!== sortArr.length-1 && item.id !== sortArr[i+1].id){
                    return newArr.splice(Math.floor(Math.random() * newArr.length), 0, item)
                }
            })
            return newArr
        }

        

        return(
            <section className="RecommendationPage">
                {!pickReason && <PickReason picked={picked}/>}
                <section className="RecommendationPage__image">
                    {userRec.length && userRec.map(item => {
                        return <div key={item.id} className={item.id === like ? "RecommendationPage__image-wrapper RecommendationPage__image-wrapper--like" : "RecommendationPage__image-wrapper"}>
                                    <div className="RecommendationPage__image-text">
                                        <h1 className="RecommendationPage__image-title">{item.name}</h1>
                                        <p className="RecommendationPage__image-distance">{(item.distance/1000).toFixed(1)} km away</p>
                                    </div>
                                    <img className="RecommendationPage__image-image" src={item.image_url} alt={item.name}/>
                                </div>
                    })}
                </section>
                <section className="RecommendationPage__button-container">
                    <button className="RecommendationPage__button">
                    <img className="RecommendationPage__button-icon" src={cross} alt="cross icon"/>
                    </button>
                    <button className="RecommendationPage__button">
                        <img className="RecommendationPage__button-icon" src={heart} alt="heart icon"/>
                    </button>
                </section>
                <NavBar onPage="recommends"/>
            </section>
        )
    
}

export default RecommendationPage
