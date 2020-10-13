import React from "react";
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";
import RestaurantLoginArea from "../src/components/Login/RestaurantLogin";

function login(props) {
    return (
        <Layout>
            <Loader/>
            <RestaurantLoginArea apiUrl={props.apiUrl}/>
        </Layout>
    );
}

export async function getStaticProps(context) {
    const apiUrl = process.env.API_URL;
    return {
        props: {
            apiUrl,
        },
    };
}

export default login;