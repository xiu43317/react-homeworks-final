import api from "../../api/axios";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import NewsBigCard from "../../components/NewsBigCard";
import ButtomPagination from "../../components/ButtomPagination";
import { notify } from "../../api/toast";

function NewsPage() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  const getArticles = (page) => {
    setIsScreenLoading(true);
    api
      .getArticles(page)
      .then((res) => {
        setArticles([...res.data.articles]);
        setPageInfo({ ...res.data.pagination });
        setIsScreenLoading(false);
      })
      .catch((err) => {
        notify(false, err.response.data.message);
        setIsScreenLoading(false);
      });
  };
  const handlePageChange = (e,page) => {
    e.preventDefault()
    getArticles(page);
  };
  useEffect(() => {
    getArticles();
  }, []);
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
      <div className="container mt-3" style={{ overflowX: "hidden" }}>
        <div className="text-center">
          <h3 className="fs-2 my-3 my-lg-5" data-aos="fade-right">
            最新消息
          </h3>
        </div>
        {articles.map(
          (article) =>
            article.isPublic && (
              <div
                key={article.id}
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-once="false"
              >
                <NewsBigCard tempArticle={article} />
              </div>
            )
        )}
         <div className="d-flex justify-content-center">
            <ButtomPagination pageInfo={pageInfo} handlePageChange={ handlePageChange }/>
         </div>
      </div>
    </>
  );
}

export default NewsPage;
