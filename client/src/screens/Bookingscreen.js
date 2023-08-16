import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";

function Bookingscreen() {
  const { roomid } = useParams();
  const { fromdate } = useParams();
  const { todate } = useParams();
  const [room, setroom] = useState();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  const fdate = moment(fromdate, 'DD-MM-YYYY')
  const tdate = moment(todate, 'DD-MM-YYYY')
  const totaldays = moment.duration(tdate.diff(fdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    async function getRoom() {
      try {
        setloading(true);

        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: roomid })
        ).data;
        setroom(data);
        settotalamount(totaldays*data.rentperday)

        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    }

    getRoom();
  }, []);

  async function bookRoom(){
    const bookingDetails = {
      roomid, 
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays
    }

    try {
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
    } catch (error) {
      
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row  justify-content-center mt-5">
            <div className="col-md-10">
              <div className="row  px-2 py-4 bs br">
                <div className="col-md-6">
                  <h3>{room.name}</h3>
                  <img
                    className="bigimg"
                    src={room.imageurls[0]}
                    alt="Room Image"
                  />
                </div>
                <div className="col-md-6 text-end">
                  <h4>Booking Details</h4>
                  <hr />
                  <h5>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</h5>
                  <h5>From Date: {fromdate}</h5>
                  <h5>To Date: {todate}</h5>
                  <h5>Max Count: {room.maxcount}</h5>
                  <br />
                  <br />
                  <h4>Amount</h4>
                  <hr />
                  <h5>Total Days: {totaldays}</h5>
                  <h5>Rent per Day: PKR {room.rentperday}</h5>
                  <h3>Total Amount: PKR {totalamount}</h3>
                  <button className="btn btn-dark" onClick={bookRoom}>Pay Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
