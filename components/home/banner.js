import React, {useState} from 'react'
import {GoogleMap, Marker, Autocomplete, useJsApiLoader} from '@react-google-maps/api'
import Link from 'next/link'
import {BiMap} from "react-icons/bi";
import axios from "axios";
import {Modal} from "react-bootstrap";
import {Form} from "antd";

function Banner() {
    let [form] = Form.useForm()
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAVKjCxMvk5Nymx6VYSlhc4iOasFoTxuCk",
        libraries: ['places']
    })

    const BannerData = {
        heading: "Find your favorite food and restaurant near You",
        button: "Search",
        para: "Order food online & Eat Good, Eat Exciting!"
    }

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

    const [mapModal, setMapModal] = useState(false);
    const [autocomplete1, setAutocomplete1] = useState()
    const [autocomplete2, setAutocomplete2] = useState()
    const [marker, setMarker] = useState();
    const [refresh, setRefresh] = useState(false)
    const reload = () => setRefresh(!refresh)

    const onPlacesChange1 = () => {
        let {formatted_address, geometry} = autocomplete1.getPlace()
        setAddressLocation(formatted_address, geometry.location.lat(), geometry.location.lng())
    }
    const onPlacesChange2 = () => {
        let {formatted_address, geometry} = autocomplete2.getPlace()
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
        return {lat: 22.8136822, lng: 89.5635596}
    }
    const setAddressLocation = (address, lat, lng) => {
        form.setFieldsValue({address: {address: address, location: {lat, lng}}})
        reload()
    }

    return (
        <>
            <Modal
                dialogClassName="modal-custom-address"
                show={mapModal}
                onHide={() => setMapModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Is this your exact location?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="banner_form" style={{position: "relative"}}>
                        {isLoaded && (
                            <>
                                <Autocomplete
                                    onLoad={value => setAutocomplete1(value)}
                                    onPlaceChanged={onPlacesChange1}
                                >
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Customized your placeholder"
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
                            </>

                        )}
                        <div className="modal-custom-address-search">
                            <Link href={"/search?lat=" + getLocation().lat + "&lng=" + getLocation().lng}>
                                <a className="btn-banner-search border-radius button-site modal-custom-address-search-btn">
                                    {BannerData.button}
                                </a>
                            </Link>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <section id="home_banner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-7  col-md-12 col-sm-12 col-12">
                            <div className="home_banner-text zindex mb-5">
                                <h1>{BannerData.heading}</h1>
                                <div className="banner_search_form">
                                    <Form form={form}>
                                        <Form.Item name={['address', 'address']}/>
                                        <Form.Item name={['address', 'location']}/>
                                    </Form>
                                    <form id="banner_form">
                                        {isLoaded && (
                                            <Autocomplete
                                                onLoad={value => setAutocomplete2(value)}
                                                onPlaceChanged={onPlacesChange2}
                                            >
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        placeholder="Search Places ..."
                                                        className='form-control location-search-input'
                                                        value={getAddress()}
                                                        onChange={e => setAddress(e.currentTarget.value)}
                                                    />
                                                    <i className="icon_search">
                                                        <svg viewBox="0 0 24 24" width="24" height="24"
                                                             stroke="currentColor"
                                                             strokeWidth="1.5" fill="none" strokeLinecap="round"
                                                             strokeLinejoin="round">
                                                            <circle cx="11" cy="11" r="8"></circle>
                                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                        </svg>
                                                    </i>
                                                    <i className="location-area-map-marker"
                                                       onClick={currentLocation} style={{cursor: 'pointer'}}>
                                                        <BiMap size="27px"/>
                                                    </i>
                                                    <div className="input-group-append">
                                                        <a className="btn-banner-search btn-banner-height button-site"
                                                           onClick={() => setMapModal(true)}>
                                                            {BannerData.button}
                                                        </a>
                                                    </div>
                                                </div>
                                            </Autocomplete>
                                        )}
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
