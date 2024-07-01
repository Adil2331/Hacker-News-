import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      404 Not Found<Link to={"/"}>Home</Link>
    </div>
  );
};
