import React, { useState } from "react";

const BannerImg = "/assets/img/food/food-details-1.jpg";
import { BiMap } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import DetailsData from "./DetailsData";
import MenuItem from "./MenuItem";
import Modal from "react-bootstrap/Modal";
import Heading from "./Heading";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Link from "next/link";

const DetailsNamesArea = {
  RestaurantName: "Shorma House",
  pricesymbole: "$$$",
  Catagory1: "Chinese Resuatrant",
  Catagory2: "Fast Food",
  Tags1: "Bangladeshi",
  Tags2: "Chinese",
  Tags3: "Meal Deals...",
  FoodName1: "MEAL DEALS",
  FoodName2: "RICE ITEMS",
  FoodName3: "MUTTON & CHICKEN",
  FoodName4: "FISH",
  FoodName5: "DRINKS",
  FoodName6: "DESERTS & HALIM",
};

// Data Get Area
function DetailsLayout({ restaurant }) {

    console.log(restaurant);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const mapStyles = {
    height: "30vh",
    width: "100%",
    margin: "30px 0 0 0",
  };
  const defaultCenter = {
    lat: 22.8136822,
    lng: 89.5635596,
  };

  const tagLists = restaurant.tags.map((d) => <li key={d}>{d}</li>);
  const categoryList = restaurant.food_categories.map((food_category) => (
    <li>
      <a href={"#category-" + food_category.name.replace(/\s/g, "-")}>
        {food_category.name}
      </a>
    </li>
  ));

  return (
    <>
      <Modal show={show} onHide={handleClose} id="restaurant-info-modal">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="top-area-restau-info">
              <div className="restaurant-modal-imges">
                <img src={restaurant.cover_img} alt="img" />
              </div>
              <div className="area-modal-resta-name text-center">
                <h3>{restaurant.name}</h3>
                <div className="catagorys-details-area bulate-list">
                  <ul>
                    {restaurant.food_categories.map(category => (
                        <li>{category.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="tags-details-area bulate-list">
                  <ul>
                    {restaurant.tags.map(tag => (
                        <li>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="opning-time-modal">
                  <ul>
                    <li>
                      <span>Open {restaurant.opening_time} </span> - <span>{restaurant.closing_time} </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-area-names-res">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="restaurant-list-modals-area-wrapper">
                    <div className="restaurant-modals-names-list">
                      <h4>About</h4>
                      <p> {restaurant.about } </p>
                    </div>
                    <div className="restaurant-modals-names-list class-margin-0">
                      <h4>Contact</h4>
                      <p>Phone: {restaurant.mobile} </p>
                      <p>Email: {restaurant.email} </p>
                    </div>
                    <div className="restaurant-modals-names-list">
                      <h4>Address</h4>
                      <p>57 Ahsan Ahmed Rd Khulna</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <useLoadScript>
                    <GoogleMap
                      mapContainerStyle={mapStyles}
                      zoom={13}
                      center={defaultCenter}
                    ></GoogleMap>
                  </useLoadScript>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <section id="restaurant-details-banner">
        <div className="restarant-banner-img">
          <img src={restaurant.cover_img} alt="img" />
        </div>
      </section>

      <section id="restaurant-name-info-arae">
        <div className="container">
          <div className="row" onClick={handleShow}>
            <div className="col-lg-8 col-md-10 col-sm-11 col-11">
              <div className="name-catagory-details-area">
                <href
                  data-toggle="modal"
                  data-target="#restaurant-info-modal"
                />
                <div className="names-area-details">
                  <h3>{restaurant.name}</h3>
                </div>
                <div className="catagorys-details-area bulate-list">
                  <ul>
                    <li>{restaurant.restaurant_category}</li>
                  </ul>
                </div>
                <div className="tags-details-area bulate-list">
                  <ul>{tagLists}</ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-2 col-sm-1 col-1">
              <href data-target="#restaurant-info-modal" />
              <div className="info-area-modal">
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 0 512 512"
                    fill="#c8102e"
                    width="20px"
                    data-bubblesppbfhhgcdehhbjigifndnfmcihegokbbprevent-events-conflict-installed="true"
                    data-arp-injected="true"
                  >
                    <path d="m277.332031 128c0 11.78125-9.550781 21.332031-21.332031 21.332031s-21.332031-9.550781-21.332031-21.332031 9.550781-21.332031 21.332031-21.332031 21.332031 9.550781 21.332031 21.332031zm0 0" />
                    <path d="m256 405.332031c-8.832031 0-16-7.167969-16-16v-165.332031h-21.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h37.332031c8.832031 0 16 7.167969 16 16v181.332031c0 8.832031-7.167969 16-16 16zm0 0" />
                    <path d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0" />
                    <path d="m304 405.332031h-96c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h96c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </div>
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
        <div className="setmenu-items-inner-wrapper">
          {restaurant.food_categories.map((food_category) => (
            <div id={"category-" + food_category.name.replace(/\s/g, "-")}>
              <div className="container">
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
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default DetailsLayout;
