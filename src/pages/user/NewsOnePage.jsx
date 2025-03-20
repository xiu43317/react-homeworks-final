/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactLoading from "react-loading";
import ArticlePages from "../../components/ArticlePages ";
import { notify } from "../../api/toast";

function NewsOnePage() {
  const param = useParams();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [article, setArticle] = useState({});
  const [num, setNum] = useState("");
  const getArticle = (id) => {
    setIsScreenLoading(true);
    api
      .getArticle(id)
      .then((res) => {
        setArticle({
          ...res.data.article,
          create_at: new Date(
            res.data.article.create_at * 1000
          ).toLocaleDateString(),
        });
        setNum(param.num);
        setIsScreenLoading(false);
      })
      .catch((err) => {
        notify(err.response.data.message)
        setIsScreenLoading(false);
      });
  };
  useEffect(() => {
    getArticle(param.id);
  }, [param]);
  return (
    <>
      {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>
      )}
      <div className="container">
        <nav aria-label="breadcrumb" className="mt-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink
                to="/news"
                className="fs-5 link-secondary text-decoration-none"
              >
                消息列表
              </NavLink>
            </li>
            <li
              className="breadcrumb-item active text-success fs-5 fw-bold"
              aria-current="page"
            >
              {article.title}
            </li>
          </ol>
        </nav>
        <div className="row justify-content-center">
          <article className="col-lg-8">
            <h2>{article.title}</h2>
            <p>
              <strong className="text-muted">
                <i className="bi bi-calendar"></i>
                &nbsp;{article.create_at}
              </strong>
              &nbsp;-&nbsp;
              <strong className="text-muted">
                <i className="bi bi-pencil-square"></i>
                &nbsp;作者：{article.author}
              </strong>
            </p>
            <img
              src={article.imageUrl}
              alt={article.title}
              className="img-fluid mb-3"
            />
            <hr />
            <div
              className="fs-5"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></div>
          </article>
        </div>
        <ArticlePages num={num}/>
      </div>
    </>
  );
}

export default NewsOnePage;
