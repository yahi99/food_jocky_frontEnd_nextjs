import '../styles/globals.css'
import React from 'react'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../public/assets/css/style.css"
import "../public/assets/css/color.css"
import "../public/assets/css/responsive.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import'mdbreact/dist/css/mdb.css'

import Layout from "../src/components/layouts/main";

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
