import React from 'react'

function MenuItem(props) {
 return (
  <>
    <div className="col-lg-6 col-md-12 col-12">
                <div className="setmenu-items-inner-area">
                  <div className="setmenu-left-side-inner-arae">
                        <h4>{props.heading}</h4>
                    <p>{props.person}</p>
                    <h5>{props.currprice} <del>{props.oldprice}</del></h5>
                  </div>
                  <div className="setmenu-item-inner-img">
                   <img src={props.img} alt="img" />
                  </div>
                </div>
              </div>
  </>
 )
}

export default MenuItem
