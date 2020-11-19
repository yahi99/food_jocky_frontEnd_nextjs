import React from 'react'
import Loader from "../src/components/Common/Loader";
import Layout from "../src/components/layouts/main";
import Order_Help from "../src/components/Order_Help/Order_Help";

const order_help = () => {
 return (
  <>
    <Layout>
        <Loader/>
        <Order_Help/>
      </Layout>
  </>
 )
}

export default order_help
