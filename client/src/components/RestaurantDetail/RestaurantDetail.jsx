import phone from '../../assets/icons/phone.svg'
import cross from '../../assets/icons/close-cross.svg'
import './RestaurantDetail.scss'

const RestaurantDetail = ({handleModalBack, selected}) => {
    return (
        <section className="RestaurantDetail">
            <div className={selected ? "RestaurantDetail__container" : "RestaurantDetail__container RestaurantDetail__container--close"}>
                <div className="RestaurantDetail__image-container">
                    <button className="RestaurantDetail__back-btn" onClick={()=>handleModalBack()}>
                        <img className="RestaurantDetail__back-icon" src={cross} alt="close icon"/>
                    </button>
                    <img className="RestaurantDetail__image" src={selected.image_url} alt="name"/>
                </div>
                <div className="RestaurantDetail__text-container">
                    <div className="RestaurantDetail__category-container">
                        {selected.categories.map(category => {
                            return <p className="RestaurantDetail__category">{category.title}</p>
                        })}
                    </div>
                    <button className="RestaurantDetail__phone-btn">
                        <img className="RestaurantDetail__phone-icon" src={phone} alt="phone icon"/>
                    </button>
                    <h1 className="RestaurantDetail__name">{selected.name}</h1>
                    <p className="RestaurantDetail__address">{selected.location.address1}
                        <span className="RestaurantDetail__distance">{(selected.distance/1000).toFixed(1)} km</span>
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