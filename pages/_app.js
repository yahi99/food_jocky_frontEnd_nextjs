import React from 'react'
import "bootstrap-css-only/css/bootstrap.min.css"
import 'mdbreact/dist/css/mdb.css'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import "../public/assets/css/style.css"
import "../public/assets/css/color.css"
import "../public/assets/css/responsive.css"



import {Provider} from "react-redux";
import store from "../app/store";
import Loader from "../components/loader";


function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <Loader/>
            <Component {...pageProps} />
        </Provider>
    )

}

export default MyApp
