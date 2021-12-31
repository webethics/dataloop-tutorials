import axios from "axios";
import { useLayoutEffect, useState } from "react";
import "./App.css";
import Tutorials from "./component/Tutorials";
import config from "./config/config";

function App() {
  const [initialData, setInitialData] = useState(null);
  

  useLayoutEffect(() => {
    const initialRequest = async () => {
      const { data } = await axios({
        method: "get",
        url: `${config.baseURL}index.json`,
      });
      setInitialData(data.content);
    };
    initialRequest();
  }, []);

  return (
    <div className="App">
      {initialData && <Tutorials initialData={initialData} />}
    </div>
  );
}

export default App;
