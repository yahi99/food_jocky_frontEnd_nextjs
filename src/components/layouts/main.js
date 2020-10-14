import React from "react";

import Header from './header/Header'
import Footer from './footer/Footer'

function Layout({ children, user }) {
  return <div>
    <Header user={user}/>
    {children}
    <Footer />
  </div>;
}

export default Layout;
