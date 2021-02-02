import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import {MDBInput, MDBInputGroup} from "mdbreact";
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
import PlacesAutocomplete, {
    geocodeByAddress,
} from 'react-places-autocomplete';

function NewRestaurantForm(props) {

    let dateFormat = require('dateformat');

    const [loading, setLoading] = useState(false);

    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantNumber, setRestaurantNumber] = useState('');
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
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);
    const handleRestaurantNumberChange = e => {
        let number = e.currentTarget.value.replace(/\D/g,'');
        setRestaurantNumber(number);
        phoneNumberValidityCheck(number);
    }
    const [validPassword, setValidPassword] = useState(true);
    const handlePasswordChange = e => {
        let password = e.currentTarget.value;
        setPassword(password);
        if(password.length < 8) {
            setValidPassword(false);
        } else {
            setValidPassword(true);
        }
    }

    const handleTypeChange = e => setType(e.target.value);
    const handleFoodCategoryChange = e => setFoodCategory(e.target.value);

    const [validEmail, setValidEmail] = useState(true);
    const handleEmailChange = e => {
        let email = e.currentTarget.value;
        setEmail(email);
        emailValidityCheck(email);
    }

    function phoneNumberValidityCheck(number) {
        if( number.length > 0 && number.length !== 10) {
            setValidPhoneNumber(false);
        } else {
            setValidPhoneNumber(true);
        }
    }

    function emailValidityCheck(email) {
        if(email.length == 0 ) {
            setValidEmail(true);
        } else {
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            setValidEmail(reg.test(email));
        }
    }


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

        if( restaurantName == "" || restaurantNumber == "" || type == "" || undefined === fullAddress || password == "" || (! validPhoneNumber ) || (!validPassword) || (! validEmail )) {
            Swal.fire(
                'Warning',
                'Please fill required fields',
                'warning'
            )
        } else {
            setLoading(true);
            let postData = {
                "name": restaurantName,
                "mobile": "+880" +  restaurantNumber,
                "email": email,
                "password": password,
                "type": type,
                "restaurant_category": "",
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


    const [marker, setMarker] = useState();

    function onMarkerLoad(value) {
        setMarker(value);
    }

    const [markerCoordinates, setMarkerCoordinates] = useState({
        lat: 22.8136822,
        lng: 89.5635596,
    });

    function handleMarkerPositionUpdate() {
        if (marker) {
            setMarkerCoordinates({
                lat: marker.position.lat(),
                lng: marker.position.lng(),
            });
            updateName();
        }
    }

    async function handleAddressSelect(location) {
        setAddress(location);
        let geocode = await geocodeByAddress(location);
        let currentCoordinates = {
            lat: geocode[0].geometry.location.lat(),
            lng: geocode[0].geometry.location.lng(),
        }
        setCoordinates(currentCoordinates)
        setMarkerCoordinates(currentCoordinates);
        setFullAddress(geocode[0]);
    }


    async function updateName() {
        let response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + markerCoordinates.lat + "%2C" + markerCoordinates.lng + "&language=en&key=AIzaSyAVKjCxMvk5Nymx6VYSlhc4iOasFoTxuCk");
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
        <PageLoader loading={loading} />
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
                    <div className="col-lg-12">
                      <MDBInput
                        label="Restaurant Name"
                        className="form-control"
                        value={restaurantName}
                        onChange={handleRestaurantNameChange}
                      />
                    </div>
                    <div className="col-lg-6">
                      <MDBInputGroup
                        material
                        id = "form-phone-number"
                        className={ validPhoneNumber ? "form-control" : "form-control is-invalid"}
                        prepend="+880"
                        hint="Phone Number"
                        value={restaurantNumber}
                        onChange={handleRestaurantNumberChange}
                      >
                        <div
                          style={{ marginLeft: 70 }}
                          className="invalid-feedback"
                        >
                          Provide a valid Phone Number!
                        </div>
                      </MDBInputGroup>
                    </div>
                    <div className="col-lg-6">
                      <MDBInput
                        label="Password"
                        type="password"
                        className={ password.length > 0 ? validPassword ? "form-control is-valid" : "form-control is-invalid" : "form-control"}
                        value={password}
                        onChange={handlePasswordChange}
                      >
                          <div
                              style={{ marginLeft: 70 }}
                              className="invalid-feedback"
                          >
                              Password must have 8 characters!
                          </div>
                      </MDBInput>
                    </div>
                    <div className="col-lg-6">
                      <FormControl className="form-control">
                        <InputLabel id="demo-simple-select-label" color="red">
                          Select Type
                        </InputLabel>
                        <Select
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
                        <InputLabel id="food-category-label" color="red">
                          Food Category
                        </InputLabel>

                        <Select
                          id="food-category-select"
                          multiple
                          value={foodCategory}
                          onChange={handleFoodCategoryChange}
                          input={<Input id="select-multiple-chip" />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={getCategoryName(value)}
                                  className={classes.chip}
                                />
                              ))}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {props.categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                              <Checkbox
                                checked={
                                  foodCategory.indexOf(category._id) > -1
                                }
                              />
                              <ListItemText primary={category.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                      <div className="col-lg-12 mt-2">
                          <PlacesAutocomplete
                              value={address}
                              onChange={setAddress}
                              onSelect={handleAddressSelect}
                          >
                              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                  <div>
                                      <MDBInput
                                          label="Enter Restaurant Location"
                                          {...getInputProps({
                                              placeholder: 'Search Places ...',
                                              className: 'form-control location-search-input',
                                          })}
                                      />
                                      <div className="autocomplete-dropdown-container auto-complete-list" style={{width: "97%"}}>
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
                    <div className="col-lg-12">
                      <MDBInput
                        label="Email"
                        className={ email.length > 0 ? validEmail ? "form-control is-valid" : "form-control is-invalid" : "form-control"}
                        value={email}
                        onChange={handleEmailChange}
                      >
                          <div
                              className="invalid-feedback"
                          >
                              Provide a valid Email!
                          </div>
                      </MDBInput>
                    </div>

                    <div className="col-lg-6">
                      <MDBInput
                        type="file"
                        label="Select main image..."
                        className="chose_file"
                        onChange={handleCoverImageChange}
                      />
                      {coverImageUrl == "" || (
                        <div className="area_img_Add">
                          <h6>Cover Image</h6>
                          <img src={coverImageUrl} alt="img" />
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
                      {thumbImageUrl == "" || (
                        <div className="area_img_Add">
                          <h6>Thumb Image</h6>
                          <img src={thumbImageUrl} alt="img" />
                        </div>
                      )}
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
                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn button-site ml-0"
                      onClick={handleAddRestaurant}
                    >
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
