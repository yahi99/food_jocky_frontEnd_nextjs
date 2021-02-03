import PlacesAutocomplete, {geocodeByAddress} from "react-places-autocomplete";
import {BiMap} from "react-icons/bi";
import {GoogleMap, Marker} from "@react-google-maps/api";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Modal} from "antd";

const MapModal = props => {

    const mapStyles = {
        height: "40vh",
        width: "100%",
        margin: "30px 0 0 0"
    };


    const defaultCoordinates = {
        lat: 22.8136822, lng:89.5635596
    }

    const [coordinates, setCoordinates] = useState(defaultCoordinates);
    const [markerCoordinates, setMarkerCoordinates] = useState(defaultCoordinates);


    const [addressSearch, setAddressSearch] = useState('');
    async function handleAddressSearch(location) {
        setAddressSearch(location);
        let geocode = await geocodeByAddress(location);
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

    const [ getCurrentLocation, setGetCurrentLocation] = useState(true);

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

            // console.log("Updated" , marker.position.lat(), marker.position.lng());
            setMarkerCoordinates({
                lat: marker.position.lat(),
                lng: marker.position.lng()
            })
        }
        updateName();

    }

    const handleMapClick = e => {
        setMarkerCoordinates({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
        updateName();
    }


    async function updateName() {
        let response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + markerCoordinates.lat + '%2C' + markerCoordinates.lng + '&language=en&key=AIzaSyAVKjCxMvk5Nymx6VYSlhc4iOasFoTxuCk');
        setAddressSearch(response.data.results[0].formatted_address);

    }

    const handleAdd = e => {
        let address = {
            address: addressSearch,
            location: {
                lat: markerCoordinates.lat,
                lng: markerCoordinates.lng
            }
        }
        props.handleSelect(address);
    }

    const afterClose = () => {
        setTimeout(() => {
            try {
                let com = document.querySelector('#add_address_form').getBoundingClientRect();
                let bodyRect = document.body.getBoundingClientRect();
                let offset = com.top - bodyRect.top - 120;
                window.scrollTo({ top: offset, left: 0, behavior: "smooth" });
            } catch (e) {

            }
        }, 500)
    }



    return (
        <Modal
            visible={props.show}
            onCancel={props.handleClose}
            title="Is this your exact location?"
            footer={null}
            width={600}
            afterClose={afterClose}
        >
            <div>
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
                        googleMapsApiKey="AIzaSyAVKjCxMvk5Nymx6VYSlhc4iOasFoTxuCk"
                    >
                        <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={13}
                            center={coordinates}
                            onClick={handleMapClick}
                        >
                            <Marker
                                onLoad={onMarkerLoad}
                                draggable={true}
                                position={markerCoordinates}
                                onDragEnd = {handleMarkerPositionUpdate}
                            >
                            </Marker>
                        </GoogleMap>
                    </useLoadScript>
                    <div className="modal-custom-address-search">
                        <a className="btn-banner-search border-radius button-site modal-custom-address-search-btn" onClick={handleAdd}> Add Address</a>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default MapModal

