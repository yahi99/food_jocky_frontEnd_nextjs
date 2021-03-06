import React from "react";
import Link from "next/link";

const RestaurantData = (props) => {
    let imageDiv = {
        height: 250,
        width: '100%',
    }

    let imageStyle = {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    }


    const tagItems = props.tags.map((d) => (
        <li key={d}>
            <span>{d}</span>
        </li>
    ));

    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 padding-bottom-30">
                <div className="restaurant-list-boxed">
                    <Link href={{pathname: "/details", query: {id: props._id}}}>
                        <a>
                            <div className="restaurant-lists-img" style={imageDiv}>
                                <img src={props.img} alt="no img" style={imageStyle}/>
                            </div>
                            <div className="restaurant-lists-des">
                                <div className="restaurant-name-rating">
                                    <div className="restaurant-names">
                                        <h3>{props.title}</h3>
                                    </div>
                                </div>
                                <div className="restaurant-lists-catagory">
                                    <ul className="category-lists-shows">
                                        <li>
                                            <span>{props.pricesymbole}</span>
                                        </li>
                                        {tagItems}
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

export default RestaurantData;
