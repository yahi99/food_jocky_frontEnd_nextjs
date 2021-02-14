import React from 'react'
import Layout from "../src/components/layouts/main";
import AddRestaurant from '../src/components/AddYourRestaurant/AddRestaurant'
import MainLayout from "../components/layout";

const add_your_restaurant = () => {
    return (
        <>
            <MainLayout>
                <AddRestaurant/>
            </MainLayout>
        </>
    )
}

export default add_your_restaurant
