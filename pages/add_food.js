import React from "react";
import cookie from "cookie";
import Loader from "../src/components/Common/Loader";
import RestaurantLayout from "../src/components/layouts/ResturantLayout";
import ResAddForm from "../src/components/AddRestaurant/ResAddForm";
import axios from "axios";

function AddFood(props) {
    return (
        <RestaurantLayout>
            <Loader/>
            <ResAddForm foodCategories={props.foodCategories} apiUrl={props.apiUrl}/>
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
    console.log(token)

    const apiUrl = process.env.API_URL
    let postData = {
        token: token
    }

    let response = await axios.post(`${apiUrl}/api/restaurant/verify-restaurant`, postData);
    let foodCategories = response.data.data

    return {
        props: {
            foodCategories,
            apiUrl
        }
    }
}

export default AddFood