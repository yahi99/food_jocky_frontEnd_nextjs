import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';


function SelectRestaurantAndHomeMade({query}) {
    const router = useRouter();
    let restaurant = true;
    if( "homemade" == router.query.type) {
        restaurant = false;
    }

    let name = '';
    if( typeof router.query.name === "string" ) {
        name = "&name=" + router.query.name
    }



    return (
        <>
            <div className="search-top-area-wrapper">
                <ul id="top-select-area">
                    <li className="resta-img">
                        <Link href={"/restaurants_list?lat=" + query.lat  + "&lng=" + query.lng + name}>
                            <a className={restaurant && "active-list"}>Restaurant</a>
                        </Link>
                    </li>
                    <li className="home-made-img">
                        <Link href={"/restaurants_list?lat=" + query.lat  + "&lng=" + query.lng + "&type=homemade" + name}>
                            <a className={ ! restaurant && "active-list"}>Homemade</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SelectRestaurantAndHomeMade
