import axios from "axios";
import { useLayoutEffect, useState } from "react";
import "./App.css";
import Tutorials from "./component/Tutorials/Tutorials";
import config from "./config/config";
  

function App() {
  const [initialData, setInitialData] = useState(null);
  const [lightTheme, setChangeTheme] = useState("");



  useLayoutEffect(() => {
   
    const initialRequest = async () => {
      try{const { data } = await axios({
        method: "get",
        url: `${config.baseURL}index.json`,
      });
      setInitialData(data.content);}catch(e){
        console.log(e.message);
      }
    };
    initialRequest();
  }, []);

  return (
    <div className="App" id="scroller" >
      <svg onClick={(e) => { (lightTheme === "") ? setChangeTheme("dark") : setChangeTheme(""); }} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.6933 8.53653C15.5394 8.49805 15.3855 8.53653 15.2509 8.63271C14.7507 9.05591 14.1736 9.40217 13.5388 9.63301C12.9425 9.86385 12.2884 9.97927 11.5959 9.97927C10.0378 9.97927 8.61425 9.34446 7.59471 8.32492C6.57518 7.30539 5.94037 5.88189 5.94037 4.32373C5.94037 3.66968 6.05579 3.03488 6.24815 2.45778C6.45976 1.84221 6.76754 1.28435 7.17151 0.803441C7.34464 0.591839 7.30616 0.284054 7.09456 0.110926C6.95991 0.014743 6.80601 -0.0237301 6.65212 0.014743C5.01702 0.457183 3.59351 1.43825 2.57398 2.74633C1.59291 4.03518 0.996582 5.63181 0.996582 7.38233C0.996582 9.47912 1.84299 11.3835 3.22802 12.7686C4.61305 14.1536 6.51747 15 8.61425 15C10.384 15 12.0191 14.3844 13.3272 13.3649C14.6545 12.3261 15.6163 10.8449 16.0203 9.15209C16.1165 8.86355 15.9626 8.59424 15.6933 8.53653ZM12.7501 12.557C11.6344 13.4418 10.2109 13.9805 8.65272 13.9805C6.82525 13.9805 5.17091 13.2302 3.97824 12.0376C2.78558 10.8449 2.03535 9.19057 2.03535 7.3631C2.03535 5.84341 2.5355 4.45838 3.40115 3.34266C3.99748 2.5732 4.74771 1.9384 5.61335 1.49596C5.51717 1.70756 5.42098 1.91916 5.34404 2.15C5.09396 2.84251 4.97854 3.5735 4.97854 4.34296C4.97854 6.17043 5.72877 7.84401 6.92143 9.03668C8.1141 10.2293 9.78768 10.9796 11.6151 10.9796C12.4231 10.9796 13.1925 10.8449 13.9043 10.5756C14.1544 10.4794 14.4044 10.3832 14.6353 10.2678C14.1736 11.1527 13.5388 11.9414 12.7501 12.557Z" fill="#171723" />
      </svg>
      {initialData && <Tutorials theme={lightTheme} initialData={initialData} />}
    </div>
  );
}

export default App;
