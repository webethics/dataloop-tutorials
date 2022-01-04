import React, { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import PageDescription from "./pageDescription/PageDescription";
import { useEffect, useRef } from "react/cjs/react.development";

function Tutorials(props) {
  const { initialData } = props;
  const [FirstListItemDescriptionData, setFirstListItemDescriptionData] = useState(null);
  const childCompRef = useRef();


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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#171723" d="M14.5725 6.64322L8.17253 1.52322C8.11707 1.4763 8.04678 1.45056 7.97413 1.45056C7.90149 1.45056 7.8312 1.4763 7.77573 1.52322L1.37574 6.64322C1.31744 6.69825 1.28192 6.77316 1.2762 6.85312C1.27049 6.93309 1.295 7.01228 1.34489 7.07504C1.39477 7.1378 1.4664 7.17955 1.54559 7.19203C1.62478 7.2045 1.70577 7.1868 1.77254 7.14242L2.55974 6.54722V12.8512C2.56648 13.3067 2.75348 13.741 3.07976 14.0588C3.40605 14.3767 3.84502 14.5523 4.30053 14.5472H6.71973C6.8046 14.5472 6.886 14.5135 6.94601 14.4535C7.00602 14.3935 7.03973 14.3121 7.03973 14.2272V11.0272C7.03628 10.768 7.1351 10.5178 7.31479 10.331C7.49448 10.1441 7.74057 10.0355 7.99973 10.0288C8.12701 10.0284 8.253 10.0543 8.36976 10.105C8.48652 10.1557 8.59152 10.23 8.67813 10.3232C8.77041 10.4153 8.84297 10.5252 8.89138 10.6462C8.9398 10.7673 8.96305 10.8969 8.95973 11.0272V14.2272C8.95973 14.3121 8.99345 14.3935 9.05346 14.4535C9.11347 14.5135 9.19486 14.5472 9.27973 14.5472H11.7117C12.1655 14.5506 12.6022 14.3741 12.9261 14.0562C13.25 13.7383 13.4347 13.305 13.4397 12.8512V6.56002L14.1693 7.14242C14.2259 7.18716 14.2956 7.21191 14.3677 7.21282C14.416 7.21357 14.4637 7.20295 14.5071 7.18183C14.5504 7.1607 14.5882 7.12966 14.6173 7.09122C14.6704 7.0257 14.6954 6.94189 14.687 6.85801C14.6787 6.77412 14.6375 6.69694 14.5725 6.64322V6.64322ZM12.7997 12.8512C12.7972 12.9924 12.7669 13.1318 12.7106 13.2612C12.6542 13.3907 12.5729 13.5079 12.4713 13.6059C12.3697 13.704 12.2497 13.7811 12.1183 13.8328C11.9869 13.8845 11.8465 13.9098 11.7053 13.9072H9.59973V11.0336C9.6031 10.6041 9.43762 10.1904 9.13893 9.88162C8.99226 9.72713 8.81554 9.60428 8.61962 9.52064C8.42371 9.43699 8.21276 9.39431 7.99973 9.39522C7.78709 9.39773 7.57703 9.44209 7.38154 9.52579C7.18604 9.60949 7.00895 9.73087 6.86038 9.88302C6.7118 10.0352 6.59465 10.2151 6.51561 10.4125C6.43657 10.6099 6.3972 10.821 6.39973 11.0336V13.9072H4.30693C4.16489 13.9106 4.02356 13.886 3.89103 13.8348C3.7585 13.7835 3.63736 13.7067 3.53454 13.6086C3.43172 13.5106 3.34923 13.3932 3.29178 13.2632C3.23434 13.1333 3.20306 12.9933 3.19974 12.8512V6.02882L7.99333 2.18882L12.7997 6.02882V12.8512Z" />
            </svg>
          </li>
          <li>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.75 9.22546H15.1368V1.57049C15.1365 1.27536 15.0191 0.992408 14.8104 0.783716C14.6017 0.575025 14.3188 0.457637 14.0236 0.457306H2.02988C1.73474 0.457637 1.45179 0.575025 1.2431 0.783716C1.03441 0.992408 0.917018 1.27536 0.916687 1.57049V9.22546H0.25C0.183696 9.22546 0.120107 9.2518 0.0732233 9.29869C0.0263392 9.34557 0 9.40916 0 9.47546L0 10.3841C0.000347386 10.6913 0.122525 10.9858 0.339728 11.203C0.556931 11.4202 0.851422 11.5423 1.15859 11.5427H14.8414C15.1486 11.5423 15.4431 11.4202 15.6603 11.203C15.8775 10.9858 15.9997 10.6913 16 10.3841V9.47546C16 9.40916 15.9737 9.34557 15.9268 9.29869C15.8799 9.2518 15.8163 9.22546 15.75 9.22546V9.22546ZM1.41669 1.57049C1.41687 1.40792 1.48153 1.25206 1.59649 1.13711C1.71144 1.02215 1.8673 0.957488 2.02988 0.957306H14.0236C14.1862 0.957488 14.3421 1.02215 14.457 1.13711C14.572 1.25206 14.6366 1.40792 14.6368 1.57049V9.22546H1.41669V1.57049ZM10.1423 9.72546C10.0789 9.84756 9.98336 9.9501 9.86607 10.0221C9.74878 10.0941 9.61411 10.1328 9.4765 10.1341H6.52338C6.38524 10.1342 6.24975 10.0961 6.13194 10.024C6.01412 9.95187 5.91856 9.84854 5.85584 9.72546H10.1423ZM15.5 10.3841C15.4998 10.5587 15.4303 10.7261 15.3069 10.8496C15.1834 10.973 15.016 11.0425 14.8414 11.0427H1.15859C0.983987 11.0425 0.816592 10.973 0.693126 10.8496C0.569661 10.7261 0.500207 10.5587 0.5 10.3841V9.72546H5.3215C5.39542 9.98723 5.55287 10.2177 5.76986 10.3817C5.98684 10.5457 6.25149 10.6344 6.5235 10.6341H9.47663C9.74866 10.6344 10.0134 10.5459 10.2304 10.3818C10.4474 10.2178 10.6048 9.98728 10.6787 9.72546H15.5V10.3841ZM8.9355 1.86577C8.9355 1.93208 8.90916 1.99567 8.86228 2.04255C8.81539 2.08944 8.7518 2.11577 8.6855 2.11577H7.368C7.3017 2.11577 7.23811 2.08944 7.19122 2.04255C7.14434 1.99567 7.118 1.93208 7.118 1.86577C7.118 1.79947 7.14434 1.73588 7.19122 1.689C7.23811 1.64211 7.3017 1.61577 7.368 1.61577H8.6855C8.7518 1.61577 8.81539 1.64211 8.86228 1.689C8.90916 1.73588 8.9355 1.79947 8.9355 1.86577ZM8.91247 3.84546L7.61003 7.36965C7.58704 7.43184 7.54029 7.48236 7.48006 7.51008C7.41983 7.5378 7.35105 7.54046 7.28886 7.51748C7.22667 7.49449 7.17615 7.44774 7.14843 7.38751C7.12071 7.32728 7.11804 7.2585 7.14103 7.19631L8.44347 3.67212C8.46646 3.60992 8.51321 3.55941 8.57344 3.53169C8.63367 3.50396 8.70245 3.5013 8.76464 3.52429C8.82683 3.54728 8.87735 3.59403 8.90507 3.65426C8.93279 3.71449 8.93546 3.78327 8.91247 3.84546V3.84546ZM6.98659 4.85443L6.23791 5.58468L6.98659 6.31496C7.01056 6.33778 7.02975 6.36512 7.04307 6.3954C7.05639 6.42569 7.06356 6.45832 7.06417 6.4914C7.06478 6.52448 7.05882 6.55735 7.04664 6.58811C7.03445 6.61887 7.01628 6.6469 6.99318 6.67059C6.97008 6.69427 6.94251 6.71314 6.91206 6.72609C6.88161 6.73904 6.8489 6.74581 6.81582 6.74602C6.78273 6.74624 6.74993 6.73988 6.71932 6.72732C6.68872 6.71476 6.6609 6.69626 6.6375 6.67287L5.70531 5.76365C5.68144 5.74036 5.66247 5.71253 5.64951 5.6818C5.63656 5.65106 5.62989 5.61805 5.62989 5.5847C5.62989 5.55134 5.63656 5.51833 5.64951 5.4876C5.66247 5.45686 5.68144 5.42903 5.70531 5.40574L6.6375 4.49652C6.68508 4.45082 6.74879 4.42578 6.81475 4.42686C6.88071 4.42793 6.94358 4.45503 6.98964 4.50226C7.03571 4.54948 7.06124 4.613 7.06067 4.67896C7.06011 4.74493 7.03349 4.808 6.98663 4.85443H6.98659ZM10.3482 5.40574C10.372 5.42903 10.391 5.45686 10.404 5.4876C10.4169 5.51833 10.4236 5.55134 10.4236 5.5847C10.4236 5.61805 10.4169 5.65106 10.404 5.6818C10.391 5.71253 10.372 5.74036 10.3482 5.76365L9.41603 6.67287C9.39259 6.69609 9.36479 6.71444 9.33422 6.72686C9.30366 6.73928 9.27094 6.74553 9.23795 6.74525C9.20496 6.74497 9.17235 6.73816 9.142 6.72521C9.11165 6.71227 9.08417 6.69345 9.06113 6.66983C9.03809 6.64621 9.01996 6.61827 9.00777 6.58761C8.99558 6.55695 8.98959 6.52418 8.99012 6.49119C8.99066 6.4582 8.99772 6.42565 9.0109 6.3954C9.02408 6.36516 9.04311 6.33782 9.06691 6.31496L9.81563 5.58468L9.06697 4.85443C9.04317 4.83158 9.02414 4.80424 9.01096 4.77399C8.99778 4.74374 8.99072 4.71119 8.99018 4.6782C8.98965 4.64521 8.99565 4.61244 9.00783 4.58178C9.02002 4.55113 9.03816 4.52318 9.06119 4.49956C9.08423 4.47595 9.11172 4.45712 9.14206 4.44418C9.17241 4.43123 9.20502 4.42442 9.23801 4.42414C9.271 4.42386 9.30372 4.43011 9.33429 4.44253C9.36485 4.45496 9.39265 4.47331 9.41609 4.49652L10.3482 5.40574Z" fill="#171723" />
            </svg>
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
