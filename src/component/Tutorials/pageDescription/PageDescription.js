import { useState, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { paginationActions } from "../../../store";
import axios from "axios";
import ReactMarkdown from "react-markdown";
const DUMMY_DATA = {
  content: [
    {
      displayName: " 1Connect Cloud Storage",
      description: "Setup integration with GCS/S3/Azure ",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/cloud_storage_integrations/chapter.md",
    },
    {
      displayName: "2Data Versioning",
      description: "How to manage versions",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/data_versioning/chapter.md",
    },
    {
      displayName: "3manage data sets ",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/manage_datasets/chapter.md",
      description: "manage datasets",
    },
    {
      displayName: "4upload and manage",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/upload_and_manage_data_and_metadata/chapter.md",
      description: "upload and manage",
    },
    {
      displayName: "5th",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/cloud_storage_integrations/chapter.md",
      description: "How to manage versions",
    },
    {
      displayName: "6th",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/upload_and_manage_data_and_metadata/chapter.md",
      description: "How to manage versions",
    },
    {
      displayName: "7th",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/manage_datasets/chapter.md",
      description: "How to manage versions",
    },
    {
      displayName: "8th",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/data_versioning/chapter.md",
      description: "How to manage versions",
    },
  ],
};
// const PageDescription = forwardRef((props, ref) => {
//   const { data } = props;
//   const dispatch = useDispatch();
//   const {
//     currentPage: curPage,
//     totalPages: totPage,
//     nextPage,
//     prevPage,
//     prevURL,
//     nextURL,
//   } = useSelector((state) => state.pagination);

//   const [MDData, SetMDData] = useState(null);
//   const [isVisible, SetIsVisible] = useState(true);

//   const getDetails = async (additionalURL) => {
//     const { data } = await axios({
//       method: "get",
//       url: `${additionalURL}`,
//     });

//     SetMDData(data);
//     SetIsVisible(false);
//   };
//   useImperativeHandle(ref, () => ({
//     showVisible() {
//       SetIsVisible(true);
//     },
//   }));

//   dispatch(paginationActions.changeTotalPages(data.content.length));

//   const list = data.content.map((item, key) => (

//     <dl key={key}>
//       <dt
//         onClick={() => {
//           dispatch(paginationActions.setNextPage(""));
//           dispatch(paginationActions.setprevPage(""));
//           dispatch(paginationActions.setNextURL(""));
//           getDetails(
//             "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/cloud_storage_integrations/chapter.md"
//           );
//           dispatch(paginationActions.changeCurrentPage(key + 1));
//           dispatch(
//             paginationActions.setNextPage(
//               data.content[key + 1].displayName.charAt(0).toUpperCase() +
//                 data.content[key + 1].displayName.slice(1).toLowerCase()
//             )
//           );
//           dispatch(
//             paginationActions.setNextURL(data.content[key + 1].location)
//           );
//           if (parseInt(key) > 0) {
//             dispatch(
//               paginationActions.setprevPage(
//                 data.content[key - 1].displayName.charAt(0).toUpperCase() +
//                   data.content[key - 1].displayName.slice(1).toLowerCase()
//               )
//             );
//           }
//         }}
//       >
//         {item.displayName.charAt(0).toUpperCase() +
//           item.displayName.slice(1).toLowerCase()}
//       </dt>
//       <dd>{item.description}</dd>
//     </dl>
//   ));

//   const prevButtonHandler = (urlForPrev) => {
//     dispatch(paginationActions.changeCurrentPage(curPage - 1));
//     console.log(curPage);
//     getDetails(
//       "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/cloud_storage_integrations/chapter.md"
//     );
//     if (parseInt(curPage) <= 2) {
//       dispatch(paginationActions.setprevPage(null));
//     }
//     if (curPage >= 1) {
//       dispatch(
//         paginationActions.setNextPage(
//           data.content[curPage-1].displayName.charAt(0).toUpperCase() +
//             data.content[curPage-1].displayName.slice(1).toLowerCase()
//         )
//       );
//     }
//   };

//   const nextButtonHandler = (urlForNext) => {
//     getDetails(
//       "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/data_versioning/chapter.md"
//     );

//     if (parseInt(curPage) > 0) {
//       dispatch(
//         paginationActions.setprevPage(
//           data.content[curPage - 1].displayName.charAt(0).toUpperCase() +
//             data.content[curPage - 1].displayName.slice(1).toLowerCase()
//         )
//       );
//     }
//     if (curPage < totPage) {
//       dispatch(
//         paginationActions.setNextPage(
//           data.content[curPage + 1].displayName.charAt(0).toUpperCase() +
//             data.content[curPage + 1].displayName.slice(1).toLowerCase()
//         )
//       );
//     }
//     console.log(curPage);
//     dispatch(paginationActions.changeCurrentPage(curPage + 1));
//   };

//   return (
//     <>
//       {isVisible && (
//         <div className="sidebar-content-area">
//           <h1>{data.name}</h1>
//           <p>{data.description}</p>
//           {list}
//         </div>
//       )}
//       {MDData && !isVisible && (
//         <>
//           <div className="sidebar-content-area">
//             {" "}
//             <ReactMarkdown>{MDData}</ReactMarkdown>{" "}
//             {prevPage && <p>prev: {prevPage}</p>}
//             {nextPage && <p>next: {nextPage}</p>}
//             {curPage > 1 && (
//               <button
//                 onClick={() => {
//                   prevButtonHandler(prevURL);
//                 }}
//               >
//                 {" "}
//                 previous
//               </button>
//             )}
//             <h4>
//               {curPage} of {totPage} pages
//             </h4>
//             {curPage < totPage && (
//               <button onClick={() => nextButtonHandler(nextURL)}>next</button>
//             )}
//           </div>
//         </>
//       )}
//     </>
//   );
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const PageDescription = forwardRef((props, ref) => {
  const data = DUMMY_DATA;
  const dispatch = useDispatch();
  const {
    currentPage: curPage,
    totalPages: totPage,
    nextPage,
    prevPage,
    prevURL,
    nextURL,
  } = useSelector((state) => state.pagination);

  const [MDData, SetMDData] = useState(null);
  const [isVisible, SetIsVisible] = useState(true);

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
  }));

  dispatch(paginationActions.changeTotalPages(data.content.length));

  const list = data.content.map((item, key) => (
    <dl key={key}>
      <dt
        onClick={() => {
          dispatch(paginationActions.setNextPage(""));
          dispatch(paginationActions.setprevPage(""));
          dispatch(paginationActions.setNextURL(""));
          getDetails(data.content[key].location);
          dispatch(paginationActions.changeCurrentPage(key + 1));
          if (key + 1 < totPage) {
            dispatch(
              paginationActions.setNextPage(
                data.content[key + 1].displayName.charAt(0).toUpperCase() +
                  data.content[key + 1].displayName.slice(1).toLowerCase()
              )
            );
            dispatch(
              paginationActions.setNextURL(data.content[key + 1].location)
            );
          }
          if (parseInt(key) > 0) {
            dispatch(
              paginationActions.setprevPage(
                data.content[key - 1].displayName.charAt(0).toUpperCase() +
                  data.content[key - 1].displayName.slice(1).toLowerCase()
              )
            );
          }
        }}
      >
        {item.displayName.charAt(0).toUpperCase() +
          item.displayName.slice(1).toLowerCase()}
      </dt>
      <dd>{item.description}</dd>
    </dl>
  ));

  const prevButtonHandler = (urlForPrev) => {
    getDetails(data.content[curPage - 2].location);
    if (parseInt(curPage) <= 2) {
      dispatch(paginationActions.setprevPage(null));
      console.log("hit");
      console.log(curPage);
    }
    if (curPage >= 1) {
      dispatch(
        paginationActions.setNextPage(
          data.content[curPage - 1].displayName.charAt(0).toUpperCase() +
            data.content[curPage - 1].displayName.slice(1).toLowerCase()
        )
      );
    }
    if (parseInt(curPage) > 2) {
      dispatch(
        paginationActions.setprevPage(
          data.content[curPage - 3].displayName.charAt(0).toUpperCase() +
            data.content[curPage - 3].displayName.slice(1).toLowerCase()
        )
      );
    }
    dispatch(paginationActions.changeCurrentPage(curPage - 1));
  };

  const nextButtonHandler = (urlForNext) => {
    getDetails(data.content[curPage].location);

    if (parseInt(curPage) > 0) {
      dispatch(
        paginationActions.setprevPage(
          data.content[curPage - 1].displayName.charAt(0).toUpperCase() +
            data.content[curPage - 1].displayName.slice(1).toLowerCase()
        )
      );
    }
    if (curPage + 1 < totPage) {
      dispatch(
        paginationActions.setNextPage(
          data.content[curPage + 1].displayName.charAt(0).toUpperCase() +
            data.content[curPage + 1].displayName.slice(1).toLowerCase()
        )
      );
    }
    if (curPage + 1 === totPage) {
      dispatch(paginationActions.setNextPage(null));
    }

    dispatch(paginationActions.changeCurrentPage(curPage + 1));
  };

  return (
    <>
      {isVisible && (
        <div className="sidebar-content-area">
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          {list}
        </div>
      )}
      {MDData && !isVisible && (
        <>
          <div className="sidebar-content-area">
            {" "}
            <ReactMarkdown>{MDData}</ReactMarkdown>{" "}
            {prevPage && <p>prev: {prevPage}</p>}
            {nextPage && <p>next: {nextPage}</p>}
            {curPage > 1 && (
              <button
                onClick={() => {
                  prevButtonHandler(prevURL);
                }}
              >
                {" "}
                previous
              </button>
            )}
            <h4>
              {curPage} of {totPage} pages
            </h4>
            {curPage < totPage && (
              <button onClick={() => nextButtonHandler(nextURL)}>next</button>
            )}
          </div>
        </>
      )}
    </>
  );
});

export default PageDescription;
