import React from "react";
import Banner from "../components/home/banner";
import PopulerSlider from "../src/components/home/PopulerSlider";
import About from "../src/components/home/About";
import FindCity from "../src/components/home/FindCity";
import AppDownload from "../src/components/home/AppDownload";
import Faqs from "../src/components/home/Faqs";
import Layout from "../components/layout";
import Loader from "../src/components/Common/Loader";
import {isUser} from "../src/components/auth";

const Home = () => {
    return (
        <Layout>
            <Banner />
            <PopulerSlider />
            <About />
            <FindCity/>
            <AppDownload />
            <Faqs />
        </Layout>
    )
}


export default Home