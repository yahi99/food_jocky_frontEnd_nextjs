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
import {isUser} from "../src/components/auth";

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
    let user = await isUser(context);

    return {
        props: {
            user
        }
    }
}
