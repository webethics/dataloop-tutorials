import React, { useState } from "react";
import axios from "axios";
import config from "../config/config";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import { FaLaptop } from "../../node_modules/react-icons/fa/index";
import { FaHome } from "../../node_modules/react-icons/fa/index";
import PageDescription from "./pageDescription/PageDescription";
import { useEffect, useRef } from "react/cjs/react.development";

function Tutorials(props) {
  const { initialData } = props;
  const [FirstListItemDescriptionData, setFirstListItemDescriptionData] =
    useState(null);
  const childCompRef = useRef();


  const getDetails = async (additionalURL) => {
    const { data } = await axios({
      method: "get",
      url: `${config.baseURL}${additionalURL}`,
    });

    setFirstListItemDescriptionData(data);
    childCompRef.current.showVisible();
  };
  useEffect(() => {
    getDetails("data_management/index.json");
  }, []);

  return (
    <div className="sidebar">
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
                  <a
                    href="#"
                    onClick={() => {
                      getDetails(item.location);
                    }}
                  >
                    {item.displayName}
                  </a>
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
      {/* <div className="sidebar-content-area">
        <h1>Data-Management Using Python SDK</h1>
        <p>
          Use Dataloop Python SDK to integrate with your cloud-storage
          (GCS/S3/Azure), create Datasets, upload/link your data item, manage
          the datasets and download data.
        </p>
        <p>See our SDK Getting started Guide</p>
        <h2>Guides for Data-Management</h2>
        <dl>
          <dt>Connect cloud storage</dt>
          <dd>Setup integration with GCS/S3/Azure. </dd>
          <dt>Manage datasets</dt>
          <dd>
            Create and manage Dataset, connect them with your cloud storage.
          </dd>
          <dt>Data versioning</dt>
          <dd>
            Create and manage Dataset, connect them with your cloud storage.
          </dd>
          <dt>Upload & manage data & metadata</dt>
          <dd>Upload data items and metadata.</dd>
          <dt>Upload & manage annotations</dt>
          <dd>Upload annotations into data items.</dd>
          <dt>Download data, annotations & metadata</dt>
          <dd>Upload annotations into data itemsץ</dd>
        </dl>
      </div> */}
    </div>
  );
}

export default Tutorials;
