import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { MDBInput } from "mdbreact";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import ChipInput from "material-ui-chip-input";
import axios from "axios";

function NewRestaurantForm() {
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantNumber, setRestaurantNumber] = useState('');
    const [restaurantCategory, setRestaurantCategory] = useState('');
    const [type, setType] = useState('');
    const [foodCategory, setFoodCategory] = useState('');
    const [tags, setTags] = useState('');
    const [email, setEmail] = useState('');

    const handleRestaurantNameChange = e => setRestaurantName(e.currentTarget.value);
    const handleRestaurantNumberChange = e => setRestaurantNumber(e.currentTarget.value);
    const handleRestaurantCategoryChange = e => setRestaurantCategory(e.currentTarget.value);
    const handleTypeChange = e => setType(e.currentTarget.value);
    const handleFoodCategoryChange = e => setFoodCategory(e.currentTarget.value);
    const handleTagsChange = e => setTags(e.currentTarget.value);
    const handleEmailChange = e => setEmail(e.currentTarget.value);


    const libraries = ["places"];
    const handleChange = () => {};
    const [selectedDate, handleDateChange] = useState(new Date());
    const mapStyles = {
        height: "50vh",
        width: "100%",
        margin: "30px 0 0 0",
    };

    const [coordinates, setCoordinates] = useState({
        lat: 22.8136822,
        lng: 89.5635596,
    });

    const [address, setAddress] = useState();
    const [autoComplete, setAutoComplete] = useState();

    function onLoad(value) {
        setAutoComplete(value);
    }

    const [marker, setMarker] = useState();

    function onMarkerLoad(value) {
        setMarker(value);
    }

    const [markerCoordinates, setMarkerCoordinates] = useState({
        lat: 22.8136822,
        lng: 89.5635596,
    });

    function handleMarkerPositionChange() {
        if (marker) {
            console.log(marker.position.lat(), marker.position.lng());
        }
    }

    function handleMarkerPositionUpdate() {
        if (marker) {
            console.log("Updated", marker.position.lat(), marker.position.lng());
            setMarkerCoordinates({
                lat: marker.position.lat(),
                lng: marker.position.lng(),
            });
        }
        updateName();
    }

    function handleSelect() {
        let place = autoComplete.getPlace();
        setAddress(place.formatted_address);
        let currentCoordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        };
        setCoordinates(currentCoordinates);
        setMarkerCoordinates(currentCoordinates);
    }

    async function updateName() {
        let response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + markerCoordinates.lat + "%2C" + markerCoordinates.lng + "&language=en&key=AIzaSyDtygZ5JPTLgwFLA8nU6bb4d_6SSLlTPGw");
        setAddress(response.data.results[0].formatted_address);
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="heading_top_area">
                        <h2>New Restaurant</h2>
                    </div>
                    <div className="customer_entry_form">
                        <div className="form_heading">
                            <h4>New Restaurant</h4>
                        </div>
                        <div className="add_form_area">
                            <form id="New_Res_Add">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <MDBInput label="Restaurant Name" value={restaurantName} onChange={handleRestaurantNameChange} />
                                    </div>
                                    <div className="col-lg-6">
                                        <MDBInput label="Mobile" value={restaurantNumber} onChange={handleRestaurantNumberChange}/>
                                    </div>
                                    <div className="col-lg-12">
                                        <MDBInput label="Restaurant Category" value={restaurantCategory} onChange={handleRestaurantCategoryChange} />
                                    </div>
                                    <div className="col-lg-6">
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-label" color="red">
                                                Select Type
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-label" color="red">
                                                Food Category
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-lg-12" style={{ marginTop: 25 }}>
                                        <useLoadScript
                                            googleMapsApiKey="AIzaSyDtygZ5JPTLgwFLA8nU6bb4d_6SSLlTPGw"
                                            libraries={libraries}
                                        >
                                            <Autocomplete
                                                onLoad={onLoad}
                                                onPlaceChanged={handleSelect}
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.currentTarget.value)}
                                                    placeholder="Enter Restaurant Location"
                                                />
                                            </Autocomplete>
                                        </useLoadScript>
                                    </div>

                                    <div className="col-lg-12">
                                        <useLoadScript>
                                            <GoogleMap
                                                mapContainerStyle={mapStyles}
                                                zoom={14}
                                                center={coordinates}
                                            >
                                                <Marker
                                                    onLoad={onMarkerLoad}
                                                    draggable={true}
                                                    position={markerCoordinates}
                                                    onPositionChanged={handleMarkerPositionChange}
                                                    onDragEnd={handleMarkerPositionUpdate}
                                                />
                                            </GoogleMap>
                                        </useLoadScript>
                                    </div>

                                    <div className="col-lg-12" style={{ marginTop: 25 }}>
                                        <ChipInput
                                            label="Tags"
                                            id="tags_area"
                                            defaultValue={[]}
                                            onChange={(chips) => handleChange(chips)}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <MDBInput label="Email" />
                                    </div>
                                    <div className="col-lg-6">
                                        <MDBInput label="Password" />
                                    </div>

                                    <div className="col-lg-6">
                                        <MDBInput
                                            type="file"
                                            label="Select main image..."
                                            className="chose_file"
                                        />
                                        <div className="area_img_Add">
                                            <h6>Cover Image</h6>
                                            <img
                                                src="https://mdbootstrap.com/img/Photos/Others/images/89.jpg"
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <MDBInput
                                            type="file"
                                            label="Select thumb image..."
                                            className="chose_file"
                                        />
                                        <div className="area_img_Add">
                                            <h6>Thumb Image</h6>
                                            <img
                                                src="https://mdbootstrap.com/img/Photos/Others/images/89.jpg"
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6" id="time_pickers">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <TimePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                label="Start"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="col-lg-6" id="time_pickers">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <TimePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                label="End"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                                <div className="save_clear_btn">
                                    <button type="button" className="btn button-site">
                                        Add Item
                                    </button>
                                    <button type="button" className="btn button-site">
                                        Remove Item
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewRestaurantForm;
