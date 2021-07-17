import { useEffect, useState } from 'react'
import axios from 'axios'
import add from '../../assets/icons/add.svg'
import remove from '../../assets/icons/remove-circle.svg'
import './Preference.scss'

const Preference = ({userInfo, handleInfoUpdate}) => {
    const [categoryBox, setCategoryBox] = useState(false)
    const [userPrefer, setUserPrefer] = useState(null)

    const userToken = sessionStorage.getItem("usertoken")

    useEffect(()=> {
        setUserPrefer(userInfo.categories.filter(category => category.rate !== 0) )
    },[])

    const expandCategoryBox = () => {
        setCategoryBox(!categoryBox)
    }

    const handleCategorySubmmit = (category, action) => {
        const newCategories = userInfo.categories.map(data => {
            if(data === category){
                action === "add" ? data.rate++ : data.rate = 0
            }
            return data
        })

        axios
            .put('/api/user/categories',{
                categories:newCategories
            },{
                headers:{
                    authorization:`bearer ${userToken}`
                }
            })
            .then(res => {
                setUserPrefer(newCategories.filter(category => category.rate !== 0))
                handleInfoUpdate()
            })
            .catch(err => {
                console.log(err)
            })
    }

    let filterCategory = []
    if (userInfo){
        filterCategory = userInfo.categories.filter(data => {
        return data.rate === 0
    })}

    return (
        userPrefer &&
        <section className="preference">
            <div className="preference__tilte-container">
                <h3 className="preference__title">Preference</h3>
                <h4 className="preference__subtitle">Tab to remove category</h4>
            </div>
            <button className="preference__expand-btn">
                {categoryBox? 
                <img 
                    className="preference__remove-icon" 
                    onClick={() => expandCategoryBox()} 
                    src={remove} 
                    alt="remove icon"/>
                :
                <img 
                    className="preference__add-icon" 
                    onClick={() => expandCategoryBox()} 
                    src={add} 
                    alt="add icon"/>
                }
            </button>
            {categoryBox && 
                <div className="preference__add-prefer">
                    <h3 className="preference__add-prefer-title">Add your preference</h3>

                    <div className="preference__add-prefer-container">
                        {filterCategory.map((category, i)=> {
                            return <button 
                                        key={i} 
                                        className="preference__add-prefer-btn" 
                                        onClick={()=>handleCategorySubmmit(category, "add")}>
                                            {category.category.replace(category.category[0], category.category[0].toUpperCase())}
                                    </button>
                        })}
                    </div>
                </div>
            }
            <div className="preference__btn-container">
                {!!userPrefer.length && userPrefer.map((category,i) => {
                    return <button 
                                key={i} 
                                className="preference__btn" 
                                onClick={()=>handleCategorySubmmit(category, "remove")}>
                                    {category.category.replace(category.category[0], category.category[0].toUpperCase())}
                            </button>
                })}
            </div>
        </section>
    )
}

export default Preference