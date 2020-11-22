import React from 'react'
import {HelpData} from './HelpData'

const Order_Help_Content = () => {
 return (
  <>
      <div className="help_area_one">
      <h2>Help with an order</h2>
      <div className="row">
      {HelpData.map(data=>(
      <div className="col-lg-6">
      <div className="helps-text-inner">
      <h3>{data.heading}</h3>
      <ul>
      {data.list.map(data=>(
      <li><a href="#!">{data}</a></li>
      ))}
      </ul>
      </div>
      </div>
      ))}
      </div>
      </div>
  </>
 )
}

export default Order_Help_Content
