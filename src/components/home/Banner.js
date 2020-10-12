import React, {useState} from 'react'
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api'
import Link from 'next/link'


function Banner() {

    const libraries = ['places'];

    const defaultCenter = {
        lat: 22.8136822, lng:89.5635596
    }
    const BannerData ={
        heading:"Find your favorite food and restaurant near You",
        button:"Search",
        para:"Find your preferred food and restaurant near your area"
    }

    const mapStyles = {
        height: "35vh",
        width: "100%",
        margin: "30px 0 0 0"
    };

    const [autoComplete, setAutoComplete] =useState();
    function onLoad(value) {
        setAutoComplete(value)
        console.log(autoComplete)
    }

    const [address, setAddress] = useState();
    const [coordinates, setCoordinates] = useState({
        lat: 22.8136822, lng:89.5635596
    });

    const [ marker, setMarker ] = useState();

    function onMarkerLoad(value) {
        setMarker(value);
        console.log(value);
    }

    const [markerCoordinates, setMarkerCoordinates] = useState({
        lat: 22.8136822, lng:89.5635596
    });

    function handleMarkerPositionChange() {
        if( marker ) {
            console.log(marker.position.lat(), marker.position.lng());
        }

    }

    function handleMarkerPositionUpdate() {
        if( marker ) {
            console.log("Updated" , marker.position.lat(), marker.position.lng());
            setMarkerCoordinates({
                lat: marker.position.lat(),
                lng: marker.position.lng()
            })
        }

    }

    function handleSelect() {
        let place = autoComplete.getPlace()
        setAddress(place.formatted_address)
        let currentCoordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        }
        setCoordinates(currentCoordinates)
        setMarkerCoordinates(currentCoordinates);
    }


    return (
        <>
            <section id="home_banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12 col-12">
                            <div className="home_banner-text zindex mb-5">
                                <h1>{BannerData.heading}</h1>
                                <div className="banner_search_form">
                                    <useLoadScript
                                        onLoad={()=>alert("hii")}
                                        googleMapsApiKey="AIzaSyDtygZ5JPTLgwFLA8nU6bb4d_6SSLlTPGw"
                                        libraries={libraries}>
                                        <Autocomplete
                                            onLoad={onLoad}
                                            onPlaceChanged={handleSelect}>
                                            <form action="!#" id="banner_form">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        value={address}
                                                        onChange={(e)=> setAddress(e.currentTarget.value)}
                                                        placeholder="Search location"
                                                        className="form-control border-radius"
                                                        style={{
                                                            boxSizing: 'border-box',
                                                            width: '100%'
                                                        }}
                                                    />
                                                    <i className="icon_search">
                                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                                                             strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="11" cy="11" r="8"></circle>
                                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                        </svg></i>
                                                    <div className="input-group-append">
                                                        <Link href={"/restaurants_list?lat=" + markerCoordinates.lat + "&lng=" + markerCoordinates.lng}>
                                                            <a className="btn-banner-search btn-banner-height border-radius button-site">
                                                                {BannerData.button}
                                                            </a>
                                                        </Link>

                                                    </div>

                                                </div>
                                            </form>
                                        </Autocomplete>
                                    </useLoadScript>

                                    <useLoadScript
                                        googleMapsApiKey="AIzaSyDtygZ5JPTLgwFLA8nU6bb4d_6SSLlTPGw"
                                    >

                                        <GoogleMap
                                            mapContainerStyle={mapStyles}
                                            zoom={13}
                                            center={coordinates}>
                                            <Marker
                                                onLoad={onMarkerLoad}
                                                draggable={true}
                                                position={markerCoordinates}
                                                onPositionChanged={handleMarkerPositionChange}
                                                onDragEnd = {handleMarkerPositionUpdate}
                                            />

                                        </GoogleMap>
                                    </useLoadScript>
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