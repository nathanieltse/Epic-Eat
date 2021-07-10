import phone from '../../assets/icons/phone.svg'
import './RestaurantDetail.scss'

const RestaurantDetail = () => {
    return (
        <section className="RestaurantDetail">
            <div className="RestaurantDetail__container">
                <div className="RestaurantDetail__image-container">
                    <img className="RestaurantDetail__image" src="https://media.cntraveler.com/photos/5b22bfdff04a775484b99dfc/1:1/w_800%2Cc_limit/Alo-Restaurant__2018_Raffi-Photo-2.jpg" alt="name"/>
                </div>
                <div className="RestaurantDetail__text-container">
                    <div className="RestaurantDetail__category-container">
                        <p className="RestaurantDetail__category">Korean</p>
                        <p className="RestaurantDetail__category">Asian</p>
                    </div>
                    <button className="RestaurantDetail__phone-btn">
                        <img className="RestaurantDetail__phone-icon" src={phone} alt="phone icon"/>
                    </button>
                    <h1 className="RestaurantDetail__name">Asian bristro</h1>
                    <p className="RestaurantDetail__address">123 yonge street 
                        <span className="RestaurantDetail__distance">1 km</span>
                    </p>
                    <p className="RestaurantDetail__price">$$</p>
                    <button className="RestaurantDetail__book-btn">
                        Book now
                    </button>
                </div>
            </div>
        </section>
    )
}

export default RestaurantDetail