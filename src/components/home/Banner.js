import React, {useState} from 'react'
import { BiMap } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import Link from 'next/link'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


function Banner() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });


  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])
 
  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const BannerData ={
    heading:"Find your favorite food and restaurant near You",
    button:"Search",
    para:"Find your preferred food and restaurant near your area"
  }

  const mapStyles = {        
    height: "50vh",
    width: "100%",
    margin: "30px 0 0 0"
  };
  const defaultCenter = {
    lat: 22.8136822, lng:89.5635596
  }

 return (
  <>

<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modal_padding">
          <Modal.Title>Is this your exact location?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="modal-dialog" id="locationSelectModal">
      <div className="modal-content">
       
        <div className="modal-body">
          <form>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Enter your address" />
              <i className="modal-input-icon">
              <BiMap size="27px"/>
                </i>
            </div>


            <LoadScript
              googleMapsApiKey="AIzaSyDtygZ5JPTLgwFLA8nU6bb4d_6SSLlTPGw"
              libraries={["places"]}
              >
              <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={defaultCenter}>
                  
              </GoogleMap>
    
          </LoadScript>


          </form>
        </div>
      </div>
    </div>
        </Modal.Body>
      </Modal>
     <section id="home_banner">
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12 col-12">
          <div className="home_banner-text zindex">
               <h1>{BannerData.heading}</h1>
            <div className="banner_search_form">
              <form action="!#" id="banner_form">
                <div className="input-group">



                  {/* <input type="text" className="form-control border-radius" placeholder="Search location" /> */}




                  <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>

                            <input {...getInputProps({ placeholder: "Type address" })} type="text" className="form-control border-radius" />

                            <div>
                              {loading ? <div>...loading</div> : null}

                              {suggestions.map(suggestion => {
                                const style = {
                                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                };

                                return (
                                  <div {...getSuggestionItemProps(suggestion, { style })}>
                                    {suggestion.description}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
      </PlacesAutocomplete>





                  <i className="icon_search">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                      strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg></i>
                    <a>
                  <i className="location-area-map-marker" onClick={handleShow }>
                    <BiMap size="27px"/>
                  </i>
                  </a>
                  <div className="input-group-append">
                   <Link href="/restaurants_list">
                        <a className="btn-banner-search btn-banner-height border-radius button-site">
                          {BannerData.button}
                        </a> 
                     </Link>
                     
                  </div>
                </div>
              </form>
              <p className="pt-30">{BannerData.para}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
 )

}

export default Banner
