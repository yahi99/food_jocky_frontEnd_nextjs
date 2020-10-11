import React from 'react'
import ResAddForm from './ResAddForm'
import Categories from '../FoodCategories/Categories'
import NewRestaurantForm from '../NewRestaurant/NewRestaurantForm'


const PageLayout=()=> {
 return (
  <>
    <section className="customer_food_add">
     <div className="container">
       <Categories/> 
     </div>
  </section>
  </>
 )
}

export default PageLayout
