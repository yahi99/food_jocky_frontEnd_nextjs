import React, {useState} from 'react'
import SelectRestaurantAndHomeMade from './SelectRestaurantAndHomeMade'
import Router, {useRouter} from "next/router";
import RestaurantCard from "./RestaurantCard";
 
function RestaurantListLayout({restaurants}) {

    const router = useRouter();
    let query = router.query;
    if(undefined == query.lat || undefined == query.lng) {
        process.browser && Router.push('/');
    }

    let restaurant = true;
    if( "homemade" == query.type) {
        restaurant = false;
    }


    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(query.name || '');
    const handleSearchChange = e => setSearch(e.currentTarget.value);
    function handleSearch(e) {
        if (e.key === 'Enter') {
            Router.push("/restaurants_list?lat=" + query.lat + "&lng=" + query.lng + "&name=" + search + (!restaurant ? "&type=homemade" : ""));
        }
    }


  return (
 
   <>
       <section id="search-area-wrapper">
       <div className="container">
         <div className="row">
           <div className="col-lg-12">
            <SelectRestaurantAndHomeMade query={query}/>
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
               {restaurants.map((restaurant, index) => (
                   <RestaurantCard
                       img={restaurant.thumb_img}  title={restaurant.name} pricesymbole={restaurant.price_type} tags={restaurant.tags} _id={restaurant._id}
                       key={index} />
               ))}
           
           </div>
         </div>
       </div>
     </section>
   </>
  )
 }
 
 export default RestaurantListLayout; 