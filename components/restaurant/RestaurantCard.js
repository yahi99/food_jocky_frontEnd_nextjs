import React from "react";
import Link from "next/link";

const RestaurantCard = (props) => {
    let imageDiv = {
        height: 250,
        width: '100%',
    }

    let imageStyle = {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    }

    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 padding-bottom-30">
                <div className="restaurant-list-boxed">
                    <Link href={{pathname: "/restaurant", query: {id: props.restaurant._id}}}>
                        <a>
                            <div className="restaurant-lists-img" style={imageDiv}>
                                <img src={props.restaurant.thumb_img} alt="no img" style={imageStyle}/>
                            </div>
                            <div className="restaurant-lists-des">
                                <div className="restaurant-name-rating">
                                    <div className="restaurant-names">
                                        <h3>{props.restaurant.name}</h3>
                                    </div>
                                </div>
                                <div className="restaurant-lists-category">
                                    <ul className="category-lists-shows">
                                        <li>
                                            <span>{props.restaurant.price_type}</span>
                                        </li>
                                        {props.restaurant.tags.map((tag, index) => (
                                            <li key={index}>
                                                <span>{tag}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default RestaurantCard;
