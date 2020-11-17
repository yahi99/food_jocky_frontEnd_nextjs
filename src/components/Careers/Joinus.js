import React from 'react'

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
              <form>
               <div className="form-group">
                <input type="text" placeholder="Search keyword..." className="form-control" />
               </div>
               <div className="form-group">
                 <select class="form-control">
                 <option>All Teams</option>
                 <option>• Marketing (65)</option>
                 <option>• Operations (53)</option>
                 <option>- New Business (29)</option>
               </select>
               </div>
               <div className="form-group">
               <select class="form-control">
                 <option>All Locations</option>
                 <option>2</option>
                 <option>3</option>
                 <option>4</option>
               </select>
               </div>
              </form>
           </div>
        </div>
     </div>
    </div>
   </section>
  </>
 )
}

export default Joinus
