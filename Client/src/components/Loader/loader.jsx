import React from "react";
import LoaderGIF from "../../media/loader2.gif";
import "./loader.css";
function loader() {
  return (
    <div className="loader_image">
      <img className="limg" src={LoaderGIF} />
    </div>
  );
}

export default loader;
