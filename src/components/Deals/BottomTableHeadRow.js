import React from 'react'

const BottomTableHeadRow = (props) => {
 return (
  <>
   <tr>
    {props.head.map(h => (
      <th>{h}</th>
    ))}
   </tr>
  </>
 )
}

export default BottomTableHeadRow

