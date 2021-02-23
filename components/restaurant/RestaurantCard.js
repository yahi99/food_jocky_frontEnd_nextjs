import React from "react";
import Link from "next/link";

const RestaurantCard = (props) => {
    let imageDiv = {
        height: 250,
        width: "100%",
    };

    let imageStyle = {
        height: "100%",
        width: "100%",
        overflow: "hidden",
    };

    return (
        <>

            <div className="restaurant-list-boxed" style={props.style}>
                <Link
                    href={{
                        pathname: "/restaurant",
                        query: {id: props.restaurant._id},
                    }}
                >
                    <a>
                        <div className="restaurant-lists-img" style={imageDiv}>
                            <img
                                src={props.restaurant.thumb_img}
                                alt="no img"
                                style={imageStyle}
                            />
                            <span className="badge-info-area">
                30
                <span className="time-min">min</span>
                </span>
                            <div className="offer-restaurent">
                                <span>{props.restaurant.discount_given_by_restaurant + props.restaurant.discount_given_by_admin}%OFF</span>
                            </div>
                            <button class="favorites-icon" data-testid="favorites-icon">
                                <svg
                                    class="fl-brand-primary"
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    data-testid="favorites-icon-not-favorited"
                                >
                                    <path
                                        d="M16.622 6.32c2.015.959 2.927 3.468 2.037 5.604-1.128 2.365-3.234 4.255-6.317 5.67a.84.84 0 01-.59.036l-.094-.036c-3.083-1.416-5.189-3.305-6.317-5.67-.89-2.136.022-4.645 2.037-5.604 1.459-.695 2.955-.177 4.117.776.063.052.141.12.234.206a.4.4 0 00.541 0c.072-.066.133-.12.183-.163 1.172-.981 2.69-1.523 4.169-.82zM15.87 7.9c-.7-.333-1.582-.085-2.451.72l-.174.167-.962.974a.4.4 0 01-.57 0l-.96-.975c-.92-.934-1.875-1.242-2.623-.886-1.16.552-1.71 2.064-1.21 3.27.844 1.77 2.384 3.253 4.676 4.446l.225.113a.4.4 0 00.358 0c.127-.063.226-.113.296-.15 2.126-1.12 3.593-2.485 4.427-4.047l.142-.28c.511-1.23.034-2.663-1.02-3.271L15.87 7.9z"
                                        fill-rule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="restaurant-lists-des">
                            <div className="restaurant-name-rating">
                                <div className="restaurant-names">
                                    <h3>{props.restaurant.name}</h3>
                                </div>
                                <div className="rating_area">
                    <span className="star_rating">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11">
                        <path d="M9 7.02L9.7 11 6 9.12 2.3 11 3 7.02 0 4.2l4.14-.58L6 0l1.86 3.62L12 4.2z"></path>
                        </svg>
                    </span>
                                    <span>
                        <strong>{((Math.random() * 1.3) + 3.5).toFixed(1)}</strong>
                        /5
                    </span>
                                    <span className="rating-count">
                     ({Math.floor((Math.random() * 25) + 5)})
                    </span>
                                </div>
                            </div>
                            <div className="restaurant-lists-category">
                                <ul className="category-lists-shows">
                                    <li>
                                        <span>{props.restaurant.price_type}</span>
                                    </li>
                                    {props.restaurant.tags.map((tag, index) => (
                                        <li key={index}>
                                            <span>{tag},</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>

        </>
    );
};

export default RestaurantCard;
