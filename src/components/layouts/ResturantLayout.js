import React from "react";

import RestaurantHeader from "./header/ResturantHeader";
import Footer from './footer/Footer'

function RestaurantLayout({ children }) {
    return <div>
        <RestaurantHeader />
        {children}
        <Footer />
    </div>;
}

export default RestaurantLayout;
