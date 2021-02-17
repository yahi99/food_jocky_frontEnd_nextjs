import React, {useEffect, useState} from "react";
import Banner from "../components/home/banner";
import PopularSlider from "../src/components/home/PopulerSlider";
import About from "../src/components/home/About";
import FindCity from "../src/components/home/FindCity";
import AppDownload from "../src/components/home/AppDownload";
import Faqs from "../src/components/home/Faqs";
import {fetchHomepageData} from "../app/slices/user/actions";
import {useDispatch} from "react-redux";
import MainLayout from "../components/layout";

const Home = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState()
    useEffect(() => {
        if(!loaded) {
            setLoaded(true)
            dispatch(fetchHomepageData({}))
        }
    })

    return (
        <MainLayout>
            <Banner />
            <PopularSlider />
            <About />
            <FindCity/>
            <AppDownload />
            <Faqs />
        </MainLayout>
    )
}


export default Home