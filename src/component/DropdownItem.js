import React from "react";

function DropdownItem(props) {
  return (
    <span className="dropdown-item" onClick={props.onClick}>
      {props.children}
    </span>
  );
}

export default DropdownItem;
