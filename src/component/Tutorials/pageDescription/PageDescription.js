import { useState, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { paginationActions } from "../../../store";
import { Scrollbars } from "react-custom-scrollbars";
import axios from "axios";
import ReactMarkdown from "react-markdown";



const PageDescription = forwardRef((props, ref) => {
  const { data } = props;
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
          getDetails('https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/cloud_storage_integrations/chapter.md');
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
    getDetails('https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/cloud_storage_integrations/chapter.md');
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
    getDetails('https://raw.githubusercontent.com/dataloop-ai/dtlpy-documentation/sdk-tutorials/tutorials/data_management/data_versioning/chapter.md');

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
        <div className="sidebar-content-area listing">
          <Scrollbars style={{ width: "100%", height: "100%" }}>
            <div className="md-data">
              <h1>{data.name}</h1>
              <p>{data.description}</p>
              {list}
            </div>
          </Scrollbars>
        </div>
      )}
      {MDData && !isVisible && (
        <>
          <div className="sidebar-content-area">
            <Scrollbars style={{ width: "100%", height: "100%" }}>
              <div className="md-data">
                <ReactMarkdown>{MDData}</ReactMarkdown>
              </div>
            </Scrollbars>
            <div className="sidebar-footer">
              {prevPage && <p>Prev: {prevPage}</p>}
              {nextPage && <p>Next: {nextPage}</p>}
              <div className="footer-buttons-wrap">
                <div class="btn-placeholder">
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
                <div class="btn-placeholder">
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
