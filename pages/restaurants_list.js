import RestaurantListLayout from '../src/components/restaurant/RestaurantListLayout'
import axios from 'axios'
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";
import cookie from "cookie";

function restaurantList({restaurants, coordinates, user}) {

    return (
        <Layout user={user}>
            <Loader/>
            <RestaurantListLayout restaurants={restaurants} coordinates={coordinates}/>
        </Layout>
  )
}

export async function getServerSideProps(context) {

    const domainUrl = process.env.API_URL
    let coordinates = {
        lat: context.query.lat || 22.9133613,
        lng: context.query.lng || 89.46612009999998
    }


    let user = { authenticated: false }
    if( ! ( undefined === context.req.headers.cookie ) ){
        const cookies = cookie.parse(context.req.headers.cookie);
        const token = cookies.token;
        const apiUrl = process.env.API_URL
        let postData = {
            token: token
        }
        let response = await axios.post(`${apiUrl}/api/customer/verify-token`, postData);
        let userResponse = response.data
        if( false === userResponse.error ) {
            user = {
                authenticated: true,
                name: userResponse.data.full_name
            }
        }
    }



    let postData = {
        "longitude": coordinates.lng,
        "latitude": coordinates.lat || 22.9133613,
        "name": context.query.name || "",
        "restaurant_or_homemade": context.query.type || "restaurant"
    }


    let restaurants = []

    let response = await axios.post(`${domainUrl}/api/customer/search-restaurants`, postData);

    if(response.data.data.length === 0){
        return {
            props: {
                restaurants,
                coordinates,
                user
        }
    }

    }else{

      restaurants = response.data.data
      return {
        props: {
            restaurants,
            coordinates,
            user
        }
    }
    
    }
      
  
}

export default restaurantList
