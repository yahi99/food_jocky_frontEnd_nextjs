import React from 'react'
import { BsCheckCircle } from "react-icons/bs";

 const Faqs = () => {
 return (
  <>
    <section id="details-area">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="details-top-area">
            <h3>Order food from the best restaurants with FoodJocky Bangladesh</h3>
            <p>Are you hungry? Did you have a long and stressful day? Interested in getting a cheesy pizza delivered to
              your home or office? Then foodjocky Bangladesh is the right destination for you! foodjocky offers you a
              long and detailed list of the best restaurants and local favourites near you to help satisfy your hunger
              through our online food delivery service. Cuisines are diverse: whether you fancy a juicy burger from
              Takeout, fresh sushi from Samdado or peri peri chicken from Nando's, foodjocky Bangladesh has a wide range
              of 2000+ restaurants available from Dhaka, to Chittagong through to Sylhet. From a healthy lunch to
              evening snacks to a hearty dinner, foodjocky provides you with the means to satisfy your cravings
              throughout the day. Sit back and relax - let foodjocky Bangladesh take the pressure off your shoulders.
            </p>
          </div>
          <div className="details-para-area">
            <h3>Why choose foodjocky?</h3>
            <ul>
              <li><span><i><BsCheckCircle/></i></span> More options: Food delivery from 2000+ restaurants in Dhaka,
                Chittagong and Sylhet in Bangladesh.
                Order from a wide range of cuisines ranging from fast food, to sushi, to cakes.</li>
              <li><span><i><BsCheckCircle/></i></span> Various offers: Indulge in the endless discounts and offers
                available from top restaurants.</li>
              <li><span><i><BsCheckCircle/></i></span>Payment options: Payment made easier with cash on delivery
                and online payment options </li>
              <li><span><i><BsCheckCircle/></i></span> A simple 4-step food ordering process: Search → Choose → Pay
                → Enjoy</li>
            </ul>
          </div>
          <div className="details-para-area">
            <h3>Choose from over 25 cuisines and order online now!</h3>
            <p>The Foodjocky experience, starting from the first step of choosing your location to receiving the food,
              is guaranteed to satisfy each and every customer. Want some Indian, Mexican or Middle Eastern food? Take
              your tastebuds on a journey around the world with the vast range of cuisines made available to you at your
              fingertips. Order your favourite soup, salad, sandwich or dessert from the finest restaurants in your area
              and receive home delivery, without going through the hassle of fighting through traffic. Let foodjocky
              take care of it.

            </p>
          </div>
          <div className="details-para-area">
            <h3>Home delivery via foodjocky mobile app</h3>
            <p>Even while on the move, you can order food online anytime and anywhere, thanks to the foodjocky mobile
              app for iOS, Android and Windows Phone devices. Simple, fast and convenient - the best way to sum up the
              online food ordering process through foodjocky Bangladesh. With an impressive choice of restaurants
              offering up a mouth-watering array of cuisines, foodjocky Bangladesh is confident that you will find just
              what you are looking for. To order food online, select your local area and you will be presented with the
              restaurants that deliver in your vicinity. Browse through the menus, and make your choices. Once you have
              completed your order, the chosen restaurant will prepare your selection while you put your feet up, relax
              and await your food delivery.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
 )
}
export default Faqs
