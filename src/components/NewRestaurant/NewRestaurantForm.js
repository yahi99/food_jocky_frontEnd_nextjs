import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { MDBInput } from "mdbreact";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ChipInput from "material-ui-chip-input";

function NewRestaurantForm() {
    const handleChange = () => {};
    const [selectedDate, handleDateChange] = useState(new Date());
    const mapStyles = {
        height: "50vh",
        width: "100%",
        margin: "30px 0 0 0",
    };
    const defaultCenter = {
        lat: 22.8136822,
        lng: 89.5635596,
    };

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
                                        <MDBInput label="Restaurant Name" />
                                    </div>
                                    <div className="col-lg-6">
                                        <MDBInput label="Mobile" />
                                    </div>
                                    <div className="col-lg-12">
                                        <MDBInput label="Restaurant Category" />
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
                                    <div className="col-lg-12">
                                        <MDBInput label="Enter Restaurant Location" />
                                    </div>
                                    <div className="col-lg-12">
                                        <LoadScript>
                                            <GoogleMap
                                                mapContainerStyle={mapStyles}
                                                zoom={13}
                                                center={defaultCenter}
                                            ></GoogleMap>
                                        </LoadScript>
                                    </div>
                                    <div className="col-lg-12">
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
};

export default NewRestaurantForm;
