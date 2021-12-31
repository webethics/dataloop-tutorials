import React, { useState } from "react";
import { FaBars } from "../../node_modules/react-icons/fa/index";
function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <span className={isOpen ? "Dropdown active" : "Dropdown"}>
      <FaBars
        onClick={(e) => {
          setIsOpen(!isOpen);
        }}
      />
      <span onMouseLeave={(e) => { setIsOpen(!isOpen) }} className={isOpen ? "dropdown-group active" : "dropdown-group"}>{props.children}</span>
    </span>
  );
}

export default Dropdown; 
