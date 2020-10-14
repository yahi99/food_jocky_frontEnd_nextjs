import React, {useState} from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import {MDBBtn, MDBInput, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact"
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";
import PageLoader from "../Common/PageLoader";



const ResAddForm =(props)=> {
 const [selectedDate, handleDateChange] = useState(new Date());
 const [show, setShow] = useState(false);

    const [loading, setLoading] = useState(false);
    const Cookies = require('js-cookie');


    const [foodCategory, setFoodCategory] = useState();
    const [foodTitle, setFoodTitle] = useState();
    const [foodPrice, setFoodPrice] = useState();
    const [foodDescription, setFoodDescription] = useState();
    const [foodImageUrl, setFoodImageUrl] = useState();

    const [foodSizePrice, setFoodSizePrice] = useState([]);
    const [foodSizePrice_Size, setFoodSizePrice_Size] = useState('');
    const [foodSizePrice_Price, setFoodSizePrice_Price] = useState('');

    function handleFoodSizeAdd() {
        foodSizePrice.push({
            size: foodSizePrice_Size,
            price: foodSizePrice_Price
        })
        setFoodSizePrice_Size("");
        setFoodSizePrice_Price('');
    }

    function handleFoodSizeRemove(size) {
        let index = foodSizePrice.indexOf(size);
        let array = foodSizePrice || []
        array.splice(index,1)
        setFoodSizePrice(array);

        setFoodSizePrice( foodSizePrice.map( sizeData => {
            if(sizeData.size != size)
                return sizeData;
        }))

    }

    async function handleAddFood() {
        if(foodCategory == "" || foodTitle == "" || foodPrice == "" || foodImageUrl == "") {
            Swal.fire(
                "Warning",
                "Please fill up all required fields",
                'warning'
            )
        } else {
            let config = {
                headers: {
                    Authorization: 'Authorization ' + Cookies.get('token') ,
                }
            }

            let postData = {
                "food_categories_id": foodCategory,
                "name": foodTitle,
                "description": foodDescription,
                "dish_img": foodImageUrl,
                "price": foodPrice,
                "pirce_and_size": foodSizePrice
            }

            let response = await axios.post(`${props.apiUrl}/api/restaurant/insert-food-by-restaurant`, postData, config);
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
                    'Food Added Successfully',
                    'success'
                )
            }
        }
    }

    const handleCategoryChange = e => setFoodCategory(e.target.value);
    const handleFoodTitleChange = e => setFoodTitle(e.currentTarget.value);
    const handleFoodPriceChange = e => setFoodPrice(e.currentTarget.value);
    const handleFoodDescriptionChange = e => setFoodDescription(e.currentTarget.value);

    async function handleFoodImageUrlChange(e) {
        let file = e.currentTarget.files[0];
        const data = new FormData()
        data.append('image', file)
        let url = "https://api.imgbb.com/1/upload?key=dbe026b9378783fd76fb76f8dea82edb";

        const res = await axios.post(url, data, {})
        if (res.data.success) {
            setFoodImageUrl(res.data.data.image.url);
        }
    }


 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 return (
   <>
       <PageLoader loading={loading}/>
     <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
       <Modal.Header closeButton className="modal_padding">
         <Modal.Title>Add Your Item</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <div className="modal-dialog" id="locationSelectModal">
           <div className="modal-content">
             <div className="modal-body">
               <form>
                 <MDBInput label="Food Size" value={foodSizePrice_Size} onChange={ e => setFoodSizePrice_Size(e.currentTarget.value)}/>
                 <MDBInput label="Food Price" value={foodSizePrice_Price} onChange={ e => setFoodSizePrice_Price(e.currentTarget.value)}/>
                 <div className="save_clear_btn">
                   <button type="button" className="btn button-site" onClick={handleFoodSizeAdd}>
                     Add Item
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </Modal.Body>
     </Modal>
     <div className="row">
       <div className="col-lg-12">
         <div className="heading_top_area">
           <h2>Add Food</h2>
         </div>
         <div className="customer_entry_form">
           <div className="form_heading">
             <h4>Add Food</h4>
           </div>
           <div className="add_form_area">
             <form id="add_food_form_area">
               <div className="row">
                 <div className="col-lg-6">
                   <FormControl>
                        <InputLabel id="demo-simple-select-label" color="red">
                            Select Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={foodCategory}
                            onChange={handleCategoryChange}
                        >
                            {props.foodCategories.map(singleCategory =>(
                                <MenuItem value={singleCategory._id}>{singleCategory.name}</MenuItem>
                            ))}
                        </Select>
                   </FormControl>
                 </div>
                 <div className="col-lg-6"></div>
                 <div className="col-lg-6">
                     <MDBInput label="Food Title" value={foodTitle} onChange={handleFoodTitleChange}/>
                 </div>
                 <div className="col-lg-6">
                    <MDBInput label="Price" value={foodPrice} onChange={handleFoodPriceChange}/>
                 </div>
                 <div className="col-lg-12">
                   <MDBInput type="textarea" label="Description" rows="5" value={foodDescription} onChange={handleFoodDescriptionChange}/>
                   <MDBInput type="file" onChange={handleFoodImageUrlChange}/>
                 </div>
                 <div className="file_upload_img">
                   <img
                     src={foodImageUrl}
                   />
                 </div>
               </div>
               <div className="new_item_btn text-right mt-4">
                 <button
                   type="button"
                   className="btn button-site"
                   onClick={handleShow}
                 >
                   New Item
                 </button>
               </div>
               {/*<Datatable data={foodSizePrice}/>*/}
                 <div className="col-lg-6">
                 </div>

                 <MDBTable >
                     <MDBTableHead>
                         <tr>
                             <th>Size</th>
                             <th>Price</th>
                             <th>Action</th>
                         </tr>
                     </MDBTableHead>
                     {foodSizePrice.map( priceData => (
                         <tr>
                             <td>{priceData.size}</td>
                             <td>{priceData.price}</td>
                             <td width="20%"><MDBBtn color="red" size="sm" onClick={() => { handleFoodSizeRemove(priceData) }}>Remove</MDBBtn></td>
                         </tr>
                     ))}
                     <MDBTableBody>
                     </MDBTableBody>
                 </MDBTable>
               <div className="save_clear_btn">
                 <button type="button" className="btn button-site" onClick={handleAddFood}>
                   Add Food
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

export default ResAddForm
