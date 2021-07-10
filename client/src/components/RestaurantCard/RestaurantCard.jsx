import './RestaurantCard.scss'

const RestaurantCard = () => {
    return (
        <article className="RestaurantCard">
            <div className="RestaurantCard__image-container">
                <img className="RestaurantCard__image" src="https://media.cntraveler.com/photos/5b22bfdff04a775484b99dfc/1:1/w_800%2Cc_limit/Alo-Restaurant__2018_Raffi-Photo-2.jpg" alt="restaurant"/>
            </div>
            <p className="RestaurantCard__title">Ruby's steak house</p>
            <h4 className="RestaurantCard__distance">1.21km</h4>
        </article>
    )
}

export default RestaurantCard