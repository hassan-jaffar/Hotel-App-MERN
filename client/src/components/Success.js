import React from "react";

function Success({message}) {
  return (
    <div className="my-auto mx-auto">
      <div className="alert alert-success" role="alert">
        <h6>{message}</h6>
      </div>
    </div>
  );
}

export default Success;
