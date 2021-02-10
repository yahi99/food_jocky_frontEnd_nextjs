import {BiMap} from "react-icons/bi";
import {Autocomplete, GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import React, {useState} from "react";
import axios from "axios";
import {Form, Modal} from "antd";
import Cookies from "js-cookie";

const MapModal = props => {
    let [form] = Form.useForm()
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAVKjCxMvk5Nymx6VYSlhc4iOasFoTxuCk",
        libraries: ['places']
    })

    const mapStyles = {
        height: "40vh",
        width: "100%",
        margin: "30px 0 0 0"
    };

    const currentLocation = () => {
        if(isLoaded) {
            navigator.geolocation.getCurrentPosition(async function(position) {
                let {formatted_address, geometry} = await getGeocode(position.coords.latitude, position.coords.longitude)
                setAddressLocation(formatted_address, geometry.location.lat, geometry.location.lng)
            }, () => {}, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        }
    }

    const [autocomplete, setAutocomplete] = useState()
    const [marker, setMarker] = useState();
    const [refresh, setRefresh] = useState(false)
    const reload = () => setRefresh(!refresh)

    const onPlacesChange = () => {
        let {formatted_address, geometry} = autocomplete.getPlace()
        setAddressLocation(formatted_address, geometry.location.lat(), geometry.location.lng())
    }
    const handleMapClick = async ({latLng}) => {
        let {formatted_address, geometry} = await getGeocode(latLng.lat(), latLng.lng())
        setAddressLocation(formatted_address, geometry.location.lat, geometry.location.lng)
    }
    const onDragEnd = async () => {
        if (marker) {
            let {formatted_address, geometry} = await getGeocode(marker.position.lat(), marker.position.lng())
            setAddressLocation(formatted_address, geometry.location.lat, geometry.location.lng)
        }
    }
    const getGeocode = async (lat, lng) => {
        let response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + lng + '&language=en&key=AIzaSyAVKjCxMvk5Nymx6VYSlhc4iOasFoTxuCk');
        return response.data.results[0]
    }
    const getAddress = () => {
        let fields = form.getFieldsValue()
        if (fields.address && fields.address.address) {
            return fields.address.address
        }
        return ""
    }
    const setAddress = value => {
        form.setFieldsValue({address: {address: value}})
        reload()
    }
    const getLocation = () => {
        let fields = form.getFieldsValue()
        if (fields.address && fields.address.location) {
            return fields.address.location
        }
        let location = JSON.parse(Cookies.get('delivery_to') || "{}")
        if(location.lat) {
            getGeocode(location.lat, location.lng).then(({formatted_address, geometry}) => {
                setAddressLocation(formatted_address, geometry.location.lat, geometry.location.lng)
            })
            return location
        }
        Cookies.set('delivery_to', {lat: 22.8136822, lng: 89.5635596})
        return {lat: 22.8136822, lng: 89.5635596}
    }
    const setAddressLocation = (address, lat, lng) => {
        form.setFieldsValue({address: {address: address, location: {lat, lng}}})
        reload()
    }

    const addAddress = () => {
        props.handleSelect({address: getAddress(), location: getLocation()})
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
                <Form form={form} style={{display: 'none'}}>
                    <Form.Item name={['address', 'address']}/>
                    <Form.Item name={['address', 'location']}/>
                </Form>
                <form id="banner_form" style={{position: "relative"}}>
                    {(isLoaded && props.show )&& (
                        <>
                            <Autocomplete
                                onLoad={value => setAutocomplete(value)}
                                onPlaceChanged={onPlacesChange}
                            >
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Search Places ...."
                                        className='form-control location-search-input'
                                        value={getAddress()}
                                        onChange={e => setAddress(e.currentTarget.value)}
                                    />
                                    <i className="icon_search">
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                                             strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    </i>
                                    <i className="location-area-map-marker" onClick={currentLocation}
                                       style={{cursor: "pointer", right: "3%"}}>
                                        <BiMap size="27px"/>
                                    </i>
                                </div>
                            </Autocomplete>
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={13}
                                center={getLocation()}
                                onClick={handleMapClick}
                            >
                                <Marker
                                    onLoad={value => setMarker(value)}
                                    draggable={true}
                                    position={getLocation()}
                                    onDragEnd={onDragEnd}
                                >
                                </Marker>
                            </GoogleMap>
                            <div className="modal-custom-address-search">
                                <a className="btn-banner-search border-radius button-site modal-custom-address-search-btn" onClick={addAddress}>
                                    Add Address
                                </a>
                            </div>
                        </>

                    )}
                </form>
            </div>
        </Modal>
    )
}

export default MapModal

