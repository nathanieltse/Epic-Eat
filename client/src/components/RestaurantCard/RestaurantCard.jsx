import './RestaurantCard.scss'

const RestaurantCard = ({image, name, distance, id, restaurant, handleSelect}) => {
    
    return (
        image && name && distance && id && restaurant? 
        <article className="RestaurantCard" onClick={()=>handleSelect(restaurant)}>
            <div className="RestaurantCard__image-container">
                <img 
                    className="RestaurantCard__image" 
                    src={image} 
                    alt={name}/>
            </div>
            <p className="RestaurantCard__title">{name}</p>
            <h4 className="RestaurantCard__distance">{(distance/1000).toFixed(1)} km</h4>
        </article>
        :
        <article className="RestaurantCard">
            <div className="RestaurantCard__image-container--loading">
                
            </div>
            <p className="RestaurantCard__title"> </p>
            <h4 className="RestaurantCard__distance"> </h4>
        </article>
    )
}

export default RestaurantCard