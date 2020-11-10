import React from 'react'
import SectionHeading from "../home/SectionHeading"
import CityCard from '../home/CityCard'
import CityData from '../home/CityData'

const FindCity = () => {
 const cityDatas = (val, index) =>{
   return(<CityCard ciytname={val.cityName} imgsrc={val.img} key={index}/>)
 }
 return (
  <>
    <section id="city-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <SectionHeading heading=" Find us all over Bangladesh" title="Explore and find desired food and restaurant"  />
        </div>
      </div>
      <div className="row">
       {CityData.map(cityDatas)}
      </div>
    </div>
  </section>
  </>
 )
}

export default FindCity
