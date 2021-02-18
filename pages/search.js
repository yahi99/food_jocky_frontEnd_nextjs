import React, {useEffect, useState} from "react";
import Layout from '../components/layout'
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {fetchRestaurants} from "../app/slices/restaurant/actions";
import RestaurantCard from "../components/restaurant/RestaurantCard";
import {reloadRestaurants} from "../app/slices/restaurant";
import MainLayout from "../components/layout";
import {Spin} from "antd";

const SearchResult = props => {
    let router = useRouter()
    let query = router.query
    let dispatch = useDispatch()
    let [loaded, setLoaded] = useState(false)
    let [type, setType] = useState('restaurant')
    let restaurants = useSelector(state => state.restaurant.restaurants)

    const [search, setSearch] = useState(query.name || '')
    const handleSearchChange = e => setSearch(e.currentTarget.value)

    const showRestaurants = () => {setType('restaurant');reload()}
    const showHomemade = () => {setType('homemade'); reload()}

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
        if (query.lat && !loaded) {
            dispatch(fetchRestaurants({lat: +query.lat, lng: +query.lng, name: search, type}))
            setLoaded(true)
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
                                        <a className={ type === 'restaurant' ?  'active-list' : ''} onClick={showRestaurants}>Restaurant</a>
                                    </li>
                                    <li className="home-made-img">
                                        <a className={ type === 'homemade' ?  'active-list' : ''} onClick={showHomemade}>Homemade</a>
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
                        <div className="restaurant-wrapper-heading">
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
                                {restaurants.data.map((restaurant, index) => (
                                    <RestaurantCard restaurant={restaurant} key={index}/>
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