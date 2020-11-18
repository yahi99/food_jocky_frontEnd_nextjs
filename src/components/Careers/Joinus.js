import React from 'react'
import { Select } from 'semantic-ui-react'

const countryOptions = [
   { key: 'af', value: 'af', text: 'Afghanistan' },
   { key: 'ax', value: 'ax', text: 'Aland Islands' },
   { key: 'al', value: 'al', text: 'Albania' },
   { key: 'dz', value: 'dz', text: 'Algeria' },
   { key: 'as', value: 'as', text: 'American Samoa' },
   { key: 'ad', value: 'ad', text: 'Andorra' },
   { key: 'ao', value: 'ao', text: 'Angola' },
   { key: 'ai', value: 'ai', text: 'Anguilla' },
   { key: 'ag', value: 'ag', text: 'Antigua' },
   { key: 'ar', value: 'ar', text: 'Argentina' },
   { key: 'am', value: 'am', text: 'Armenia' },
   { key: 'aw', value: 'aw', text: 'Aruba' },
   { key: 'au', value: 'au', text: 'Australia' },
   { key: 'at', value: 'at', text: 'Austria' },
   { key: 'az', value: 'az', text: 'Azerbaijan' },
   { key: 'bs', value: 'bs', text: 'Bahamas' },
   { key: 'bh', value: 'bh', text: 'Bahrain' },
   { key: 'bd', value: 'bd', text: 'Bangladesh' },
   { key: 'bb', value: 'bb', text: 'Barbados' },
   { key: 'by', value: 'by', text: 'Belarus' },
   { key: 'be', value: 'be', text: 'Belgium' },
   { key: 'bz', value: 'bz', text: 'Belize' },
   { key: 'bj', value: 'bj', text: 'Benin' },
 ]
const countryOptionsOne = [
   { key: 'af', value: 'af', text: 'Afghanistan' },
   { key: 'ax', value: 'ax', text: 'Aland Islands' },
   { key: 'al', value: 'al', text: 'Albania' },
   { key: 'dz', value: 'dz', text: 'Algeria' },
   { key: 'as', value: 'as', text: 'American Samoa' },
   { key: 'ad', value: 'ad', text: 'Andorra' },
   { key: 'ao', value: 'ao', text: 'Angola' },
   { key: 'ai', value: 'ai', text: 'Anguilla' },
   { key: 'ag', value: 'ag', text: 'Antigua' },
   { key: 'ar', value: 'ar', text: 'Argentina' },
   { key: 'am', value: 'am', text: 'Armenia' },
   { key: 'aw', value: 'aw', text: 'Aruba' },
   { key: 'au', value: 'au', text: 'Australia' },
   { key: 'at', value: 'at', text: 'Austria' },
   { key: 'az', value: 'az', text: 'Azerbaijan' },
   { key: 'bs', value: 'bs', text: 'Bahamas' },
   { key: 'bh', value: 'bh', text: 'Bahrain' },
   { key: 'bd', value: 'bd', text: 'Bangladesh' },
   { key: 'bb', value: 'bb', text: 'Barbados' },
   { key: 'by', value: 'by', text: 'Belarus' },
   { key: 'be', value: 'be', text: 'Belgium' },
   { key: 'bz', value: 'bz', text: 'Belize' },
   { key: 'bj', value: 'bj', text: 'Benin' },
 ]
 
const Joinus = () => {
 return (
  <>
   <section id="joinus-area">
    <div className="container">
     <div className="row">
        <div className="col-lg-12">
           <div className="joinus-heading">
              <h2>JOIN US</h2>
           </div>
           <div className="work-search-area">
              <form id="joinus-From">
               <div className="form-group">
                <input type="text" placeholder="Search keyword..." className="form-control" />
               </div>
               <div className="form-group">
               <Select placeholder='All Teams'  options={countryOptions} />
               </div>         
               <div className="form-group">
               <Select placeholder='All Locations' options={countryOptionsOne} />
               </div>
              </form>
              <div className="secarch-ruselt-form">
                  <ul>
                     <li><a href="#!">Director, Marketing | Bangladesh</a></li>
                     <li><a href="#!">Location Specialist | Bangladesh</a></li>
                     <li><a href="#!">Commercial Lead - Shops  | Hong Kong</a></li>
                     <li><a href="#!">Head of Enterprise  | Hong Kong</a></li>
                     <li><a href="#!">Sales Operations Analyst (Shops)  | Hong Kong</a></li>
                     <li><a href="#!">Regional Expansion Manager | Bangkok Metropolis, Thailand</a></li>
                     <li><a href="#!">Warehouse Manager - Penang  | Foopanda Malaysia</a></li>
                     <li><a href="#!">Head of Operations-New Verticals | Karachi</a></li>
                     <li><a href="#!">Pricing Analyst | Karachi</a></li>
                     <li><a href="#!">Regional Sales Manager - North - Homechefs | Islamabad</a></li>
                     <li><a href="#!">Warehouse Manager - New Verticals | Karachi</a></li>
                  </ul>
              </div>
           </div>
        </div>
     </div>
    </div>
   </section>
  </>
 )
}

export default Joinus
