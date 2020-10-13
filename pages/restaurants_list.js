import RestaurantListLayout from '../src/components/restaurant/RestaurantListLayout'
import axios from 'axios'
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";

function restaurantList({restaurants, coordinates}) {

    return (
        <Layout>
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

    let postData = {
        "longitude": coordinates.lng,
        "latitude": coordinates.lat || 22.9133613,
        "name": context.query.name || ""
    }


    let restaurants = []

    let response = await axios.post(`${domainUrl}/api/customer/search-restaurants`, postData);
    
    if(response.data.data.length === 0){
        return {
            props: {
                restaurants,
                coordinates
        }
    }

    }else{

      restaurants = response.data.data
      return {
        props: {
            restaurants,
            coordinates
        }
    }
    
    }
      
  
}

export default restaurantList
