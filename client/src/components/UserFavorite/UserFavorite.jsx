import { useState } from 'react'
import axios from 'axios'
import add from '../../assets/icons/add.svg'
import remove from '../../assets/icons/remove-circle.svg'
import './UserFavorite.scss'

const UserFavorite = ({handleInfoUpdate, updateProfileState, handleSelect, userInfo}) => {
    const [favouriteBox, setFavouriteBox] = useState(false)

    const userToken = sessionStorage.getItem("usertoken")

    const expandFavouriteBox = () => {
        setFavouriteBox(!favouriteBox)
    }

    const deleteFavourite = (id) => {
        console.log("click")
        axios
            .delete('/api/user/favourites',{
                data:{
                    id:id
                },
                headers:{
                    authorization:`bearer ${userToken}`
                }
            })
            .then(res => {
                updateProfileState(res.data)
                handleInfoUpdate()
                setFavouriteBox(!favouriteBox)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const favouritelastIndex = userInfo.favourites.length -1

    return (
        <section className={favouriteBox ? "favourite favourite--expand" : "favourite"}>
            <section className="favourite__header">
                <h3 className="favourite__title">Liked</h3>
                <button className="favourite__expand-btn">
                    {favouriteBox? 
                    <img 
                        className="favourite__remove-icon" 
                        onClick={() => expandFavouriteBox()} 
                        src={remove} 
                        alt="remove icon"/>
                    :
                    <img 
                        className="favourite__add-icon" 
                        onClick={() => expandFavouriteBox()} 
                        src={add} 
                        alt="add icon"/>
                    }
                </button>
            </section>
            <section className="favourite__body">
                {!!userInfo.favourites.length ?  
                    <article className="favourite__container">
                        <p className="favourite__name">{userInfo.favourites[favouritelastIndex].name}</p>
                        <div className="favourite__body-container">
                                <div className="favourite__image-container">
                                    <img className="favourite__image" src={userInfo.favourites[favouritelastIndex].image_url} alt="restaurants"/>
                                </div>
                            <div className="favourite__action-btn-container">
                                {favouriteBox && <button 
                                                    className="favourite__remove-btn"
                                                    onClick={()=>deleteFavourite(userInfo.favourites[favouritelastIndex].id)}>
                                                    Remove
                                                </button>}
                                <button 
                                    className="favourite__detail-btn"
                                    onClick={()=>handleSelect(userInfo.favourites[favouritelastIndex])}>
                                    Details
                                </button>
                            </div>
                        </div>
                    </article>
                :
                    <article className="favourite__container">
                        <p className="favourite__empty-message">You don't have restaurants liked any yet</p>
                    </article>
                }
                {favouriteBox && !!userInfo.favourites.length && userInfo.favourites.map((favourite,i) => {
                    return i > favouritelastIndex-4 && i !== favouritelastIndex &&
                         <article key={favourite.id} className="favourite__container">
                                    <p className="favourite__name">{favourite.name}</p>
                                    <div className="favourite__body-container">
                                        <div className="favourite__image-container">
                                            <img className="favourite__image" src={favourite.image_url} alt="restaurants"/>
                                        </div>
                                        <div className="favourite__action-btn-container">
                                            {favouriteBox && <button 
                                                                className="favourite__remove-btn"
                                                                onClick={()=>deleteFavourite(userInfo.favourites[favouritelastIndex].id)}>
                                                                Remove
                                                            </button>}
                                            <button 
                                                className="favourite__detail-btn"
                                                onClick={()=>handleSelect(favourite)}>
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </article>
                })}
            </section>
            
            
            
        </section>
    )
}

export default UserFavorite