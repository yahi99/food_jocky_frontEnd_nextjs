import React from "react";
import Food from "./Food";
import {useSelector} from "react-redux";
import CartTable from "../cart/table";
import Swal from "sweetalert2";
import {useRouter} from "next/router";

const FoodsWithCart = ({restaurant}) => {
    let router = useRouter()
    let cart = useSelector(state => state.restaurant.cart)
    let user = useSelector(state => state.user)
    const handleOrder = () => {
        if(!user.auth) {
            Swal.fire('Warning', "Please log in to place order", 'warning').then (() => {
                router.push('/login').then(() => {})
            })
        } else {
            router.push('/cart').then(() => {})
        }
    }

    return (
        <section id="Top_cata_food_area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="setmenu-items-inner-wrapper">
                            {restaurant.food_categories.map((category, index) => (
                                <div id={"category-" + category.name.replace(/\s/g, "-")} key={index}>
                                    <div className="heading-arae-setmenu">
                                        <h2>{category.name}</h2>
                                    </div>
                                    <div className="row">
                                        {category.foods.map((food, index) => {
                                            return <Food food={food} category_id={category._id} key={index}/>;
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {cart.foods && (
                        <div className="col-lg-5">
                            <div className="scroll_topCart_area">
                            <div className="Catr-Heading">
                                <h2>My Cart</h2>
                            </div>
                            <div className="Cart_area_wrappers">
                                <div className="Cart_top_area">
                                    <h4>{cart.restaurant_name}</h4>
                                    <h5>{cart.foods.length} Items Added</h5>
                                </div>

                                <CartTable cart={cart}/>

                                <div className="Orders-Button">
                                    <a className="btn button-site" onClick={handleOrder}>
                                        Place Order
                                    </a>
                                </div>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default FoodsWithCart