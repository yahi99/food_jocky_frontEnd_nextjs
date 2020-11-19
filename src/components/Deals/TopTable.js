import React from 'react'
import {TopTableData} from '../Deals/TopTableData'
import {BottomTableData} from '../Deals/BottomTableData'
 
const TopTable = () => {
  let areas = BottomTableData.map(data => data.area_name);
  let odd = areas.filter((val, index) => !( index&1) );
  let even = areas.filter((val, index) => index&1 );
  let areaData = odd.map((val, index) => {
      return [val, even[index] || '' ]
  })
 

  function handleScroll(id) {
    let com = document.querySelector(id).getBoundingClientRect();
    let bodyRect = document.body.getBoundingClientRect();
    let offset   = com.top - bodyRect.top - 100;
    window.scrollTo({ top:offset, left:0, behavior: 'smooth'});
}
 
 return (
  <>
    <div className="top-tables-link">
            <h2>Where shall we delivery your food?</h2>
               <table className="table table-bordered">
               <tbody>
                 {areaData.map(areas => (
                    <tr>
                        {areas.map(area => (
                          <td><a onClick={() => handleScroll("#area" + area.replace(/\s/g, ""))}>{area}</a></td>
                       ))}
                    </tr>
                  
                 ))}
                   
               </tbody>
               </table>
      </div>
  </>
 )
}

export default TopTable
