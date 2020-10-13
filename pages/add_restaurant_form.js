import React from 'react'
import NewRestaurantForm from "../src/components/NewRestaurant/NewRestaurantForm";
import Layout from "../src/components/layouts/main";
import Loader from "../src/components/Common/Loader";

function AddRestaurant() {
    return (
        <Layout>
            <Loader/>
            <NewRestaurantForm/>
        </Layout>
    )
}

export default AddRestaurant