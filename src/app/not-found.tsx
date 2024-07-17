import React from "react";

function NotFound() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // You can adjust this value if you want a different height
  };

  const imageStyle = {
    objectFit: "fill",
  };

  return (
    <div style={containerStyle}>
      <img
        src="https://http.cat/404"
        alt="404 - Page Not Found"
        style={imageStyle}
      />
    </div>
  );
}

export default NotFound;
