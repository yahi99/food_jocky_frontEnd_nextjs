import React from "react";
import Header from "../header";
import Footer from "../footer";

const MainLayout = props => {
    return (
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    )
}

export default MainLayout