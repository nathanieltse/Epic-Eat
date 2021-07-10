import { Component } from "react";
import './RecommendationPage.scss'

class RecommendationPage extends Component {
    render() {
        return(
            <section className="RecommendationPage">
                <div className="RecommendationPage__image-container">
                    <div className="RecommendationPage__text-container">
                        <h2 className="RecommendationPage__title">restaurant name</h2>
                        <p className="RecommendationPage__distance">3.2 km away</p>
                    </div>
                    <img className="RecommendationPage__image" src="https://media.cntraveler.com/photos/5b22bfdff04a775484b99dfc/1:1/w_800%2Cc_limit/Alo-Restaurant__2018_Raffi-Photo-2.jpg" alt="name"/>
                </div>
                <div className="RecommendationPage__button-container">
                    <button className="RecommendationPage__button">
                        <svg className="RecommendationPage__button-icon RecommendationPage__button-icon--dislike" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                        </svg>
                    </button>
                    <button className="RecommendationPage__button">
                        <svg className="RecommendationPage__button-icon RecommendationPage__button-icon--like" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                </div>
            </section>
        )
    }
}

export default RecommendationPage
