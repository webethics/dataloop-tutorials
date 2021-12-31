import React, { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import { FaLaptop, FaHome } from "react-icons/fa";
import PageDescription from "./pageDescription/PageDescription";
import { useEffect, useRef } from "react/cjs/react.development";

function Tutorials(props) {
  const { initialData } = props;
  const [FirstListItemDescriptionData, setFirstListItemDescriptionData] =useState(null);
  const childCompRef = useRef();


  const getDetails = async (additionalURL) => {
  try{  const { data } = await axios({
      method: "get",
      url: `${config.baseURL}${additionalURL}`,
    });
    setFirstListItemDescriptionData(data);
    childCompRef.current.showVisible();
}catch(e){
  console.log(e.message)
}
  };
  useEffect(() => {
    getDetails("data_management/index.json");
  }, []);

  return (

    <div className={`${props.theme} sidebar`}>
      <div className="top-header-area">
        <ul>
          <li
            onClick={() => {
              getDetails("data_management/index.json");
            }}
          >
            <FaHome />
          </li>
          <li>
            <FaLaptop />
          </li>
          <li>
            <Dropdown>
              {initialData.map((item) => (
                <DropdownItem key={item.displayName}>
                  <span onClick={() => { getDetails(item.location) }}>{item.displayName}</span>
                </DropdownItem>
              ))}
            </Dropdown>
          </li>
        </ul>
      </div>
      {FirstListItemDescriptionData && (
        <PageDescription
          ref={childCompRef}
          data={FirstListItemDescriptionData}
        />
      )}
     
    </div>
  );
}

export default Tutorials;
