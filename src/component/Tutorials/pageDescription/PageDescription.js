import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { paginationActions, homeButtonActions } from "../../../store";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";


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
      displayName: "5cloud",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/cloud_storage_integrations/chapter.md",
      description: "How to manage versions",
    },
    {
      displayName: "6upload and manage",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/upload_and_manage_data_and_metadata/chapter.md",
      description: "How to manage versions",
    },
    {
      displayName: "7managedataset",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/manage_datasets/chapter.md",
      description: "How to manage versions",
    },
    {
      displayName: "8dataversion",
      location:
        "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/data_versioning/chapter.md",
      description: "How to manage versions",
    },
  ],
};

const PageDescription = forwardRef((props, ref) => {
  const { data } = props;
  const dispatch = useDispatch();
  const mdRef = useRef();
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

  const scrollBar = useRef();
      

  useEffect(() => {
    const codeElement = document.getElementsByTagName("code");
   
    for (let i = 0; i < codeElement.length; i++) {
      const button = document.createElement("button");
      button.id = "btn1";
      button.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6573 3.4H10.5145V3.20001C10.5145 2.98 10.3087 2.8 10.0573 2.8H9.37161V2.59999C9.37161 2.25999 9.07448 2 8.6859 2H7.31446C6.92588 2 6.62875 2.28 6.62875 2.59999V2.79998H5.94305C5.69161 2.79998 5.4859 2.97998 5.4859 3.19998V3.39997H4.34305C3.70304 3.39997 3.2002 3.83998 3.2002 4.39997V13C3.2002 13.56 3.70306 14 4.34305 14H11.6573C12.2974 14 12.8002 13.5599 12.8002 13V4.39999C12.8002 3.84001 12.2973 3.4 11.6573 3.4ZM5.94302 3.20001H6.85731C6.99446 3.20001 7.08587 3.12002 7.08587 3.00002V2.59999C7.08587 2.47999 7.17729 2.4 7.31443 2.4H8.68587C8.82302 2.4 8.91443 2.50001 8.91443 2.59999V2.99999C8.91443 3.11999 9.00585 3.19998 9.14299 3.19998H10.0573V3.59999V4.59998H5.94302V3.60001V3.20001ZM12.343 13C12.343 13.34 12.0459 13.6 11.6573 13.6H4.34305C3.95447 13.6 3.65734 13.34 3.65734 13V4.39999C3.65734 4.05999 3.95447 3.8 4.34305 3.8H5.4859V4.6C5.4859 4.82001 5.69161 5.00001 5.94305 5.00001H10.0573C10.3088 5.00001 10.5145 4.82001 10.5145 4.6V3.8H11.6573C12.0459 3.8 12.343 4.05999 12.343 4.39999V13Z" fill="#171723"/></svg> <span class="tooltiptext">copy</span>';
      button.onclick = () => {
        navigator.clipboard.writeText(codeElement[i].innerHTML);

        // button.innerHTML =
        //   '<svg width="19" height="19" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6573 3.4H10.5145V3.20001C10.5145 2.98 10.3087 2.8 10.0573 2.8H9.37161V2.59999C9.37161 2.25999 9.07448 2 8.6859 2H7.31446C6.92588 2 6.62875 2.28 6.62875 2.59999V2.79998H5.94305C5.69161 2.79998 5.4859 2.97998 5.4859 3.19998V3.39997H4.34305C3.70304 3.39997 3.2002 3.83998 3.2002 4.39997V13C3.2002 13.56 3.70306 14 4.34305 14H11.6573C12.2974 14 12.8002 13.5599 12.8002 13V4.39999C12.8002 3.84001 12.2973 3.4 11.6573 3.4ZM5.94302 3.20001H6.85731C6.99446 3.20001 7.08587 3.12002 7.08587 3.00002V2.59999C7.08587 2.47999 7.17729 2.4 7.31443 2.4H8.68587C8.82302 2.4 8.91443 2.50001 8.91443 2.59999V2.99999C8.91443 3.11999 9.00585 3.19998 9.14299 3.19998H10.0573V3.59999V4.59998H5.94302V3.60001V3.20001ZM12.343 13C12.343 13.34 12.0459 13.6 11.6573 13.6H4.34305C3.95447 13.6 3.65734 13.34 3.65734 13V4.39999C3.65734 4.05999 3.95447 3.8 4.34305 3.8H5.4859V4.6C5.4859 4.82001 5.69161 5.00001 5.94305 5.00001H10.0573C10.3088 5.00001 10.5145 4.82001 10.5145 4.6V3.8H11.6573C12.0459 3.8 12.343 4.05999 12.343 4.39999V13Z" fill="#056A01"/></svg> <span class="tooltiptext">copy</span>';
        // setTimeout(() => {
        //   button.innerHTML =
        //     '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6573 3.4H10.5145V3.20001C10.5145 2.98 10.3087 2.8 10.0573 2.8H9.37161V2.59999C9.37161 2.25999 9.07448 2 8.6859 2H7.31446C6.92588 2 6.62875 2.28 6.62875 2.59999V2.79998H5.94305C5.69161 2.79998 5.4859 2.97998 5.4859 3.19998V3.39997H4.34305C3.70304 3.39997 3.2002 3.83998 3.2002 4.39997V13C3.2002 13.56 3.70306 14 4.34305 14H11.6573C12.2974 14 12.8002 13.5599 12.8002 13V4.39999C12.8002 3.84001 12.2973 3.4 11.6573 3.4ZM5.94302 3.20001H6.85731C6.99446 3.20001 7.08587 3.12002 7.08587 3.00002V2.59999C7.08587 2.47999 7.17729 2.4 7.31443 2.4H8.68587C8.82302 2.4 8.91443 2.50001 8.91443 2.59999V2.99999C8.91443 3.11999 9.00585 3.19998 9.14299 3.19998H10.0573V3.59999V4.59998H5.94302V3.60001V3.20001ZM12.343 13C12.343 13.34 12.0459 13.6 11.6573 13.6H4.34305C3.95447 13.6 3.65734 13.34 3.65734 13V4.39999C3.65734 4.05999 3.95447 3.8 4.34305 3.8H5.4859V4.6C5.4859 4.82001 5.69161 5.00001 5.94305 5.00001H10.0573C10.3088 5.00001 10.5145 4.82001 10.5145 4.6V3.8H11.6573C12.0459 3.8 12.343 4.05999 12.343 4.39999V13Z" fill="#171723"/></svg> <span class="tooltiptext">copy</span>';
        // }, 500);
      };

      const refChild = codeElement[i];
      refChild &&
        refChild.innerHTML &&
        refChild.parentNode.insertBefore(button, refChild.nextSibling);
       

      
    }
  }, [MDData, isVisible]);

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

  // dispatch(paginationActions.changeTotalPages(data.content.length));
  dispatch(paginationActions.changeTotalPages(DUMMY_DATA.content.length));

  // const list = data.content.map((item, key) => (
  const list = DUMMY_DATA.content.map((item, key) => (
    <dl key={key}>
      <dt
        onClick={() => {
          dispatch(paginationActions.setNextPage(""));
          dispatch(paginationActions.setprevPage(""));
          dispatch(paginationActions.setNextURL(""));
          dispatch(homeButtonActions.setHomeButtonActive(false));

          // getDetails(
          //   "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/cloud_storage_integrations/chapter.md"
          // );
          getDetails(DUMMY_DATA.content[key].location);
          dispatch(paginationActions.changeCurrentPage(key + 1));
          if (key + 1 < totPage) {
            dispatch(
              paginationActions.setNextPage(
                // data.content[key + 1].displayName.charAt(0).toUpperCase() +
                //   data.content[key + 1].displayName.slice(1).toLowerCase()
                DUMMY_DATA.content[key + 1].displayName
                  .charAt(0)
                  .toUpperCase() +
                  DUMMY_DATA.content[key + 1].displayName.slice(1).toLowerCase()
              )
            );
            dispatch(
              // paginationActions.setNextURL(data.content[key + 1].location)
              paginationActions.setNextURL(DUMMY_DATA.content[key + 1].location)
            );
          }
          if (parseInt(key) > 0) {
            dispatch(
              paginationActions.setprevPage(
                // data.content[key - 1].displayName.charAt(0).toUpperCase() +
                //   data.content[key - 1].displayName.slice(1).toLowerCase()
                DUMMY_DATA.content[key - 1].displayName
                  .charAt(0)
                  .toUpperCase() +
                  DUMMY_DATA.content[key - 1].displayName.slice(1).toLowerCase()
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
    scrollBar.current.scrollIntoView({ behavior: "smooth" });
    getDetails(DUMMY_DATA.content[curPage - 2].location);

    // getDetails(
    //   "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/cloud_storage_integrations/chapter.md"
    // );
    if (parseInt(curPage) <= 2) {
      dispatch(paginationActions.setprevPage(null));
    }
    if (curPage >= 1) {
      dispatch(
        paginationActions.setNextPage(
          // data.content[curPage - 1].displayName.charAt(0).toUpperCase() +
          //   data.content[curPage - 1].displayName.slice(1).toLowerCase()
          DUMMY_DATA.content[curPage - 1].displayName.charAt(0).toUpperCase() +
            DUMMY_DATA.content[curPage - 1].displayName.slice(1).toLowerCase()
        )
      );
    }
    if (parseInt(curPage) > 2) {
      dispatch(
        paginationActions.setprevPage(
          // data.content[curPage - 3].displayName.charAt(0).toUpperCase() +
          //   data.content[curPage - 3].displayName.slice(1).toLowerCase()
          DUMMY_DATA.content[curPage - 3].displayName.charAt(0).toUpperCase() +
            DUMMY_DATA.content[curPage - 3].displayName.slice(1).toLowerCase()
        )
      );
    }
    dispatch(paginationActions.changeCurrentPage(curPage - 1));
  };

  const nextButtonHandler = (urlForNext) => {
    scrollBar.current.scrollIntoView({ behavior: "smooth" });
    // getDetails(
    //   "https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/data_versioning/chapter.md"
    // );
    getDetails(DUMMY_DATA.content[curPage].location);

    if (parseInt(curPage) > 0) {
      dispatch(
        paginationActions.setprevPage(
          // data.content[curPage - 1].displayName.charAt(0).toUpperCase() +
          //   data.content[curPage - 1].displayName.slice(1).toLowerCase()
          DUMMY_DATA.content[curPage - 1].displayName.charAt(0).toUpperCase() +
            DUMMY_DATA.content[curPage - 1].displayName.slice(1).toLowerCase()
        )
      );
    }
    if (curPage + 1 < totPage) {
      dispatch(
        paginationActions.setNextPage(
          // data.content[curPage + 1].displayName.charAt(0).toUpperCase() +
          //   data.content[curPage + 1].displayName.slice(1).toLowerCase()
          DUMMY_DATA.content[curPage + 1].displayName.charAt(0).toUpperCase() +
            DUMMY_DATA.content[curPage + 1].displayName.slice(1).toLowerCase()
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
        <div
          style={{ padding: "0", margin: 0 }}
          className="sidebar-content-area listing"
        >
          <SimpleBar style={{ height: "100%" }} autoHide={false}>
            <div className="md-data">
              <h1>{data.name}</h1>
              <p>{data.description}</p>
              {list}
            </div>
          </SimpleBar>
        </div>
      )}
      {MDData && !isVisible && (
        <>
          <div className="sidebar-content-area">
            <SimpleBar style={{ height: "100%" }} autoHide={false}>
              <div ref={scrollBar} className="sidebar-content-area listing">
                <div ref={mdRef} className="md-data">
                  <ReactMarkdown>{MDData}</ReactMarkdown>
                </div>
              </div>
            </SimpleBar>

            <div className="sidebar-footer">
              {prevPage && <p>Prev: {prevPage}</p>}
              {nextPage && <p>Next: {nextPage}</p>}
              <div className="footer-buttons-wrap">
                <div className="btn-placeholder">
                  {curPage > 1 && (
                    <button
                      className="prev"
                      onClick={() => {
                        prevButtonHandler(prevURL);
                      }}
                    >
                      {" "}
                      prev
                    </button>
                  )}
                </div>
                <p>
                  {curPage} of {totPage} chapters
                </p>
                <div className="btn-placeholder">
                  {curPage < totPage && (
                    <button
                      className="next"
                      onClick={() => nextButtonHandler(nextURL)}
                    >
                      next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
});

export default PageDescription;
