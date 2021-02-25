import React, {useEffect, useState} from "react";
import Header from "../header";
import Footer from "../footer";
import {loadCart} from "../../app/slices/restaurant";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../app/slices/user/actions";
import {fetchSettings} from "../../app/slices/order/actions";

const MainLayout = props => {
    const [loaded, setLoaded] = useState(false)
    let dispatch = useDispatch()
    let user = useSelector(state => state.user)
    let settings = useSelector(state => state.order.settings)
    useEffect(() => {
        if(!loaded) { 
            setLoaded(true)
            dispatch(loadCart({}))
            dispatch(fetchSettings({}))
            if(user.loaded === false) {
                dispatch(fetchUser({}))
            }
        }
    })
    if(!settings.loaded) {
        return <></>
    }

    return (
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    )
}

export default MainLayout