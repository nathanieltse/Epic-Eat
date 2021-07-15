import business from '../../assets/icons/reason-group/business.svg'
import celebrate from '../../assets/icons/reason-group/celebrate.svg'
import chill from '../../assets/icons/reason-group/chill.svg'
import date from '../../assets/icons/reason-group/date.svg'
import everyday from '../../assets/icons/reason-group/everyday.svg'
import family from '../../assets/icons/reason-group/family.svg'
import friends from '../../assets/icons/reason-group/friends.svg'
import './PickReason.scss'

const PickReason = ({picked}) => {
    const icon = [celebrate, family, date, chill, business, friends, everyday]
    const reasons = ["Celebration", "Family Gathering", "Date", "Chill", "Business", "Friends", "Everyday Dinning"]

    return (
        <section className="PickReason">
            <div className="PickReason__container">
                <h1 className="PickReason__title">What's the occasion?</h1>
                <div className="PickReason__btn-container">
                    {reasons.map((reason,i) => {
                        return <button key={i} className="PickReason__btn" onClick={() => picked(reason)}>
                                    <img className="PickReason__btn-icon" src={icon[i]} alt="celebrate"/>
                                    <p className="PickReason__btn-text">{reason}</p>
                                </button>
                    })}
                    
                </div>
            </div>
            
        </section>
    )
}

export default PickReason