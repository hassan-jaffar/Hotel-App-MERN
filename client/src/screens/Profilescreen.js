import React from "react";

function Profilescreen() {
  return (
    <div className="row  justify-content-center mt-5">
      <div className="col-md-9">
        <div className="row ">
          <div className="col-md-12">
          <nav>
            <div className="nav nav-tabs nav-justified justify-content-center" id="nav-tab" role="tablist" style={{fontSize: '20px'}}>
              <button
                className="nav-link active"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="true"
              >
                Profile
              </button>
              <button
                className="nav-link"
                id="nav-bookings-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-bookings"
                type="button"
                role="tab"
                aria-controls="nav-bookings"
                aria-selected="false"
              >
                Bookings
              </button>
            </div>
          </nav>


          <div className="tab-content text-start mt-4" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <h3>My Profile</h3>
              <hr style={{width: '15%'}}/>
              <h5>Name: {JSON.parse(localStorage.getItem("currentUser")).name}</h5>
            </div>
            <div
              className="tab-pane fade"
              id="nav-bookings"
              role="tabpanel"
              aria-labelledby="nav-bookings-tab"
            >
              <h3>My Bookings</h3>
            </div>
            
          </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profilescreen;
