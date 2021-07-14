import axios from 'axios'
import { useEffect, useState } from 'react'
import add from '../../assets/icons/add.svg'
import remove from '../../assets/icons/remove-circle.svg'
import PageFooter from '../../components/PageFooter/PageFooter'
import './ProfilePage.scss'

const ProfilePage = ({handleLogout, handleInfoUpdate}) => {
    const [categories, setCategories] = useState([])
    const [categoryBox, setCategoryBox] = useState(false)
    const [userPrefer, setUserPrefer] = useState(null)
    const [userInfo, setUserInfo] = useState([])

    const userToken = localStorage.getItem("usertoken")
    
    useEffect(()=> {
        const storageInfo = JSON.parse(localStorage.userInfo)
        setUserInfo(storageInfo)
        setUserPrefer(storageInfo.categories)
        axios
            .get('/api/categories')
            .then(res => {
                setCategories(res.data)
                })
            .catch(err => console.log(err))
    },[])

    const expandbox = () => {
        setCategoryBox(!categoryBox)
    }
    

    const handleCategorySubmmit = (category, action) => {
        if (action === "add"){
            const newCategories = [...userPrefer, category]
            
            axios
                .put('/api/user/categories',{
                    categories:newCategories
                },{
                    headers:{
                      authorization:`bearer ${userToken}`
                    }
                })
                .then(res => {
                    setUserPrefer(newCategories)
                    handleInfoUpdate()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            const newCategories = userPrefer.filter(prefer => prefer !== category)
            
            axios
                .put('/api/user/categories',{
                    categories:newCategories
                },{
                    headers:{
                      authorization:`bearer ${userToken}`
                    }
                })
                .then(res => {
                    setUserPrefer(newCategories)
                    handleInfoUpdate()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const filterCategory = categories.filter(data => {
        if(!userPrefer) return []
        return userPrefer.indexOf(data.category) < 0
    })

    return (
        <section className="ProfilePage">
            <article className="ProfilePage__booking">
                <h3 className="ProfilePage__booking-title">Upcoming booking</h3>
                <p className="ProfilePage__booking-subtitle">12:00 pm today </p>
                <p className="ProfilePage__booking-text">restaurant name</p>
                <img className="ProfilePage__booking-image" src="https://media.cntraveler.com/photos/5b22bfdff04a775484b99dfc/1:1/w_800%2Cc_limit/Alo-Restaurant__2018_Raffi-Photo-2.jpg" alt="restaurant"/>
            </article>
            <article className="ProfilePage__contact">
                <h3 className="ProfilePage__contact-title">Contact Info</h3>
                <div className="ProfilePage__contact-container">
                    <h4 className="ProfilePage__contact-label">Name</h4>
                    <p className="ProfilePage__contact-text">{userInfo.firstName +" "+userInfo.lastName}</p>
                </div>
                <div className="ProfilePage__contact-container">
                    <h4 className="ProfilePage__contact-label">Phone</h4>
                    <p className="ProfilePage__contact-text">{userInfo.phone}</p>
                </div>
                <div className="ProfilePage__contact-container">
                    <h4 className="ProfilePage__contact-label">Email</h4>
                    <p className="ProfilePage__contact-text">{userInfo.email}</p>
                </div>
            </article>
            <article className="ProfilePage__preference">
                <div className="ProfilePage__preference-tilte-container">
                    <h3 className="ProfilePage__preference-title">Your preference</h3>
                    <h4 className="ProfilePage__preference-subtitle">Tab to remove category</h4>
                </div>
                <button className="ProfilePage__preference-add">
                    {categoryBox? 
                    <img className="ProfilePage__preference-add-icon" onClick={() => expandbox()} src={remove} alt="remove icon"/>
                    :
                    <img className="ProfilePage__preference-add-icon" onClick={() => expandbox()} src={add} alt="add icon"/>
                    }
                </button>
                {categoryBox && 
                    <div className="ProfilePage__add-prefer">
                        <h3 className="ProfilePage__add-prefer-title">Add your preference</h3>

                        <div className="ProfilePage__add-prefer-container">
                            {filterCategory.map(category => {
                                return <button key={category._id} className="ProfilePage__add-prefer-btn" onClick={()=>handleCategorySubmmit(category.category, "add")}>
                                            {category.category.replace(category.category[0], category.category[0].toUpperCase())}
                                        </button>
                            })}
                        </div>
                    </div>
                }
                <div className="ProfilePage__preference-btn-container">
                    {userPrefer && userPrefer.map((category,i) => {
                        return <button key={i} className="ProfilePage__preference-btn" onClick={()=>handleCategorySubmmit(category, "remove")}>
                                    {category.replace(category[0], category[0].toUpperCase())}
                                </button>
                    })}
                </div>
            </article>
            <button className="ProfilePage__logout" onClick={handleLogout}>Log Out</button>
            <PageFooter/>

        </section>

    )
    
}

export default ProfilePage