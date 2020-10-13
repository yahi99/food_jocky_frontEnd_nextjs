import React from "react";
import LoginArea from "../src/components/Login/LoginArea";
import Loader from "../src/components/Common/Loader";
import RestaurantLayout from "../src/components/layouts/ResturantLayout";
import ResAddForm from "../src/components/AddRestaurant/ResAddForm";

function AddFood(props) {
    return (
        <RestaurantLayout>
            <Loader/>
            <ResAddForm/>
        </RestaurantLayout>
    );
}

export default AddFood