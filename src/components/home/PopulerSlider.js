import React from 'react'
import Carousel from "react-elastic-carousel"
import PopulerSliderItem from "../../components/home/PopulerSliderItem"
import SectionHeading from "../home/SectionHeading"
import PopulerSliderData from "../../components/home/PopulerSliderData"

 const PopulerSlider = () => {
  const breakPoints =[ 
    {width:1, itemsToShow:1},
    {width:500, itemsToShow:2},
    {width:768, itemsToShow:4},

  ];
  const sliderData =(val, index) =>{
    return(<PopulerSliderItem heading={val.heading} title={val.title} img={val.img} key={index}/>)
  }
 return (
  <>
    <section id="top_slider">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <SectionHeading heading="Popular Categories" title="Explore and enjoy our top amazing categories"  />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-sm-12 col-md-12 col-12">
          <div className="top_slider_wrap">
           <Carousel breakPoints={breakPoints} pagination={false}>
              {PopulerSliderData.map(sliderData)}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
 )
}
export default PopulerSlider;