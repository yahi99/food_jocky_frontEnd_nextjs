import React from 'react'
import StarRatings from 'react-star-ratings';
const TopRestaurantDetails = props => {

 return (
  <>
   <div className="row">
    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
     <div className="top_res_details_wrapper"> 
       <div className="top_res_details">
         <div className="top_res_heading">
            <h2>{props.restaurant.name}</h2>
         </div>
         <div className="rest_top_catagory">
       <ul>
        {props.restaurant.food_categories.map((data)=>(
          <li>{data.name}</li>
        ))}
       </ul>
         </div>
         <div className="top_start_rating">
         <StarRatings
          rating={5}
          starRatedColor="#f0ad4e"
          starSpacing={5}
          numberOfStars={5}
          starDimension={15}
          name='rating'
        />
         </div>
         <div className="row">
            <div className="col-lg-6 col-md-6 col-dm-12 col-12">
               <div className="areas-opning-list">
                   <ul>
                    <li><strong>Hours:</strong> 11am – 12midnight (Mon-Fri)</li>
                    <li><strong>Featured in:</strong>  Gourmet Pizza</li>
                    <li><strong>Delivery Fees:</strong> Free</li>
                   </ul>
               </div>
            </div>
            <div className="col-lg-6 col-md-6 col-dm-12 col-12">
               <div className="areas-opning-list">
                   <ul>
                <li><strong>Cost for each person:</strong>{props.restaurant.price_type}</li>
                    <li><strong>Minimum Order:</strong> $20</li>
                    <li><strong>Address:</strong> 32,choto Mirzapur Khulna</li>
                   </ul>
               </div>
            </div>
         </div>
       </div>
     </div>
    </div>
   </div>
  </>
 )
}

export default TopRestaurantDetails
