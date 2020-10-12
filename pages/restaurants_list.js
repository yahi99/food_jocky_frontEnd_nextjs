import RestaurantListLayout from '../src/components/restaurant/RestaurantListLayout'
import axios from 'axios'

function restaurantList({restaurants}) {

  return (
    <div>
      <RestaurantListLayout restaurants={restaurants}/>
    </div>
  )
}

export async function getServerSideProps(context) {

    const domainUrl = process.env.API_URL
    let postData = {
      "longitude": context.query.lng || 89.46612009999998,
      "latitude": context.query.lat || 22.9133613
    }
    let restaurants = []

    let response = await axios.post(`${domainUrl}/api/customer/get-all-restaurants`, postData);
    
    if(response.data.data.length === 0){
      return {
        props: {
          restaurants
        }
    }

    }else{

      restaurants = response.data.data
      return {
        props: {
          restaurants
        }
    }
    
    }
      
  
}

export default restaurantList
