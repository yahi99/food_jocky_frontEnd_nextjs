import DetailsLayout from '../src/components/details/DetailsLayout'
import axios from 'axios'

function detailsLayout({restaurant}) {

  return (
    <div>
      <DetailsLayout restaurant={restaurant}/>
    </div>
  )
  
}

export async function getServerSideProps(context) {
  
  const url = require('url')
  const parsedUrl = url.parse(context.req.url, true)

  const domainUrl = process.env.API_URL
  let postData = {
    _id: parsedUrl.query.id
  }
  let restaurant = {}

  let response = await axios.post(`${domainUrl}/api/customer/find-one-restaurants`, postData);
  
  restaurant = response.data.data
    return {
      props: {
        restaurant
      }
  }
    

}

export default detailsLayout