import React from "react";
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";
import RestaurantLoginArea from "../src/components/Login/RestaurantLogin";
import cookie from "cookie";
import axios from "axios";

function login(props) {
    return (
        <Layout>
            <Loader/>
            <RestaurantLoginArea apiUrl={props.apiUrl}/>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const apiUrl = process.env.API_URL;


    if( ! ( undefined == context.req  || undefined == context.req.headers || undefined == context.req.headers.cookie)){
        const cookies = cookie.parse(context.req.headers.cookie);
        const token = cookies.token;

        let postData = {
            token: token
        }

        let response = await axios.post(`${apiUrl}/api/restaurant/verify-restaurant`, postData);
        let restaurant = response.data


        if(restaurant.error === false) {
            context.res.writeHeader(307, { Location: "/add_food" })
            context.res.end()
        }
    }

    return {
        props: {
            apiUrl,
        },
    };
}

export default login;