import React from "react";

const FoodCategories = ({categories}) => {
    return (
        <section id="restaurant-name-info-arae">
            <div className="setmenu-top-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="set-menu-lists sticky">
                                <ul>
                                    {categories.map((category, index) => (
                                        <li key={index}>
                                            <a onClick={(e) => handleScroll("#category-" + category.name.replace(/\s/g, "-"))}>
                                                {category.name}
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
    )
}

export default FoodCategories

function handleScroll(id) {
    try {
        let com = document.querySelector(id).getBoundingClientRect();
        let bodyRect = document.body.getBoundingClientRect();
        let offset = com.top - bodyRect.top - 140;
        window.scrollTo({ top: offset, left: 0, behavior: "smooth" });
    } catch (e) {

    }
}