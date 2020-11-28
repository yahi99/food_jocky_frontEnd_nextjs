import React, {useState} from "react";
import Layout from "../src/components/layouts/main";
import Cart from "../src/components/Cart/Cart";
import Cookies from "js-cookie";
import Loader from "../src/components/Common/Loader";

const cart = () => {
    const [ order, setOrder ] = useState(JSON.parse(Cookies.get('my_order') || "{}"));

    return (
        <>
            <Layout>
                <Loader/>
                <Cart order={order} setOrder={setOrder}/>
            </Layout>
        </>
    )
}

export default cart;
