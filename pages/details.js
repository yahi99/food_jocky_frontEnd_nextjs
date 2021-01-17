import DetailsLayout from '../src/components/details/DetailsLayout'
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";
import {getQuery, isUser} from "../src/components/auth";
import {getRestaurant, getSettings} from "../src/components/restaurant/Restaurants";
import React from "react";

function detailsLayout({restaurant,user,settings}) {

    return (
        <Layout user={user}>
            <Loader/>
            <DetailsLayout restaurant={restaurant} user={user} settings={settings}/>
        </Layout>
    ) 

}

export async function getServerSideProps(context) {
    let allSettings = await getSettings()
    let user = await isUser(context);
    let query = getQuery(context);
    if(query.id == undefined) {
        context.res.writeHeader(307, { Location: "/" })
        context.res.end();
    }
    let restaurant = await getRestaurant(query.id);

    if(restaurant.error) {
        context.res.writeHeader(307, { Location: "/" })
        context.res.end();
    }

    let settings = {
        delivery_charge: allSettings.delivery_charge || 0
    }

    return {
        props: {
            settings,
            user,
            restaurant: restaurant.data
        }
    }
}

export default detailsLayout
