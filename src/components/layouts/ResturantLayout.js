import React from "react";

import RestaurantHeader from "./header/ResturantHeader";
import Footer from './footer/Footer'

function RestaurantLayout({ children, restaurantName }) {
    return <div>
        <RestaurantHeader restaurantName={restaurantName}/>
        {children}
        <Footer />
    </div>;
}

export default RestaurantLayout;
