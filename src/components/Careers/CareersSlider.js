import React, {useState} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
const CareersSlider = () => {
 const [slider , setSlider ] = useState(0);


 var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1
};
 return (
  <>
     <Slider ref={slide => setSlider(slide)} {...settings}>
      <div>
        <img src="/assets/img/careers/a.png" alt="img" />
      </div>
      <div>
      <img src="/assets/img/careers/b.png" alt="img" />
      </div>
      <div>
      <img src="/assets/img/careers/a.png" alt="img" />
      </div>
      <div>
      <img src="/assets/img/careers/b.png" alt="img" />
      </div>
      <div>
      <img src="/assets/img/careers/a.png" alt="img" />
      </div>
      <div>
      <img src="/assets/img/careers/b.png" alt="img" />
      </div>
    </Slider>
    <div className="arrows-area">
    <AiOutlineArrowLeft onClick={slider.slickPrev}/>
    <AiOutlineArrowRight onClick={slider.slickNext}/>
    </div>
  </>
 )
}

export default CareersSlider
