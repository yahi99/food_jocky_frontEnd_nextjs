import React from 'react'


const CityCard = (props) => {
 return (
  <>
         <div className="col-lg-3 col-md-4 col-sm-6 col-12 py-3">
          <div className="location-selcet-area">
            <a href="#!">
              <div className="location-sel-img ">
                <img src= {props.imgsrc} /> 
                </div>
              <div className="area-location-bottom">
                 <h4>{props.ciytname}</h4>
                <i> <svg className="svg-stroke-container" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                    viewBox="0 0 20 18">
                       <g fill="none" fillRule="evenodd" stroke="#FFFFFF" strokeWidth="2" transform="translate(1 1)"
                      strokeLinecap="round">
                      <path d="M0,8 L17.5,8"></path>
                      <polyline points="4.338 13.628 15.628 13.628 15.628 2.338" strokeLinejoin="round"
                        transform="rotate(-45 9.983 7.983)"></polyline>
                    </g>
                  </svg>
                  </i>
              </div>
            </a>
          </div>
        </div>
  </>
 )
}

export default CityCard
