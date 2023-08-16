import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd/es";

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [response, setresponse] = useState();

  const [fromdate, setfromdate] = useState(null);
  const [todate, settodate] = useState(null);

  const [duplicaterooms, setduplicaterooms] = useState([]);

  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  useEffect(() => {
    async function fetchRooms() {
      try {
        setloading(true);

        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setduplicaterooms(data);

        setloading(false);
      } catch (error) {
        seterror(true);
        setresponse(error);
        console.log(error);
        setloading(false);
      }
    }

    fetchRooms();
  }, []);

  function filterByDate(dates) {
    const fromDate = formatDate(dates[0].$d);
    const toDate = formatDate(dates[1].$d);
    setfromdate(fromDate);
    settodate(toDate);

    var temprooms = [];
    for (const room of duplicaterooms) {
      var availability = false;
      if (room.bookings.length > 0) {
        for (const booking of room.bookings) {
          if (
            moment(booking.fromdate).isBetween(fromDate, toDate) ||
            moment(booking.todate).isBetween(fromDate, toDate) ||
            moment(fromDate).isBetween(booking.fromdate, booking.todate) ||
            moment(toDate).isBetween(booking.fromdate, booking.todate)
          )
            break;
          else {
            if (
              fromDate !== booking.fromdate &&
              fromDate !== booking.todate &&
              toDate !== booking.fromdate &&
              toDate !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.bookings.length === 0) {
        temprooms.push(room);
      }
    }
    setrooms(temprooms);
    setsearchkey('');
    settype('all');
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  function filterBySearch() {
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setrooms(temprooms);
    settype('all');
  }

  function filterByType(e) {
    settype(e);
    if (e.toLowerCase() !== "all") {
      const temprooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setrooms(temprooms);
      setsearchkey('');
    }
    else{
      setrooms(duplicaterooms);
    }
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <div className="row bs br py-4 px-3 ">
            <div className="col-md-4">
              <RangePicker
                format="DD-MM-YYYY"
                onChange={filterByDate}
                style={{
                  border: "1px solid black",
                  minHeight: "40px",
                  width: "100%",
                }}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Search Room"
                style={{ border: "1px solid black", minHeight: "40px" }}
                value={searchkey}
                onChange={(e) => {
                  setsearchkey(e.target.value);
                }}
                onKeyUp={filterBySearch}
              />
            </div>
            <div className="col-md-4">
              <select
                className="text-center form-control"
                style={{
                  border: "1px solid black",
                  minHeight: "40px",
                  width: "100%",
                }}
                value={type}
                onChange={(e) => {
                  filterByType(e.target.value);
                }}
              >
                <option value="all">All</option>
                <option value="delux">Delux</option>
                <option value="non-delux">Non-Delux</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row  justify-content-center my-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => (
            <div className="col-md-10" key={room._id}>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
