import React, {useEffect, useState} from 'react'
import { GoogleMap , Marker } from '@react-google-maps/api'
import Link from 'next/link'
import {BiMap} from "react-icons/bi";
import axios from "axios";
import {Modal} from "react-bootstrap";

import PlacesAutocomplete, {
    geocodeByAddress,
} from 'react-places-autocomplete';


function Banner() {

    const BannerData ={
        heading:"Find your favorite food and restaurant near You",
        button:"Search",
        para:"Find your preferred food and restaurant near your area"
    }

    const mapStyles = {
        height: "40vh",
        width: "100%",
        margin: "30px 0 0 0"
    };

    const defaultCoordinates = {
        lat: 22.8136822, lng:89.5635596
    }

    const [mapModal, setMapModal] = useState(false);

    const [address, setAddress] = useState();
    const [coordinates, setCoordinates] = useState(defaultCoordinates);
    const [markerCoordinates, setMarkerCoordinates] = useState(defaultCoordinates);

    async function handleAddressSelect(location) {
        setAddress(location);
        setAddressSearch(location)
        let geocode = await geocodeByAddress(location);
        let currentCoordinates = {
            lat: geocode[0].geometry.location.lat(),
            lng: geocode[0].geometry.location.lng(),
        }
        setCoordinates(currentCoordinates)
        setMarkerCoordinates(currentCoordinates);
        setMapModal(true);
    }


    const [addressSearch, setAddressSearch] = useState('');
    async function handleAddressSearch(location) {
        setAddressSearch(location);
        let geocode = await geocodeByAddress(location);
        console.log(geocode[0].geometry.location.lat())
        let currentCoordinates = {
            lat: geocode[0].geometry.location.lat(),
            lng: geocode[0].geometry.location.lng(),
        }
        setCoordinates(currentCoordinates)
        setMarkerCoordinates(currentCoordinates);
    }


    const [ marker, setMarker ] = useState();

    function onMarkerLoad(value) {
        setMarker(value);
    }

    const [ getCurrentLocation, setGetCurrentLocation] = useState();

    function currentLocation() {
        setGetCurrentLocation(true);
    }


    useEffect(function (){

        if(getCurrentLocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let currentCoordinates = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
                setCoordinates(currentCoordinates)
                setMarkerCoordinates(currentCoordinates);
            }, () => {}, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
            setGetCurrentLocation(false);
            updateName();
        }
    }, [getCurrentLocation, coordinates, markerCoordinates])


    function handleMarkerPositionUpdate() {
        if( marker ) {
            console.log(marker)
           // console.log("Updated" , marker.position.lat(), marker.position.lng());
            setMarkerCoordinates({
                lat: marker.position.lat(),
                lng: marker.position.lng()
            })
        }
        updateName();

    }


    async function updateName() {
        let response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + markerCoordinates.lat + '%2C' + markerCoordinates.lng + '&language=en&key=AIzaSyDtygZ5JPTLgwFLA8nU6bb4d_6SSLlTPGw');
        setAddressSearch(response.data.results[0].formatted_address);
        setAddress(response.data.results[0].formatted_address)
    }



    return (
        <>
            <Modal
                dialogClassName="modal-custom-address"
                show={mapModal}
                onHide={()=> setMapModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title >Is this your exact location?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="banner_form">
                            <PlacesAutocomplete
                                value={addressSearch}
                                onChange={setAddressSearch}
                                onSelect={handleAddressSearch}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <div className="input-group">
                                            <input
                                                {...getInputProps({
                                                    placeholder: 'Search Places ...',
                                                    className: 'form-control location-search-input',
                                                })}
                                            />
                                            <i className="icon_search">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                                                     strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                </svg>
                                            </i>
                                            <i className="location-area-map-marker" onClick={currentLocation} style={{cursor: "pointer", right: "3%"}}>
                                                <BiMap size="27px"/>
                                            </i>
                                        </div>

                                        <div className="autocomplete-dropdown-container auto-complete-list" >
                                            {loading && <div className="suggestion-item">Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#cacaca', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>

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
                                                onDragEnd = {handleMarkerPositionUpdate}
                                            />

                                        </GoogleMap>
                                    </useLoadScript>
                        <div className="modal-custom-address-search">
                            <Link href={"/restaurants_list?lat=" + markerCoordinates.lat + "&lng=" + markerCoordinates.lng}>
                                <a className="btn-banner-search border-radius button-site modal-custom-address-search-btn">
                                    {BannerData.button}
                                </a>
                            </Link>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <section id="home_banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12 col-12">
                            <div className="home_banner-text zindex mb-5">
                                <h1>{BannerData.heading}</h1>
                                <div className="banner_search_form">

                                    <form id="banner_form">
                                        <PlacesAutocomplete
                                            value={address}
                                            onChange={setAddress}
                                            onSelect={handleAddressSelect}
                                        >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <div>
                                                    <div className="input-group">
                                                        <input
                                                            {...getInputProps({
                                                                placeholder: 'Search Places ...',
                                                                className: 'form-control location-search-input',
                                                            })}
                                                        />
                                                        <i className="icon_search">
                                                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                                                                 strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="11" cy="11" r="8"></circle>
                                                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                            </svg>
                                                        </i>
                                                        <i className="location-area-map-marker" onClick={currentLocation} style={{cursor: 'pointer'}}>
                                                            <BiMap size="27px"/>
                                                        </i>
                                                        <div className="input-group-append">
                                                            <a className="btn-banner-search btn-banner-height border-radius button-site" onClick={()=> setMapModal(true)}>
                                                                {BannerData.button}
                                                            </a>
                                                        </div>

                                                    </div>

                                                    <div className="autocomplete-dropdown-container auto-complete-list" style={{width:'82%', textAlign: 'left'}}>
                                                        {loading && <div className="suggestion-item">Loading...</div>}
                                                        {suggestions.map(suggestion => {
                                                            const className = suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                            // inline style for demonstration purpose
                                                            const style = suggestion.active
                                                                ? { backgroundColor: '#cacaca', cursor: 'pointer' }
                                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                            return (
                                                                <div
                                                                    {...getSuggestionItemProps(suggestion, {
                                                                        className,
                                                                        style,
                                                                    })}
                                                                >
                                                                    <span>{suggestion.description}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </PlacesAutocomplete>
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
