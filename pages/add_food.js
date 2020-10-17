import React from "react";
import cookie from "cookie";
import Loader from "../src/components/Common/Loader";
import RestaurantLayout from "../src/components/layouts/ResturantLayout";
import ResAddForm from "../src/components/AddRestaurant/ResAddForm";
import axios from "axios";
import {error} from "next/dist/build/output/log";

function AddFood(props) {
    return (
        <RestaurantLayout restaurantName={props.restaurantName}>
            <Loader/>
            <section className="customer_food_add">
                <div className="container">
                    <ResAddForm foodCategories={props.foodCategories} apiUrl={props.apiUrl} />
                </div>
            </section>
        </RestaurantLayout>
    );
}

export async function getServerSideProps(context) {
    if(undefined === context.req.headers.cookie){
        context.res.writeHeader(307, { Location: "/restaurant_login" })
        context.res.end()
    }
    const cookies = cookie.parse(context.req.headers.cookie);
    const token = cookies.token;

    const apiUrl = process.env.API_URL
    let postData = {
        token: token
    }

    console.log(token);

    let response = await axios.post(`${apiUrl}/api/restaurant/verify-restaurant`, postData);
    let restaurant = response.data

    if(restaurant.error == true ) {
        context.res.writeHeader(307, { Location: "/restaurant_login" })
        context.res.end()
    }

    let foodCategories = restaurant.data;

    return {
        props: {
            foodCategories,
            apiUrl,
            restaurantName: "aaaa"
        }
    }
}

export default AddFood