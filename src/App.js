import axios from "axios";
import { useLayoutEffect, useState } from "react";
import "./App.css";
import Tutorials from "./component/Tutorials/Tutorials";
import config from "./config/config";
import { FaMoon } from "../node_modules/react-icons/fa/index";

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
    <div className="App">
      <FaMoon className={(lightTheme === "") ? "" : "change-theme dark" } onClick={(e) => { (lightTheme === "") ? setChangeTheme("dark") : setChangeTheme(""); }} />
      {initialData && <Tutorials theme={lightTheme} initialData={initialData} />}
    </div>
  );
}

export default App;
