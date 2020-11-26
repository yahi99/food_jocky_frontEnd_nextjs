import React, { useState } from "react";

import MenuItem from "./MenuItem";
import MenuItemTwo from "./MenuItemTwo";
import Cart from "./Cart";

import Heading from "./Heading";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Swal from "sweetalert2";
import TopRestaurantDetails from './TopRestaurantDetails'

function DetailsLayout({ restaurant , user}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

    function handleShow() {
        if(user && user.authenticated && user.authenticated === true) {
            setShow(true);
        } else {
          Swal.fire(
              'Warning',
              "Please Log In",
              'warning'
          )
        }
    }


  const mapStyles = {
    height: "30vh",
    width: "100%",
    margin: "30px 0 0 0",
  };
  const defaultCenter = {
    lat: 22.8136822,
    lng: 89.5635596,
  };

  function handleScroll(id) {
      let com = document.querySelector(id).getBoundingClientRect();
      let bodyRect = document.body.getBoundingClientRect();
      let offset   = com.top - bodyRect.top - 140;
      window.scrollTo({ top:offset, left:0, behavior: 'smooth'});
  }

  const tagLists = restaurant.tags.map((d) => <li key={d}>{d}</li>);
  const categoryList = restaurant.food_categories.map((food_category) => (
    <li>
      <a onClick={ e => handleScroll("#category-" + food_category.name.replace(/\s/g, "-"))}>
        {food_category.name}
      </a>
    </li>
  ));

  return (
    <>
      <section id="restaurant-details-banner" style={{backgroundImage: `url(${restaurant.cover_img})`}}>
        <div className="container">
          <TopRestaurantDetails restaurant={restaurant}/>
        </div>
      </section>

      <section id="restaurant-name-info-arae">
        <div className="setmenu-top-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="set-menu-lists sticky">
                  <ul>{categoryList}</ul>
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
          {restaurant.food_categories.map((food_category) => (
            <div id={"category-" + food_category.name.replace(/\s/g, "-")}>
                <Heading heading={food_category.name} />
                <div className="row">
                  {food_category.foods.map((val) => {
                    return (
                      <MenuItem
                        heading={val.name}
                        person={val.description}
                        currprice={val.price}
                        oldprice={"200"}
                        img={val.dish_img}
                      />
                    );
                  })}
                </div>
            </div>
          ))}
        </div>
            </div>
            <div className="col-lg-4">
                <Cart/>
            </div>
        </div>
          </div>
      </section>
    </>
  );
}

export default DetailsLayout;
