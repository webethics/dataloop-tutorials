import React from "react";

function DropdownItem(props) {
  return (
    <span className="dropdown-item" onClick={props.onClick}>
      <span>{props.children}</span>
    </span>
  );
}

export default DropdownItem;
 