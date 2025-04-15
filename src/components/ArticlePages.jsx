import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import { notify } from "../api/toast";
import { NavLink } from "react-router-dom";

function ArticlePages({ num }) {
  const [prevPageId, setPrevPageId] = useState({});
  const [nextPageId, setNextPageId] = useState({});
  const getPages = useCallback(() => {
    let numInt = parseInt(num);
    // 剛好是這頁的最後一頁
    if (numInt % 10 === 0) {
      api
        .getArticles(numInt / 10 + 1)
        .then((res) => {
          if (!res.data.articles) setPrevPageId("");
          else
            setPrevPageId(
              res.data.articles.filter((item) => item.num === numInt + 1)[0]
            );
        })
        .catch((err) => {
          notify(false, err.response.data.message);
        });
      api
        .getArticles(numInt / 10)
        .then((res) => {
          const next = res.data.articles.filter(
            (item) => item.num === numInt - 1
          )[0];
          setNextPageId(next);
        })
        .catch((err) => {
          notify(false, err.response.data.message);
        });
    } else if (numInt === 1) {
      // 全部的最後一頁
      setNextPageId("");
      api
        .getArticles(1)
        .then((res) => {
          setPrevPageId(
            res.data.articles.filter((item) => item.num === numInt + 1)[0]
          );
        })
        .catch((err) => {
          notify(false, err.response.data.message);
        });
    } else if (numInt % 10 === 1 && numInt !== 1) {
      // 此頁第一筆資料
      api.getArticles(numInt / 10).then((res) => {
        const next = res.data.articles.filter(
          (item) => item.num === numInt - 1
        );
        setNextPageId(next[0]);
      });
      api.getArticles(numInt / 10 + 1).then((res) => {
        if (!res.data.articles) setPrevPageId("");
        else
          setNextPageId(
            res.data.articles.filter((item) => item.num === numInt + 1)[0]
          );
      });
    } else {
      api
        .getArticles(numInt / 10 + 1)
        .then((res) => {
          setNextPageId(
            res.data.articles.filter((item) => item.num === numInt - 1)[0]
          );
          if (!res.data.articles.filter((item) => item.num === numInt + 1)[0])
            setPrevPageId("");
          else
            setPrevPageId(
              res.data.articles.filter((item) => item.num === numInt + 1)[0]
            );
        })
        .catch((err) => {
          notify(false, err.response.data.message);
        });
    }
  }, [num]);
  useEffect(() => {
    getPages();
  }, [getPages]);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12 mx-auto text-center">
          <div className="row fs-5">
            {prevPageId ? (
              <strong className="col-md-6 mb-3 mb-md-0">
                <NavLink
                  className="text-decoration-none link-dark"
                  to={`/onenews/${prevPageId.id}/num/${prevPageId.num}`}
                >
                  <i className="bi bi-chevron-double-left"></i>
                  較舊一篇：{prevPageId.title}
                </NavLink>
              </strong>
            ) : (
              <strong className="col-md-6 mb-3 mb-md-0">
                <span> </span>
              </strong>
            )}
            {nextPageId ? (
              <strong className="col-md-6 mb-3 mb-md-0">
                <NavLink
                  className="text-decoration-none link-dark"
                  to={`/onenews/${nextPageId.id}/num/${nextPageId.num}`}
                >
                  較新一篇：{nextPageId.title}
                  <i className="bi bi-chevron-double-right"></i>
                </NavLink>
              </strong>
            ) : (
              <strong className="col-md-6 text-end"> </strong>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ArticlePages.propTypes = {
  num: PropTypes.string,
};

export default ArticlePages;
