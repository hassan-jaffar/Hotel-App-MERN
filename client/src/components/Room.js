import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div
        className="row  px-2 py-4 my-4 bs"
        style={{
          borderRadius: "25px",
        }}
      >
        <div className="col-md-4">
          <img src={room.imageurls[0]} alt={room.name} className="smallimg" />
        </div>
        <div className="col-md-8 text-start">
          <h4>{room.name}</h4>
          <h5>Max Count: {room.maxcount}</h5>
          <h6>Phone Number: {room.phonenumber}</h6>
          <h6>Type: {room.type}</h6>
          <div style={{ float: "right" }}>

            {(fromdate && todate ) && <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-dark mx-2">Book Now</button>
            </Link>}

            <button className="btn btn-dark mx-2" onClick={handleShow}>
              View Detail
            </button>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{room.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {room.imageurls.map((url) => {
                return (
                  <Carousel.Item>
                    <img
                      className="d-block w-100 bigimg"
                      src={url}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <h6>{room.description}</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Room;
