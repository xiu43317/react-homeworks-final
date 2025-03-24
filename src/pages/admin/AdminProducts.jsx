import { useEffect, useState } from "react";
import axios from "axios";
import ButtomPagination from "../../components/ButtomPagination";
import EditModal from "../../modals/EditModal";
import DeleteModal from "../../modals/DeleteModal";
import ReactLoading from "react-loading";
import { notify } from "../../api/toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
  stars:0
};

function AdminProducts() {
  const [tempProduct, setTempProduct] = useState(defaultModalState);
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [modalMode, setModalModel] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDelProductModalOpen, setDelIsProductModalOpen] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const getProducts = async (page = 1) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/${API_PATH}/admin/products?page=${page}`
      );
      setProducts(res.data.products);
      setPageInfo(res.data.pagination);
      setIsScreenLoading(false);
    } catch (err) {
      notify(false,err.response.data.message)
      setIsScreenLoading(false);
    }
  };
  const handleOpenProductModal = (mode, product) => {
    setModalModel(mode);
    switch (mode) {
      case "create":
        setTempProduct(defaultModalState);
        break;
      case "edit":
        setTempProduct(product);
        break;
    }
    setIsProductModalOpen(true);
  };
  const handlePageChange = (e, page) => {
    e.preventDefault();
    getProducts(page);
  };
  const handleDelOpenProductModal = (product) => {
    setTempProduct(product);
    setDelIsProductModalOpen(true);
  };

  useEffect(() => {
    getProducts();
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
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h2>產品列表</h2>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleOpenProductModal("create")}
              >
                建立新的產品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">商品推薦</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>
                      {Array.from({ length: product.stars }).map((item,index) => (
                        <i className="bi bi-star-fill" key={index}></i>
                      ))}
                    </td>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.is_enabled ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() =>
                            handleOpenProductModal("edit", product)
                          }
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => handleDelOpenProductModal(product)}
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ButtomPagination
          pageInfo={pageInfo}
          handlePageChange={handlePageChange}
        />
      </div>
      <EditModal
        modalMode={modalMode}
        tempProduct={tempProduct}
        isOpen={isProductModalOpen}
        getProducts={getProducts}
        setIsOpen={setIsProductModalOpen}
      />

      <DeleteModal
        tempProduct={tempProduct}
        getProducts={getProducts}
        isOpen={isDelProductModalOpen}
        setIsOpen={setDelIsProductModalOpen}
      />
    </>
  );
}

export default AdminProducts;
