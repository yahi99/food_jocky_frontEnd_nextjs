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
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Swal from 'sweetalert2'
import Router from "next/router";
import PageLoader from "../Common/PageLoader";

function NewRestaurantForm(props) {

    let dateFormat = require('dateformat');

    const [loading, setLoading] = useState(false);

    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantNumber, setRestaurantNumber] = useState('');
    const [restaurantCategory, setRestaurantCategory] = useState('');
    const [type, setType] = useState('');
    const [foodCategory, setFoodCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const [coverImageUrl , setCoverImageUrl ] = useState('');
    const [thumbImageUrl , setThumbImageUrl ] = useState('')

    const handleRestaurantNameChange = e => setRestaurantName(e.currentTarget.value);
    const handleRestaurantNumberChange = e => setRestaurantNumber(e.currentTarget.value);
    const handleRestaurantCategoryChange = e => setRestaurantCategory(e.currentTarget.value);
    const handleTypeChange = e => setType(e.target.value);
    const handleFoodCategoryChange = e => setFoodCategory(e.target.value);
    const handleEmailChange = e => setEmail(e.currentTarget.value);
    const handlePasswordChange = e => setPassword(e.currentTarget.value);


    async function handleCoverImageChange(e) {
        let file = e.currentTarget.files[0];
        const data = new FormData()
        data.append('image', file)
        let url = "https://api.imgbb.com/1/upload?key=dbe026b9378783fd76fb76f8dea82edb";

        const res = await axios.post(url, data, {})
        if (res.data.success) {
            setCoverImageUrl(res.data.data.image.url);
        }
    }

    async function handleThumbImageChange(e) {

        let file = e.currentTarget.files[0];
        const data = new FormData()
        data.append('image', file)

        let url = "https://api.imgbb.com/1/upload?key=dbe026b9378783fd76fb76f8dea82edb";

        const res = await axios.post(url, data, {})
        if (res.data.success) {
            setThumbImageUrl(res.data.data.image.url);
        }
    }

    async function handleAddRestaurant() {

        if( restaurantName == "" || restaurantNumber == "" || undefined === fullAddress || password == "") {
            Swal.fire(
                'Warning',
                'Please fill required fields',
                'warning'
            )
        } else {
            setLoading(true);
            let postData = {
                "name": restaurantName,
                "mobile": restaurantNumber,
                "email": email,
                "password": password,
                "type": type,
                "restaurant_category": restaurantCategory,
                "tags": tags,
                "opening_time": dateFormat(startTime, "h:MM TT"),
                "closing_time": dateFormat(endTime, "h:MM TT"),
                "about": "",
                "cover_img": coverImageUrl,
                "logo_img": thumbImageUrl,
                "address": getAddress(),
                "food_categories": getAllCategoryName()
            }


            let response = await axios.post(`${props.apiUrl}/api/restaurant/create`, postData);
            if(response.data.error) {
                setLoading(false);
                Swal.fire(
                    "Error",
                    response.data.msg,
                    'error'
                )
            } else {
                setLoading(false);
                Swal.fire(
                    "Success",
                    'Restaurant Created Successfully',
                    'success'
                )
                Router.push("/restaurant_login");
            }

        }
    }


    const libraries = ["places"];
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
    const [fullAddress, setFullAddress] = useState();
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
            //console.log(marker.position.lat(), marker.position.lng());
        }
    }

    function handleMarkerPositionUpdate() {
        if (marker) {
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
        updateName();
    }

    async function updateName() {
        let response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + markerCoordinates.lat + "%2C" + markerCoordinates.lng + "&language=en&key=AIzaSyDtygZ5JPTLgwFLA8nU6bb4d_6SSLlTPGw");
        setAddress(response.data.results[0].formatted_address);
        setFullAddress(response.data.results[0]);
    }

    function getAddress() {
        let address = {
            "name": fullAddress.formatted_address.split(',')[0] || "",
            "address": fullAddress.formatted_address,
            "placeId": fullAddress.place_id,
            "location": {
                "lat": markerCoordinates.lat,
                "lng": markerCoordinates.lng
            }
        };
        return address;
    }


    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }));

    const classes = useStyles();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    function getAllCategoryName() {
        return foodCategory.map(id => {
            return {
                _id: id,
                name: getCategoryName(id)
            }
        })
    }

    function getCategoryName(id) {
        for( let i =0 ; i < props.categories.length; i ++) {
            if( props.categories[i]._id == id) {
                return props.categories[i].name;
            }
        }
        return "";
    }

    return (
        <>
            <PageLoader loading={loading}/>
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
                                                value={type}
                                                onChange={handleTypeChange}
                                                >
                                                <MenuItem value="restaurant">Restaurant</MenuItem>
                                                <MenuItem value="homemade">Home Made</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-label" color="red">
                                                Food Category
                                            </InputLabel>


                                            <Select
                                                labelId="demo-mutiple-chip-label"
                                                id="demo-mutiple-chip"
                                                multiple
                                                value={foodCategory}
                                                onChange={handleFoodCategoryChange}
                                                input={<Input id="select-multiple-chip" />}
                                                renderValue={(selected) => (
                                                    <div className={classes.chips}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={getCategoryName(value)} className={classes.chip} />
                                                        ))}
                                                    </div>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {props.categories.map((category) => (
                                                    <MenuItem key={category._id} value={category._id}>
                                                        <Checkbox checked={foodCategory.indexOf(category._id) > -1} />
                                                        <ListItemText primary={category.name} />
                                                    </MenuItem>
                                                ))}
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
                                            value={tags}
                                            onChange={setTags}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <MDBInput label="Email" value={email} onChange={handleEmailChange}/>
                                    </div>
                                    <div className="col-lg-6">
                                        <MDBInput label="Password" type="password" value={password} onChange={handlePasswordChange}/>
                                    </div>

                                    <div className="col-lg-6">
                                        <MDBInput
                                            type="file"
                                            label="Select main image..."
                                            className="chose_file"
                                            onChange={handleCoverImageChange}
                                        />
                                        { coverImageUrl == '' || (
                                            <div className="area_img_Add"> 
                                                <h6>Cover Image</h6>
                                                <img
                                                    src={coverImageUrl}
                                                    alt="img"
                                                />
                                            </div>
                                        )}
                                        
                                    </div>
                                    <div className="col-lg-6">
                                        <MDBInput
                                            type="file"
                                            label="Select thumb image..."
                                            className="chose_file"
                                            onChange={handleThumbImageChange}
                                        />
                                        { thumbImageUrl == "" || (
                                            <div className="area_img_Add">
                                                <h6>Thumb Image</h6>
                                                <img
                                                    src={thumbImageUrl}
                                                    alt="img"
                                                />
                                        </div>
                                        ) }
                                        
                                    </div>
                                    <div className="col-lg-6" id="time_pickers">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <TimePicker
                                                value={startTime}
                                                onChange={setStartTime}
                                                label="Start"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="col-lg-6" id="time_pickers">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <TimePicker
                                                value={endTime}
                                                onChange={setEndTime}
                                                label="End"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                                <div style={{marginTop: 25}}>
                                    <button type="button" className="btn button-site" onClick={handleAddRestaurant}>
                                        Add Restaurant
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
