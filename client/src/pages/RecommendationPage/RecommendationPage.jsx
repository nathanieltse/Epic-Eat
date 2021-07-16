import { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import axios from 'axios'
import heart from '../../assets/icons/heart.svg'
import cross from '../../assets/icons/dislike_cross.svg'
import PickReason from '../../components/PickReason/PickReason'
import './RecommendationPage.scss'

const RecommendationPage = ({latitude, longitude, handleSelect}) => {
        const [pickReason, setPickReason] = useState(null)
        const [userRec , setUserRec] = useState([])
        const [currentView, setCurrentView] = useState(null)
        const [nextView, setNextView] = useState(null)
        const [like, setLike] = useState("")
        const [dislike, setDislike] = useState("")

        const userToken = localStorage.getItem("usertoken")


        const picked = (reason) => {
            setPickReason(reason)
            sessionStorage.setItem("lastpickReason",reason)
            
            let lastpickReason = sessionStorage.getItem("lastpickReason")

            
            const userRecArr = JSON.parse(sessionStorage.getItem("userRec"))
            if (userRecArr){
                setUserRec(userRecArr)
                displayRec(userRecArr)
            } 
            
            if(!userRecArr || reason !== lastpickReason){
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
                        console.log("again?")
                        sessionStorage.setItem("userRec",(JSON.stringify(removeDuplicate(res.data))))
                        setUserRec(JSON.parse(sessionStorage.getItem("userRec")))
                        displayRec(userRecArr)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } 
        }

        const displayRec = (recArr) => {
            const selectIndex = Math.floor(Math.random() * recArr.length)
            let nextIndex = Math.floor(Math.random() * recArr.length)
            if(!nextView){
                while (nextIndex){
                    if (selectIndex === nextIndex){
                        nextIndex = Math.floor(Math.random() * recArr.length)
                    }
                    break
                }
            setCurrentView(recArr[selectIndex])
            setNextView(recArr[nextIndex])
            } else {
                let nextIndex = Math.floor(Math.random() * recArr.length)

                while (nextIndex){
                    if (nextView.id === recArr[nextIndex].id){
                        nextIndex = Math.floor(Math.random() * recArr.length)
                    }
                    break
                }
                setCurrentView(nextView)
                setNextView(recArr[nextIndex])
            }
            
        }


        const removeDuplicate = (arr) => {
            let newArr = []

            arr.forEach(item => {
                if(!newArr.find(item2 => item2.id === item.id)){
                    newArr.push(item)
                }
            })

            return newArr

        }

        const dislikeAction = () => {
            setDislike(currentView.id)
            setTimeout(() => {
                displayRec(userRec)     
            }, 800)
        }
        
        const likeAction = () => {
            setLike(currentView.id)
            setTimeout(() => {
                displayRec(userRec)     
            }, 800)
        }

        
        
        return(
            <section className="RecommendationPage">
                {!pickReason && <PickReason picked={picked}/>}
                {currentView && <section className="RecommendationPage__image">
                        <div className="RecommendationPage__image-wrapper">
                            <div className="RecommendationPage__image-text">
                                <h1 className="RecommendationPage__image-title">{nextView.name}</h1>
                                <p className="RecommendationPage__image-distance">{(nextView.distance/1000).toFixed(1)} km away</p>
                            </div>
                            <img className="RecommendationPage__image-image" src={nextView.image_url} alt={nextView.name}/>
                        </div>
                        <div 
                            onClick={() => handleSelect(currentView)}
                            className={currentView.id === like? "RecommendationPage__image-wrapper RecommendationPage__image-wrapper--like" :
                                        currentView.id === dislike? "RecommendationPage__image-wrapper RecommendationPage__image-wrapper--dislike" :
                                        "RecommendationPage__image-wrapper"}>
                            <div className="RecommendationPage__image-text">
                                <h1 className="RecommendationPage__image-title">{currentView.name}</h1>
                                <p className="RecommendationPage__image-distance">{(currentView.distance/1000).toFixed(1)} km away</p>
                            </div>
                            <img className="RecommendationPage__image-image" src={currentView.image_url} alt={currentView.name}/>
                        </div>
                </section>}
                <section className="RecommendationPage__button-container">
                    <button className="RecommendationPage__button" onClick={()=>dislikeAction()}>
                    <img className="RecommendationPage__button-icon" src={cross} alt="cross icon"/>
                    </button>
                    <button className="RecommendationPage__button" onClick={()=>likeAction()}>
                        <img className="RecommendationPage__button-icon" src={heart} alt="heart icon"/>
                    </button>
                </section>
                <NavBar onPage="recommends"/>
            </section>
        )
    
}

export default RecommendationPage
