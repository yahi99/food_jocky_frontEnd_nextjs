import React, {useEffect, useState} from 'react'
import MainLayout from "../components/layout";
import {useDispatch, useSelector} from "react-redux";
import {categoryRestaurants} from "../app/slices/restaurant/actions";
import RestaurantCard from "../components/restaurant/RestaurantCard";

const CategorySearch = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (!loaded) {
            setLoaded(true)
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            dispatch(categoryRestaurants({id}))
        }
    })

    let restaurants = useSelector(state => state.restaurant.restaurants)
    return (
        <MainLayout>
            <section>
                <div className="container">
                    <div className="restaurant-list-wrapper">
                        <div className="restaurant-wrapper-heading">
                            <h2>Restaurants</h2>
                        </div>
                        {restaurants.loading && (
                            <div className="modal-body text-center">
                                <div className="loader"></div>
                                <div className="loader-txt">
                                    <p>Loading</p>
                                </div>
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

export default CategorySearch