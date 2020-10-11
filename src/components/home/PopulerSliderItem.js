import React from 'react'
import Link from 'next/link'


 const PopulerSliderItem = (props) => {
 return (
  <>
           <div className="top_slider_item box-shadow">
              <Link href="/">
                <a>
                <div className="top_slider_img">
                <img src={props.img}/>
                </div>
                <h5 key={props.heading}>{props.heading}</h5>
                <p key={props.title}>{props.title}</p>
                </a>
              </Link>
            </div>
  </>
 )
}
export default PopulerSliderItem;