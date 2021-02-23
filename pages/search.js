import React, {useEffect, useState} from "react";
import Layout from '../components/layout'
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {fetchRestaurants} from "../app/slices/restaurant/actions";
import RestaurantCard from "../components/restaurant/RestaurantCard";
import {reloadRestaurants} from "../app/slices/restaurant";
import MainLayout from "../components/layout";
import Slider from "react-slick";
import {Spin} from "antd";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";


const SearchResult = () => {
    let router = useRouter()
    let dispatch = useDispatch()
    let [loaded, setLoaded] = useState(false)
    let [type, setType] = useState('restaurant')
    let restaurants = useSelector(state => state.restaurant.restaurants)

    const [search, setSearch] = useState('')
    const handleSearchChange = e => setSearch(e.currentTarget.value)

    const showRestaurants = () => {
        setType('restaurant');
        reload()
    }
    const showHomemade = () => {
        setType('homemade');
        reload()
    }

    const reload = () => {
        dispatch(reloadRestaurants(null))
        setLoaded(false)
    }

    function handleSearch(e) {
        if (e.key === 'Enter') {
            reload()
        }
    }

    useEffect(() => {
        if (!loaded) {
            setLoaded(true)
            const urlParams = new URLSearchParams(window.location.search);
            const lat = urlParams.get('lat');
            const lng = urlParams.get('lng');
            dispatch(fetchRestaurants({lat: +lat, lng: +lng, name: search, type}))
        }
    })

    return (
        <MainLayout>
            <section id="search-area-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="search-top-area-wrapper">
                                <ul id="top-select-area">
                                    <li className="restaurant-img">
                                        <a className={type === 'restaurant' ? 'active-list' : ''}
                                           onClick={showRestaurants}>Restaurant</a>
                                    </li>
                                    <li className="home-made-img">
                                        <a className={type === 'homemade' ? 'active-list' : ''}
                                           onClick={showHomemade}>Homemade</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="search-filter-area">
                                <div className="input-group" id="adv-search">
                                    <input type="text" className="form-control search-shadow"
                                           placeholder="Search for restaurant, cuisines, and dishes" value={search}
                                           onChange={handleSearchChange} onKeyDown={handleSearch}/>
                                    <i className="icon_search_filter">
                                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor"
                                             strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="restaurant-list-wrapper">
                        <Sliders title="Top Restaurants" restaurants={restaurants.top}/>

                        <div className="restaurant-wrapper-heading mb-2">
                            <h2>
                                {type === 'restaurant' ? "All Restaurant" : "All Homemade"}
                            </h2>
                        </div>
                        {restaurants.loading && (
                            <div className="modal-body text-center">
                                <Spin size="large" wrapperClassName="loader-spin"/>
                            </div>
                        )}
                        {(!restaurants.loading && !restaurants.error) && (
                            <div className="row">
                                {restaurants.all.map((restaurant, index) => (
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-12 padding-bottom-30">
                                        <RestaurantCard restaurant={restaurant} key={index}/>
                                    </div>

                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default SearchResult


const Sliders = ({title, restaurants}) => {

    if(restaurants.length < 3) {
        return ""
    }

    const arrowStyle = {
        backgroundColor: '#c8102f',
        height: 30,
        width: 24,
        marginTop: -30
    }

    let prev = (
        <div>
            <div
                style={{...arrowStyle, marginLeft: -10}}
                className="disabled-none">
                <MdKeyboardArrowLeft color={'#fff'} size={24} style={{height: 30}}/>
            </div>
        </div>
    )
    let next = (
        <div>
            <div
                style={{...arrowStyle, marginLeft: 8}}
                className="disabled-none">
                <MdKeyboardArrowRight color={'#fff'} size={24} style={{height: 30}}/>
            </div>
        </div>
    )


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        prevArrow: prev,
        nextArrow: next,
        responsive: [
            {
                breakpoint: 996,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    initialSlide: 2,
                    autoplay: true,
                    infinite: true,
                }
            }
        ]
    };

    return (
        <div className="restaurant-wrapper-heading mb-5">
            <h2 className="mb-0">
                {title}
            </h2>
            <div>
                <Slider {...settings}>
                    {restaurants.map((restaurant, index) => (
                        <div className="my-3">
                            <RestaurantCard restaurant={restaurant} key={index}
                                            style={{boxShadow: '0px 0px 12px -3px #c8102e2b'}}/>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}