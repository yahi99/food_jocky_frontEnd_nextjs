import React from "react";
import Banner from "../src/components/home/Banner";
import PopulerSlider from "../src/components/home/PopulerSlider";
import About from "../src/components/home/About";
import FindCity from "../src/components/home/FindCity";
import AppDownload from "../src/components/home/AppDownload";
import Faqs from "../src/components/home/Faqs";
import Layout from "../src/components/layouts/main";
import Loader from "../src/components/Common/Loader";
import cookie from "cookie";
import axios from "axios";

export default function Home(props) {
    return (
        <Layout user={props.user}>
            <Loader/>
            <Banner />
            <PopulerSlider />
            <About />
            <FindCity/>
            <AppDownload />
            <Faqs />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    if( ! ( undefined === context.req.headers.cookie ) ){
        const cookies = cookie.parse(context.req.headers.cookie);
        const token = cookies.token;
        const apiUrl = process.env.API_URL
        let postData = {
            token: token
        }
        let response = await axios.post(`${apiUrl}/api/customer/verify-token`, postData);
        let user = response.data
        if( false === user.error ) {
            return {
                props: {
                    user: {
                        authenticated: true,
                        name: user.data.full_name
                    }
                }
            }
        }
    }


    return {
        props: {
            user: {
                authenticated: false,
            }
        }
    }
}
