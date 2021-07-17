import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import ContactInfo from '../../components/ContactInfo/ContactInfo'
import Preference from '../../components/Preference/Preference'
import UserBooking from '../../components/UserBooking/UserBooking'
import PageFooter from '../../components/PageFooter/PageFooter'
import UserFavorite from '../../components/UserFavorite/UserFavorite'
import './ProfilePage.scss'

const ProfilePage = ({handleLogout, handleInfoUpdate, handleSelect}) => {
    const [userInfo, setUserInfo] = useState(null)

    useEffect(()=> {
        const storageInfo = JSON.parse(sessionStorage.userInfo)
        setUserInfo(storageInfo)
    },[])

    const updateProfileState = (info) => {
        setUserInfo(info)
    }

    return (
        userInfo &&
        <section className="ProfilePage">
            <UserBooking 
                userInfo={userInfo} 
                updateProfileState={updateProfileState} 
                handleInfoUpdate={handleInfoUpdate}
                handleSelect={handleSelect}/>
                
            <UserFavorite
                userInfo={userInfo}
                updateProfileState={updateProfileState} 
                handleSelect={handleSelect}
                handleInfoUpdate={handleInfoUpdate}/>

            <ContactInfo 
                userInfo={userInfo}/>


            <Preference 
                userInfo={userInfo} 
                handleInfoUpdate={handleInfoUpdate}/>

            <button className="ProfilePage__logout" onClick={handleLogout}>Log Out</button>

            <NavBar 
                onPage="profile"/>
            <PageFooter/>

        </section>
        

    )
    
}

export default ProfilePage