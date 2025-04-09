import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ButtomPagination from "../../components/ButtomPagination";
import ArticleModal from "../../modals/ArticleModal";
import DeleteArticleModal from "../../modals/DeleteArticleModal";
import { notify } from "../../api/toast";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminArticle() {
  const defaultModalState = {
    imageUrl: "",
    title: "",
    description: "",
    content: "",
    author: "",
    create_at: Number(Math.floor(new Date() / 1000)),
    tag: [],
    isPublic: false,
  };
  const [articles, setArticles] = useState([]);
  const [tempArticle, setTempArticle] = useState(defaultModalState);
  const [isScreenLoading, setIsScreenLoading] = useState();
  const [pages, setPages] = useState({});
  const [modalMode, setModalModel] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDelProductModalOpen, setDelIsProductModalOpen] = useState(false);
  const handleOpenProductModal = async (mode, id) => {
    setModalModel(mode);
    switch (mode) {
      case "create":
        setTempArticle(defaultModalState);
        break;
      case "edit":
        await getArticle(id);
        break;
    }
    setIsProductModalOpen(true);
  };
  const handleDelOpenProductModal = (article) => {
    if (!article.tag) {
      setTempArticle({
        ...article,
        tag: [],
      });
    } else {
      setTempArticle(article);
    }
    setDelIsProductModalOpen(true);
  };
  const date = (time) => {
    const localDate = new Date(time * 1000);
    return localDate.toLocaleDateString();
  };
  const getArticles = async(page = 1) => {
    setIsScreenLoading(true);
    try{
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/admin/articles?page=${page}`)
      setArticles([...res.data.articles]);
      setPages({ ...res.data.pagination });
      setIsScreenLoading(false);
    }catch(err){
      notify(false,err.response.data.message)
      setIsScreenLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    e.preventDefault();
    getArticles(page);
  };
  const getArticle = async (id) => {
    setIsScreenLoading(true);
    try{
      const res =  await axios.get(`${BASE_URL}/api/${API_PATH}/admin/article/${id}`)
      if (!res.data.article.tag) {
        setTempArticle({
          ...res.data.article,
          tag: [],
        });
      } else {
        setTempArticle({
          ...res.data.article,
        });
      }
      setIsScreenLoading(false);
    }catch(err){
      notify(false,err.response.data.message)
      setIsScreenLoading(false);
    }
  };
  useEffect(() => {
    getArticles(1);
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
      <div className="h3 mt-4 text-center">新增文章</div>
      <div className="container">
        <div className="text-end mt-4">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => handleOpenProductModal("create")}
          >
            建立新的文章
          </button>
        </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th style={{ width: "200px" }}>標題</th>
              <th style={{ width: "200px" }}>作者</th>
              <th style={{ width: "200px" }}>描述</th>
              <th style={{ width: "200px" }}>建立時間</th>
              <th style={{ width: "200px" }}>是否公開</th>
              <th style={{ width: "200px" }}>編輯</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>{article.description}</td>
                <td>{date(article.create_at)}</td>
                <td>{article.isPublic ? "已上架" : "未上架"}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      type="button"
                      onClick={() => handleOpenProductModal("edit", article.id)}
                    >
                      編輯
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      onClick={() => handleDelOpenProductModal(article)}
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ButtomPagination
          pageInfo={pages}
          handlePageChange={handlePageChange}
        />
      </div>
      <ArticleModal
        modalMode={modalMode}
        tempArticle={tempArticle}
        isOpen={isProductModalOpen}
        getArticles={getArticles}
        setIsOpen={setIsProductModalOpen}
        setIsScreenLoading={setIsScreenLoading}
      />
      <DeleteArticleModal
        isOpen={isDelProductModalOpen}
        getArticles={getArticles}
        setIsOpen={setDelIsProductModalOpen}
        tempArticle={tempArticle}
        setIsScreenLoading={setIsScreenLoading}
      />
    </>
  );
}
export default AdminArticle;
