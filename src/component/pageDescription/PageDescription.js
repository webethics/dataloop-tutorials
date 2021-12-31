import { useState } from "react";

const PageDescription = (props)=>{
     const {data}=props;
     
    // const [dataItemDetails,setItemDetails] = useState(null);



     const list = data.content.map((item, key)=>(
          <dl key={key} >
               <dt onClick={()=>{console.log('hit')}}>{item.displayName}</dt>
               <dd>{item.description}</dd>
          </dl>
     ))
 return(<>
 <div className="sidebar-content-area">

      <h1>{data.name}</h1>
        <p>
         {data.description}
        </p>
        {list}
 </div>
 </>)
}
export default PageDescription;