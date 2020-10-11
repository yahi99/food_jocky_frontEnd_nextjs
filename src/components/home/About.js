import React from 'react'

const About = () => {
  const AboutData =  { 
    heading:"List your restaurant on FoodJocky",
    para1:"Would you like thousands of new customers to taste your amazing food? So would we!",
    para2:"It,s simple: we list your menu online, help you process orders, pick them up, and deliver them to hungry  people - in a heartbeat!",
    para3:"Interested? Let's start our partnership today!",
    button:"Get started"
  }
 
 return (
  <>
   <section id="about-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-7 offset-lg-5 col-md-8 offset-md-2 col-12">
          <div className="about-area-right-text">
            <h3>{AboutData.heading}</h3>
            <p>{AboutData.para1}</p>
            <p>{AboutData.para2}</p>
            <p>{AboutData.para3}</p>
            <div className="about-food-btn text-right">
            <a href="#" className="btn button-site">{AboutData.button}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
 )
}

export default About
