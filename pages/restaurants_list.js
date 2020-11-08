import RestaurantListLayout from '../src/components/restaurant/RestaurantListLayout'
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";
import React from "react";
import {getQuery, isUser} from "../src/components/auth";
import {restaurantSearch} from "../src/components/restaurant/Restaurants";

function restaurantList({ restaurants, user}) {

    return (
        <Layout user={user}>
            <Loader/>
            <RestaurantListLayout restaurants={restaurants}/>
        </Layout>
  )
}

export async function getServerSideProps(context) {
    let user = await isUser(context);
    let query = getQuery(context);
    if(undefined == query.lat || undefined == query.lng) {
        context.res.writeHeader(307, { Location: "/" })
        context.res.end();
    }
    let restaurants = await restaurantSearch(+query.lat, +query.lng, query.name || "", query.type || "restaurant");


    return {
        props: {
            restaurants,
            user
        }
    }
  
}

export default restaurantList
