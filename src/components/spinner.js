import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  const spinnerStyle = {
    position: "absolute",
    left: "0",
    right: "0",
    margin: "auto",
    width: "100px",
  };

  return (
    <div style={spinnerStyle}>
      <Spinner animation="border" />;
    </div>
  );
};

export default Loading;
