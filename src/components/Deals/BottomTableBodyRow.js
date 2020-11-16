import React from 'react'

const BottomTableBodyRow = props => {
   return (
      <>
      <tr>
      {props.body.map(b => (
      <td>{b}</td>
    ))}
     
     </tr>
      </>
   )
}

export default BottomTableBodyRow

