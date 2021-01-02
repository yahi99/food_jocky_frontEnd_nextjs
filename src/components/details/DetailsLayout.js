import React, {useState} from "react";
import MenuItem from "./MenuItem";
import Cart from "./Cart";
import Heading from "./Heading";
import TopRestaurantDetails from "./TopRestaurantDetails";
import Cookies from 'js-cookie'

function DetailsLayout({ restaurant, user }) {

    const [ order, setOrder ] = useState(JSON.parse(Cookies.get('my_order') || "{}"));

    function handleScroll(id) {
        let com = document.querySelector(id).getBoundingClientRect();
        let bodyRect = document.body.getBoundingClientRect();
        let offset = com.top - bodyRect.top - 140;
        window.scrollTo({ top: offset, left: 0, behavior: "smooth" });
    }

    let bannerStyle = {
        backgroundImage: `url(${restaurant.cover_img})` ,
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center"
    }

    return (
        <>
            <section id="restaurant-details-banner" style={bannerStyle}>
                <div className="container">
                    <TopRestaurantDetails restaurant={restaurant} />
                </div>
            </section>

            <section id="restaurant-name-info-arae">
                <div className="setmenu-top-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="set-menu-lists sticky">
                                    <ul>
                                        {restaurant.food_categories.map((food_category, index) => (
                                        <li key={index}>
                                            <a onClick={(e) => handleScroll("#category-" + food_category.name.replace(/\s/g, "-"))}>
                                                {food_category.name}
                                            </a>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="Top_cata_food_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="setmenu-items-inner-wrapper">
                                {restaurant.food_categories.map((food_category, index) => (
                                    <div id={"category-" + food_category.name.replace(/\s/g, "-")} key={index}>
                                        <Heading heading={food_category.name} />
                                        <div className="row">
                                            {food_category.foods.map((val, index) => {
                                                return <MenuItem item={val} restaurant={restaurant} category_id={food_category._id} setOrder={setOrder} key={index}/>;
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <Cart order={order} setOrder={setOrder} restaurant={restaurant} user={user}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default DetailsLayout;
