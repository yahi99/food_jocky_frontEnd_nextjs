import React from 'react'
import BottomTableHeadRow from '../Deals/BottomTableHeadRow'
import BottomTableBodyRow from '../Deals/BottomTableBodyRow'
import {BottomTableData} from '../Deals/BottomTableData'
const FoodDealsArea = () => {
 
 return (
  <>
  <div className="food-lists-area">
  
      {BottomTableData.map(data => (
            <div className="food-list-widget" id={"area" + data.area_name.replace(/\s/g, "")}>
            <h2>FoodJocky deals in {data.area_name}</h2>
            <div className="table-responsive">
            <table className="table table-bordered ">
                <thead>
                <BottomTableHeadRow head={data.head} />
                </thead>
                <tbody>
                 {data.body.map(body => (
                  <BottomTableBodyRow body={body}/>
                 ))}
                   {}
                </tbody>
            </table>
            </div>
          
            </div>
      ))}
  </div>
  </>
 )
}

export default FoodDealsArea
