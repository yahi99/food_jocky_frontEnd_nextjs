import React, {useRef} from 'react'
import Carousel from "react-elastic-carousel"
import PopulerSliderItem from "../../components/home/PopulerSliderItem"
import SectionHeading from "../home/SectionHeading"
import {useSelector} from "react-redux";

const PopularSlider = () => {
    const ref = useRef(null);
    let categories = useSelector(state => state.user.categories)
    categories = categories.filter(category => category.restaurant_count > 0)


    const handleNext = item => {
        let frame = ref.current.getCalculatedItemsToShow();
        let length = ref.current.props.children.length;
        if (item.index + frame == length) {
            setTimeout(() => {
                ref.current.goTo(0)
            }, ref.current.props.autoPlaySpeed) // same time
        }
    }

    const breakPoints = [
        {width: 1, itemsToShow: 1},
        {width: 500, itemsToShow: 2},
        {width: 768, itemsToShow: 4},

    ];
    return (
        <>
            <section id="top_slider">
                <div className="container" style={{maxWidth: 1390}}>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <SectionHeading heading="Popular Categories"
                                            title="Explore and enjoy our top amazing categories"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-md-12 col-12">
                            <div className="top_slider_wrap">
                                <Carousel breakPoints={breakPoints} pagination={false} ref={ref} onNextEnd={handleNext}
                                          enableAutoPlay>
                                    {categories.map((category, index) => (
                                        <PopulerSliderItem
                                            id={category._id}
                                            heading={category.name}
                                            title={(category.restaurant_count > 0) ? `${category.restaurant_count} Restaurants`: `${category.restaurant_count} Restaurant`}
                                            img={category.image_url} key={index}/>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default PopularSlider;
