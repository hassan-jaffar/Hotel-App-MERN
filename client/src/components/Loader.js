import React, { useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div>
      <div className="sweet-loading my-auto mt-5">
        <PropagateLoader
          color="black"
          loading={loading}
          cssOverride=""
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
