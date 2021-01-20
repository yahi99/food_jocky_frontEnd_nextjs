import StarRatings from "react-star-ratings";
import React from "react";

const RestaurantBanner = ({restaurant}) => {
    let bannerStyle = {
        backgroundImage: `url(${restaurant.cover_img})` ,
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center"
    }

    return (
        <section id="restaurant-details-banner" style={bannerStyle}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                        <div className="top_res_details_wrapper">
                            <div className="top_res_details">
                                <div className="top_res_heading">
                                    <h2>{restaurant.name}</h2>
                                </div>
                                <div className="rest_top_catagory">
                                    <ul>
                                        {restaurant.food_categories.map((data) => (
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
                                                <li><strong>Featured in:</strong></li>
                                                <li><strong>Delivery Fees:</strong> Free</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-dm-12 col-12">
                                        <div className="areas-opning-list">
                                            <ul>
                                                <li><strong>Cost for each person:</strong> {restaurant.price_type}
                                                </li>
                                                <li><strong>Minimum Order:</strong> BDT 50</li>
                                                <li><strong>Address:</strong> {restaurant.address.address}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RestaurantBanner