import React, {useState} from 'react'
import SelectRestaurantAndHomeMade from './SelectRestaurantAndHomeMade'
import RestaurantCard from './RestaurantCard'
import RestaurantData from './RestaurantData'
import RestaurantItemFixed from './RestaurantItemFixed'
import Collapse from 'react-bootstrap/Collapse'
import Router, {useRouter} from "next/router";
 
function RestaurantListLayout({restaurants, coordinates}) {

    const router = useRouter();
    let restaurant = true;
    if( "homemade" == router.query.type) {
        restaurant = false;
    }


    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const handleSearchChange = e => setSearch(e.currentTarget.value);
    function handleSearch(e) {
        if (e.key === 'Enter') {
            Router.push("/restaurants_list?lat=" + coordinates.lat + "&lng=" + coordinates.lng + "&name=" + search);
        }
    }

  const ResDatasPas = (val)=>{
      return <RestaurantCard 
      img={val.logo_img}  title={val.name} pricesymbole={'$$$'} tags={val.tags} _id={val._id}
      />
  }

  return (
 
   <>
       <section id="search-area-wrapper">
       <div className="container">
         <div className="row">
           <div className="col-lg-12">
            <SelectRestaurantAndHomeMade coordinates={coordinates}/>
             <div className="search-filter-area">
               <div className="input-group" id="adv-search">
                 <input type="text" className="form-control search-shadow"
                   placeholder="Search for restaurant, cuisines, and dishes" value={search} onChange={handleSearchChange} onKeyDown={handleSearch} />
                 <i className="icon_search_filter">
                   <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor"
                     strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                     <circle cx="11" cy="11" r="8"></circle>
                     <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                   </svg></i>
         {/*        <div className="input-group-btn">*/}
         {/*          <div className="btn-group" role="group">*/}
         {/*            <div className="dropdown dropdown-lg">*/}
         {/*              <button type="button" className="button-filter button-boder search-shadow" onClick={() => setOpen(!open)}*/}
         {/*aria-controls="example-collapse-text"*/}
         {/*aria-expanded={open}><span>Filter:</span> </button>*/}
         {/*            <Collapse in={open}>*/}
         {/*                <div id="example-collapse-text">*/}
         {/*                  <RestaurantItemFixed  />*/}
         {/*                </div>*/}
         {/*            </Collapse>*/}
         {/*            </div>*/}
         {/*          </div>*/}
         {/*        </div>*/}
               </div>
             </div>
           </div>
         </div>
         <div className="restaurant-list-wrapper">
           <div className="resturent-wrappers-heading">
             <h2>
                 { restaurant ? "All Restaurant" : "All Homemade" }
             </h2>
           </div>
           <div className="row">
             {restaurants.map(ResDatasPas)}
             {/* {RestaurantData.map(ResDatasPas)} */}
           
           </div>
         </div>
       </div>
     </section>
   </>
  )
 }
 
 export default RestaurantListLayout; 