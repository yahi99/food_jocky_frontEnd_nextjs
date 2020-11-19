import React from 'react'
import DealsHeading from '../Deals/DealsHeading'
import TopTable from '../Deals/TopTable'
import FoodDealsArea from '../Deals/FoodDealsArea'
const Deals = () => {
 return (
  <> 
   <section id="deals-wrappers">
     <div className="container">
      <div className="row">
        <div className="col-lg-12">
        <DealsHeading heading="FoodJocky Bangladesh Discounts & Promos" para={(<>Tired of having the same old home-cooked food every day!
                Enjoy up to 50% off on all top restaurants in the country only on Foodjocky.
                We have got a lot of <span>vouchers, discounts, and promotions</span> for you to enjoy the whole year!</>)}/>
        <DealsHeading heading="Save up to 15% on pick-up orders No code needed !!" className="area-secend" para={(<>Switch to pick-up order and self-collect your food to get special discount!
                Order for pick up now to enjoy <span> up to 15% off*</span> , no code needed .</>)}/>
        <TopTable/>
          <FoodDealsArea/>
        </div>
      </div>
     </div>
   </section>
  </>
 )
}

export default Deals
