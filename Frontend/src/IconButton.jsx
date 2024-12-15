import React, { useState } from "react";

const IconButton = () => {
  const [state, setState] = useState("empty");

  const handleClick = () => {
    if (state === "empty") {
      setState("loading");
      setTimeout(() => setState("loading"), 0); 
    } else if (state === "loading") {
      setState("done");
    }
    else if (state === "done") {
      setState("empty");
    }
  };

  const renderIcon = () => {
    if (state === "empty") {
      return <i style={{ fontSize: "20px" ,style:"", color:"#1A4372" }} className="material-icons"><bold>check_box_outline_blank</bold></i>;
    } else if (state === "loading") {
      return <i style={{ fontSize: "20px",color:"#1A4372" }} className="material-icons"><bold>hourglass_empty</bold></i>;
    } else if (state === "done") {
      return <i style={{ fontSize: "20px",color:"#1A4372" }} className="material-icons">check_box</i>;
    }
  };

  return (
    <button
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {renderIcon()}
    </button>
  );
};

export default IconButton;
