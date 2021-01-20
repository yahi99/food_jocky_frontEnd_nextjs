import React from "react";
import Food from "./Food";
import CartTable from "../../src/components/Common/Cart/table";
import Link from "next/link";
import Swal from "sweetalert2";

const FoodsWithCart = ({restaurant}) => {
    return (
        <section id="Top_cata_food_area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
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
                    <div className="col-lg-4">
                        <div className="Catr-Heading">
                            <h2>My Cart</h2>
                        </div>
                        <div className="Cart_area_wrappers">
                            <div className="Cart_top_area">
                                <h4>{props.order.restaurant_name}</h4>
                                <h5>{props.order.orders.length} Items Added</h5>
                            </div>
                            <CartTable order={props.order} setOrder={props.setOrder} delivery_charge={props.settings.delivery_charge || 0}/>
                            <div className="Orders-Button">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FoodsWithCart