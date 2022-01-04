import React, { useState } from "react";
function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <span className={isOpen ? "Dropdown active" : "Dropdown"}>
      <svg onClick={(e) => {
        setIsOpen(!isOpen);
      }} width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.4992 1.12125H0.500776C0.359128 1.11162 0.227095 1.04723 0.133476 0.942139C0.0398567 0.837044 -0.00775305 0.699767 0.00103117 0.56025C-0.00754434 0.420858 0.0401599 0.283774 0.133758 0.178844C0.227356 0.0739142 0.359268 0.00963461 0.500776 0H15.4992C15.6407 0.00963461 15.7726 0.0739142 15.8662 0.178844C15.9598 0.283774 16.0075 0.420858 15.999 0.56025C16.0078 0.699767 15.9601 0.837044 15.8665 0.942139C15.7729 1.04723 15.6409 1.11162 15.4992 1.12125Z" fill="#171723" />
        <path d="M15.4991 6.56101H0.500607C0.362503 6.54304 0.235738 6.47627 0.143914 6.37314C0.0520897 6.27 0.00146484 6.13753 0.00146484 6.00038C0.00146484 5.86324 0.0520897 5.73076 0.143914 5.62763C0.235738 5.52449 0.362503 5.45773 0.500607 5.43976H15.4991C15.6372 5.45773 15.7639 5.52449 15.8557 5.62763C15.9476 5.73076 15.9982 5.86324 15.9982 6.00038C15.9982 6.13753 15.9476 6.27 15.8557 6.37314C15.7639 6.47627 15.6372 6.54304 15.4991 6.56101V6.56101Z" fill="#171723" />
        <path d="M15.4991 12H0.500607C0.362503 11.982 0.235738 11.9153 0.143914 11.8121C0.0520897 11.709 0.00146484 11.5765 0.00146484 11.4394C0.00146484 11.3022 0.0520897 11.1698 0.143914 11.0666C0.235738 10.9635 0.362503 10.8967 0.500607 10.8788H15.4991C15.6372 10.8967 15.7639 10.9635 15.8557 11.0666C15.9476 11.1698 15.9982 11.3022 15.9982 11.4394C15.9982 11.5765 15.9476 11.709 15.8557 11.8121C15.7639 11.9153 15.6372 11.982 15.4991 12V12Z" fill="#171723" />
      </svg>

      <span onMouseLeave={(e) => { setIsOpen(!isOpen) }} className={isOpen ? "dropdown-group active" : "dropdown-group"}>{props.children}</span>
    </span>
  );
}

export default Dropdown; 
