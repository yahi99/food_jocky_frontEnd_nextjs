import React from 'react'
import { MDBInput } from "mdbreact"
import { BsSearch } from "react-icons/bs";

function SearchBox() {
 return (
  <>
    <div className="input_search_icons">
    <MDBInput label="Type something" />
      <div className="search-icons">
      <BsSearch/>
      </div>
    </div>
  </>
 )
}

export default SearchBox
