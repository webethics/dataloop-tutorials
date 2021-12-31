import { useState,forwardRef,useImperativeHandle } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown'

const PageDescription = forwardRef((props,ref) => {
  const { data } = props;

  // const [dataItemDetails,setItemDetails] = useState(null);
  const [MDData, SetMDData] = useState(null);
  const [isVisible,SetIsVisible]= useState(true);

  const getDetails = async (additionalURL) => {
    const { data } = await axios({
      method: "get",
      url: `${additionalURL}`,
    });

    SetMDData(data);
    SetIsVisible(false);
  };
  useImperativeHandle(ref, () => ({
     showVisible() {
       SetIsVisible(true);
     },
   }))
   

  const list = data.content.map((item, key) => (
    <dl key={key}>
      <dt
        onClick={() => {
          getDetails("https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/cloud_storage_integrations/chapter.md");
        }}
      >
        {item.displayName}
      </dt>
      <dd>{item.description}</dd>
    </dl>
  ));
  return (
    <>
      {isVisible&& <div className="sidebar-content-area">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        {list}
      </div>}
      {MDData&& !isVisible&& <div className="sidebar-content-area"> <ReactMarkdown>{MDData}</ReactMarkdown></div>}
    </>
  );
})
export default PageDescription;
