import React from "react";

function Error({message}) {
  return (
    <div className="my-auto mx-auto">
      <div className="alert alert-danger" role="alert">
        <h5>{message}</h5>
      </div>
    </div>
  );
}

export default Error;
