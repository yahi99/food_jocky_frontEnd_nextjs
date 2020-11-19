import React from 'react'
import Link from "next/link";


 
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
               <select className="form-control">
                 <option value="name" key="1">name</option>
                 <option value="name" key="2">name</option>
                 <option value="name" key="3">name</option>
                 <option value="name" key="4">name</option>
                 <option value="name" key="5">name</option>
                 <option value="name" key="6">name</option>
                 <option value="name" key="7">name</option>
                 <option value="name" key="8">name</option>
              </select>
               </div>         
               <div className="form-group">
              <select className="form-control">
                 <option value="name" key="9">name</option>
                 <option value="name" key="10">name</option>
                 <option value="name" key="11">name</option>
                 <option value="name" key="12">name</option>
                 <option value="name" key="13">name</option>
                 <option value="name" key="14">name</option>
                 <option value="name" key="15">name</option>
                 <option value="name" key="16">name</option>
              </select>
               </div> 
              </form>
              <div className="secarch-ruselt-form">
                  <ul>
                     <li><Link href="/jobapply"><a>Director, Marketing | Bangladesh</a></Link></li>
                     <li><Link href="/jobapply"><a>Location Specialist | Bangladesh</a></Link> </li>
                     <li><Link href="/jobapply"><a>Commercial Lead - Shops  | Hong Kong</a></Link> </li>
                     <li><Link href="/jobapply"><a>Head of Enterprise  | Hong Kong</a></Link> </li>
                     <li><Link href="/jobapply"><a>Sales Operations Analyst (Shops)  | Hong Kong</a></Link> </li>
                     <li><Link href="/jobapply"><a>Regional Expansion Manager | Bangkok Metropolis, Thailand</a></Link> </li>
                     <li><Link href="/jobapply"><a>Warehouse Manager - Penang  | Foopanda Malaysia</a></Link> </li>
                     <li><Link href="/jobapply"><a>Head of Operations-New Verticals | Karachi</a></Link> </li>
                     <li><Link href="/jobapply"><a>Pricing Analyst | Karachi</a></Link> </li>
                     <li><Link href="/jobapply"><a>Regional Sales Manager - North - Homechefs | Islamabad</a></Link> </li>
                     <li><Link href="/jobapply"><a>Warehouse Manager - New Verticals | Karachi</a></Link> </li>
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
