import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {fetchRestaurants} from "../app/slices/restaurant/actions";
import RestaurantCard from "../components/restaurant/RestaurantCard";
import {reloadRestaurants} from "../app/slices/restaurant";
import MainLayout from "../components/layout";
import Slider from "react-slick";
import {Form, Input, Radio, Spin, Checkbox} from "antd";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import {fetchHomepageData} from "../app/slices/user/actions";


const SearchResult = () => {
    let [form] = Form.useForm()
    let dispatch = useDispatch()
    let [loaded, setLoaded] = useState(false)
    let [type, setType] = useState('restaurant')
    let restaurants = useSelector(state => state.restaurant.restaurants)
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState(undefined)
    const toggle = () => setOpen(!open)
    const ref = useRef()
    const handleClickOutside = (e) => {
        if (ref && !ref.current.contains(e.target)) {
            setOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    })

    const handleFilterChange = async (current, all) => {
        let text = `Filter: ${all.price_type ? `Price type: ${all.price_type} `: ''}${getSelectedCategories(all.categories)}`
        setFilter(all)
        reload()
        setSearch(text)
    }
    const getSelectedCategories = categories => {
        if(categories && categories.length > 0) {
            let text = categories.length === 1 ? 'Category: ' : 'Categories: '
            categories.map((category, index) => {
                if(index === 0) {
                    text += getCategoryName(category)
                } else {
                    text += ','
                    text += getCategoryName(category)
                }
            })
            return text
        }
        return ''
    }



    const isFilter = () => {
       if(filter) {
           if(filter.price_type && filter.price_type.length > 0)
               return true
           if(filter.categories && filter.categories.length > 0)
               return true
       }
       return false
    }

    const [search, setSearch] = useState('')
    const handleSearchChange = e => {
        if(isFilter()) {
            setSearch('')
            setFilter(undefined)
            form.resetFields()
        } else {
            setSearch(e.currentTarget.value)
        }
        reload()
    }

    const showRestaurants = () => {
        setType('restaurant');
        reload()
    }
    const showHomemade = () => {
        setType('homemade');
        reload()
    }

    const reload = () => {
        dispatch(reloadRestaurants(null))
        setLoaded(false)
    }

    useEffect(() => {
        if (!loaded) {
            setLoaded(true)
            dispatch(fetchHomepageData({}))
            const urlParams = new URLSearchParams(window.location.search);
            const lat = urlParams.get('lat');
            const lng = urlParams.get('lng');
            dispatch(fetchRestaurants({lat: +lat, lng: +lng, name: search, type, filter}))
        }
    })

    let categories = useSelector(state => state.user.categories)
    categories = categories.filter(category => category.restaurant_count > 0)
    const getCategoryName = id => {
        for(let i=0; i<categories.length; i++) {
            if(categories[i]._id === id) {
                return categories[i].name
            }
        }
        return ''
    }


    return (
        <MainLayout>
            <section id="search-area-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="search-top-area-wrapper">
                                <ul id="top-select-area">
                                    <li className="restaurant-img">
                                        <a className={type === 'restaurant' ? 'active-list' : ''}
                                           onClick={showRestaurants}>Restaurant</a>
                                    </li>
                                    <li className="home-made-img">
                                        <a className={type === 'homemade' ? 'active-list' : ''}
                                           onClick={showHomemade}>Homemade</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="search-filter-area">
                                <div className="input-group" id="adv-search">
                                    <Input
                                        className="form-control search-shadow"
                                        placeholder="Search for restaurant, cuisines, and dishes"
                                        value={search}
                                        onChange={handleSearchChange}
                                        allowClear/>
                                    <i className="icon_search_filter">
                                        {isFilter() ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#c8102e"
                                                 viewBox="0 0 24 24">
                                                <path
                                                    d="M11.5019729,10.437 C10.6179695,10.2097116 10,9.41275517 10,8.5 C10,7.58724483 10.6179695,6.79028841 11.5019729,6.563 L11.5019729,4 L12.5019729,4 L12.5019729,6.563 C13.3859763,6.79028841 14.0039458,7.58724483 14.0039458,8.5 C14.0039458,9.41275517 13.3859763,10.2097116 12.5019729,10.437 L12.5019729,21 L11.5019729,21 L11.5019729,10.437 Z M6.50197289,11.563 C7.38597628,11.7902884 8.00394578,12.5872448 8.00394578,13.5 C8.00394578,14.4127552 7.38597628,15.2097116 6.50197289,15.437 L6.50197289,21 L5.50197289,21 L5.50197289,15.437 C4.61796951,15.2097116 4,14.4127552 4,13.5 C4,12.5872448 4.61796951,11.7902884 5.50197289,11.563 L5.50197289,4 L6.50197289,4 L6.50197289,11.563 Z M18.5019729,14.563 C19.3859763,14.7902884 20.0039458,15.5872448 20.0039458,16.5 C20.0039458,17.4127552 19.3859763,18.2097116 18.5019729,18.437 L18.5019729,21 L17.5019729,21 L17.5019729,18.437 C16.6179695,18.2097116 16,17.4127552 16,16.5 C16,15.5872448 16.6179695,14.7902884 17.5019729,14.563 L17.5019729,4 L18.5019729,4 L18.5019729,14.563 Z M18.0019729,17.5 C18.5542576,17.5 19.0019729,17.0522847 19.0019729,16.5 C19.0019729,15.9477153 18.5542576,15.5 18.0019729,15.5 C17.4496881,15.5 17.0019729,15.9477153 17.0019729,16.5 C17.0019729,17.0522847 17.4496881,17.5 18.0019729,17.5 Z M6.00197289,14.5 C6.55425764,14.5 7.00197289,14.0522847 7.00197289,13.5 C7.00197289,12.9477153 6.55425764,12.5 6.00197289,12.5 C5.44968814,12.5 5.00197289,12.9477153 5.00197289,13.5 C5.00197289,14.0522847 5.44968814,14.5 6.00197289,14.5 Z M12.0019729,9.5 C12.5542576,9.5 13.0019729,9.05228475 13.0019729,8.5 C13.0019729,7.94771525 12.5542576,7.5 12.0019729,7.5 C11.4496881,7.5 11.0019729,7.94771525 11.0019729,8.5 C11.0019729,9.05228475 11.4496881,9.5 12.0019729,9.5 Z">
                                                </path>
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor"
                                                 strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8"/>
                                                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                            </svg>
                                        )}

                                    </i>
                                    <div className="input-group-btn" ref={ref}>
                                        <div className="btn-group" role="group">
                                            <div className="dropdown dropdown-lg">
                                                <button type="button"
                                                        className="button-filter button-boder search-shadow"
                                                        onClick={toggle}><span>Filter:</span></button>
                                                <div className="dropdown-menu-right search-shadow mt-3"
                                                     style={{display: open ? 'block' : 'none'}}>
                                                    <Form onValuesChange={handleFilterChange} form={form}>
                                                        <div className="price-arae-seclect">
                                                            <div className="heading-price-select">
                                                                <h3 className="select-heading">Price</h3>
                                                            </div>

                                                            <div className="price-select-wrap">
                                                                <div className="price-wrapper-item">
                                                                    <Form.Item name="price_type" className="w-100">
                                                                        <Radio.Group
                                                                            className="d-flex justify-content-between">
                                                                            <Radio className="search-price-type"
                                                                                   value="$">$</Radio>
                                                                            <Radio className="search-price-type"
                                                                                   value="$$">$$</Radio>
                                                                            <Radio className="search-price-type"
                                                                                   value="$$$">$$$</Radio>
                                                                        </Radio.Group>
                                                                    </Form.Item>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="offer-select-boxed">
                                                            <div className="heading-offer-select">
                                                                <h3 className="select-heading">Category</h3>
                                                            </div>
                                                            <Form.Item name="categories">
                                                                <Checkbox.Group>
                                                                    <div className="row">
                                                                        {categories.map(category => (
                                                                            <div className="col-md-4 mb-3">
                                                                                <Checkbox value={category._id} className="search-category-select" style={{ lineHeight: '25px' }}>
                                                                                    {category.name}
                                                                                    <span className="checkmark"/>
                                                                                </Checkbox>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </Checkbox.Group>
                                                            </Form.Item>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="restaurant-list-wrapper">

                        {restaurants.loading && (
                            <div className="modal-body text-center">
                                <Spin size="large" wrapperClassName="loader-spin"/>
                            </div>
                        )}
                        {(!restaurants.loading && !restaurants.error) && (
                            <>
                                <Sliders title="Top Restaurants" restaurants={restaurants.top}/>
                                <Sliders title="Newest Restaurants" restaurants={restaurants.new}/>
                                <Sliders title="Nearest Restaurants" restaurants={restaurants.nearest}/>

                                <div className="restaurant-wrapper-heading mb-2">
                                    <h2>
                                        {type === 'restaurant' ? `${search.length > 0 ? `${restaurants.all.length} Restaurants Found` : 'All Restaurant'}` : `${search.length > 0 ? `${restaurants.all.length} Homemade Found` : 'All Homemade'}`}
                                    </h2>
                                </div>
                                <div className="row">
                                    {restaurants.all.map((restaurant, index) => (
                                        <div className="col-lg-4 col-md-6 col-sm-12 col-12 padding-bottom-30">
                                            <RestaurantCard restaurant={restaurant} key={index}/>
                                        </div>

                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default SearchResult


const Sliders = ({title, restaurants}) => {

    if (restaurants.length < 3) {
        return ""
    }

    const arrowStyle = {
        backgroundColor: '#c8102f',
        height: 30,
        width: 24,
        marginTop: -30
    }

    let prev = (
        <div>
            <div
                style={{...arrowStyle, marginLeft: -10}}
                className="disabled-none">
                <MdKeyboardArrowLeft color={'#fff'} size={24} style={{height: 30}}/>
            </div>
        </div>
    )
    let next = (
        <div>
            <div
                style={{...arrowStyle, marginLeft: 8}}
                className="disabled-none">
                <MdKeyboardArrowRight color={'#fff'} size={24} style={{height: 30}}/>
            </div>
        </div>
    )


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        prevArrow: prev,
        nextArrow: next,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    initialSlide: 2,
                    autoplay: true,
                    infinite: true,
                }
            }
        ]
    };

    return (
        <div className="restaurant-wrapper-heading mb-4">
            <h2 className="mb-1">
                {title}
            </h2>
            <div>
                <Slider {...settings}>
                    {restaurants.map((restaurant, index) => (
                        <div className="my-3">
                            <RestaurantCard restaurant={restaurant} key={index}
                                            style={{boxShadow: '0px 0px 12px -3px #c8102e2b'}}/>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}