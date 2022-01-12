import React, { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import PageDescription from "./pageDescription/PageDescription";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { homeButtonActions } from '../../store/index';
function Tutorials(props) {
  const { initialData } = props;
  const [FirstListItemDescriptionData, setFirstListItemDescriptionData] = useState(null);
  const childCompRef = useRef();
  const { homeButtonActive } = useSelector(state => state.homeButton);
  const dispatch = useDispatch();
  

  const getDetails = async (additionalURL) => {
     
    try {
      const { data } = await axios({
        method: "get",
        url: `${config.baseURL}${additionalURL}`,
      });
      setFirstListItemDescriptionData(data);
      childCompRef.current.showVisible();
    } catch (e) {
      console.log(e.message)
    }
  };
  useEffect(() => {
    getDetails(initialData[0].location);
  }, [initialData]);

  return (

    <div className={`${props.theme} sidebar`}>
      <div className="top-header-area">
        <ul>
          <li className="home"
            onClick={() => {
              getDetails(initialData[0].location);
              dispatch(homeButtonActions.setHomeButtonActive(true));
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className={homeButtonActive ? 'fillColorActive' : 'fillColor'} fill="#171723" d="M14.5725 6.64322L8.17253 1.52322C8.11707 1.4763 8.04678 1.45056 7.97413 1.45056C7.90149 1.45056 7.8312 1.4763 7.77573 1.52322L1.37574 6.64322C1.31744 6.69825 1.28192 6.77316 1.2762 6.85312C1.27049 6.93309 1.295 7.01228 1.34489 7.07504C1.39477 7.1378 1.4664 7.17955 1.54559 7.19203C1.62478 7.2045 1.70577 7.1868 1.77254 7.14242L2.55974 6.54722V12.8512C2.56648 13.3067 2.75348 13.741 3.07976 14.0588C3.40605 14.3767 3.84502 14.5523 4.30053 14.5472H6.71973C6.8046 14.5472 6.886 14.5135 6.94601 14.4535C7.00602 14.3935 7.03973 14.3121 7.03973 14.2272V11.0272C7.03628 10.768 7.1351 10.5178 7.31479 10.331C7.49448 10.1441 7.74057 10.0355 7.99973 10.0288C8.12701 10.0284 8.253 10.0543 8.36976 10.105C8.48652 10.1557 8.59152 10.23 8.67813 10.3232C8.77041 10.4153 8.84297 10.5252 8.89138 10.6462C8.9398 10.7673 8.96305 10.8969 8.95973 11.0272V14.2272C8.95973 14.3121 8.99345 14.3935 9.05346 14.4535C9.11347 14.5135 9.19486 14.5472 9.27973 14.5472H11.7117C12.1655 14.5506 12.6022 14.3741 12.9261 14.0562C13.25 13.7383 13.4347 13.305 13.4397 12.8512V6.56002L14.1693 7.14242C14.2259 7.18716 14.2956 7.21191 14.3677 7.21282C14.416 7.21357 14.4637 7.20295 14.5071 7.18183C14.5504 7.1607 14.5882 7.12966 14.6173 7.09122C14.6704 7.0257 14.6954 6.94189 14.687 6.85801C14.6787 6.77412 14.6375 6.69694 14.5725 6.64322V6.64322ZM12.7997 12.8512C12.7972 12.9924 12.7669 13.1318 12.7106 13.2612C12.6542 13.3907 12.5729 13.5079 12.4713 13.6059C12.3697 13.704 12.2497 13.7811 12.1183 13.8328C11.9869 13.8845 11.8465 13.9098 11.7053 13.9072H9.59973V11.0336C9.6031 10.6041 9.43762 10.1904 9.13893 9.88162C8.99226 9.72713 8.81554 9.60428 8.61962 9.52064C8.42371 9.43699 8.21276 9.39431 7.99973 9.39522C7.78709 9.39773 7.57703 9.44209 7.38154 9.52579C7.18604 9.60949 7.00895 9.73087 6.86038 9.88302C6.7118 10.0352 6.59465 10.2151 6.51561 10.4125C6.43657 10.6099 6.3972 10.821 6.39973 11.0336V13.9072H4.30693C4.16489 13.9106 4.02356 13.886 3.89103 13.8348C3.7585 13.7835 3.63736 13.7067 3.53454 13.6086C3.43172 13.5106 3.34923 13.3932 3.29178 13.2632C3.23434 13.1333 3.20306 12.9933 3.19974 12.8512V6.02882L7.99333 2.18882L12.7997 6.02882V12.8512Z" />

            </svg>
            <span className="tooltiptext">Home</span>
          </li>
         
          <li>
            <Dropdown>
              {initialData.map((item) => (
                <DropdownItem key={item.displayName}>
                  <span onClick={() => { getDetails(item.location); dispatch(homeButtonActions.setHomeButtonActive(true)); }}>{item.displayName}</span>
                </DropdownItem>
              ))}
            </Dropdown>
          </li>
        </ul>
      </div>
      {FirstListItemDescriptionData && (
        <>
          <PageDescription
            ref={childCompRef}
            data={FirstListItemDescriptionData}
          />
        </>

      )}

    </div>
  );
}

export default Tutorials;
