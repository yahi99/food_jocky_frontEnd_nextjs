import MainLayout from "../components/layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {fetchRestaurant} from "../app/slices/restaurant/actions";
import RestaurantBanner from "../components/restaurant/RestaurantBanner";
import FoodCategories from "../components/restaurant/FoodCategories";
import FoodsWithCart from "../components/restaurant/FoodsWithCart";

const Restaurant = () => {
    const [loaded, setLoaded] = useState(false)
    let router = useRouter()
    let dispatch = useDispatch()
    let restaurant = useSelector(state => state.restaurant.restaurant)

    useEffect(() => {
        if(!loaded) {
            setLoaded(true)
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            if(id && id.length === 24) {
                dispatch(fetchRestaurant({id}))
            } else {
                router.push('/').then(() =>{})
            }
        }

    })
    if(restaurant.loading) {
        return (
            <MainLayout>
                <div className="modal-body text-center" style={{height: '50vh', marginTop: '20vh'}}>
                    <div className="loader"></div>
                    <div clas="loader-txt">
                        <p>Loading</p>
                    </div>
                </div>
            </MainLayout>
        )
    }

    if(restaurant.error) {
        return (
            <MainLayout>
                <div className="flex justify-content-center">
                    {restaurant.msg}
                </div>
            </MainLayout>
        )
    }


    return (
        <MainLayout>
            <RestaurantBanner restaurant={restaurant.data}/>
            <FoodCategories categories={restaurant.data.food_categories}/>
            <FoodsWithCart restaurant={restaurant.data}/>
        </MainLayout>
    )
}

export default Restaurant