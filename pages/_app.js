import '../styles/globals.css'
import React from 'react'
import "bootstrap-css-only/css/bootstrap.min.css"

import "../public/assets/css/style.css"
import "../public/assets/css/color.css"
import "../public/assets/css/responsive.css"
import'mdbreact/dist/css/mdb.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />

}

export default MyApp
