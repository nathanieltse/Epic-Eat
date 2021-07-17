import './ContactInfo.scss'

const ContactInfo = ({userInfo}) => {
    return (
        <section className="contact">
            <h3 className="contact__title">Contact Info</h3>
            <div className="contact__container">
                <h4 className="contact__label">Name</h4>
                <p className="contact__text">{userInfo.firstName +" "+userInfo.lastName}</p>
            </div>
            <div className="contact__container">
                <h4 className="contact__label">Phone</h4>
                <p className="contact__text">{userInfo.phone}</p>
            </div>
            <div className="contact__container">
                <h4 className="contact__label">Email</h4>
                <p className="contact__text">{userInfo.email}</p>
            </div>
        </section>
    )
}

export default ContactInfo