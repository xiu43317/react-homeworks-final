import ProductCard from "../../components/ProductCard";
import api from "../../api/axios";
import ButtomPagination from "../../components/ButtomPagination";
import { notify } from "../../api/toast";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import queryString from "query-string";

function ProductsPage() {
  const location = useLocation();
  const parsed = queryString.parse(location?.search);
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [category, setCategory] = useState(
    parsed ? parsed.category : "全部"
  );

  const handlePageChange = (event, page, category) => {
    event.preventDefault();
    if (category === "全部") getProducts(page);
    else getProducts(page, category);
  };
  const changeCategory = (item) => {
    setCategory(item);
    if (item === "全部") getProducts(1);
    else getProducts(1, item);
  };

  const getProducts = (page, category) => {
    setIsScreenLoading(true);
    api
      .getProducts(page, category)
      .then((res) => {
        setProducts([...res.data.products]);
        setPageInfo({ ...res.data.pagination });
        window.scroll(0, 0);
        setIsScreenLoading(false);
      })
      .catch((err) => {
        notify(false, err.response.data.message);
        setIsScreenLoading(false);
      });
  };
  useEffect(() => {
    if (category === "全部") getProducts(1);
    else getProducts(1, category);
  }, [category]);
  useEffect(()=>{
    if(!location?.search) setCategory("全部")
    else setCategory(queryString.parse(location?.search).category)
  },[location?.search])
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <ul className="list-group text-center side-menu">
              <li className="list-group-item bg-light h3 mb-0 text-dark fw-bold">
                甜點列表
              </li>
              <button
                type="button"
                onClick={() => changeCategory("全部")}
                className={`list-group-item list-group-item-action list-group-item-light h4 mb-0 ${
                  category === "全部" && "active"
                }`}
              >
                所有甜點
              </button>
              <button
                type="button"
                onClick={() => changeCategory("蛋糕")}
                className={`list-group-item list-group-item-action list-group-item-light h4 mb-0 ${
                  category === "蛋糕" && "active"
                }`}
              >
                特色蛋糕
              </button>
              <button
                type="button"
                onClick={() => changeCategory("泡芙")}
                className={`list-group-item list-group-item-action list-group-item-light h4 mb-0 ${
                  category === "泡芙" && "active"
                }`}
              >
                閃電泡芙
              </button>
              <button
                type="button"
                onClick={() => changeCategory("千層酥")}
                className={`list-group-item list-group-item-action list-group-item-light h4 mb-0 ${
                  category === "千層酥" && "active"
                }`}
              >
                酥脆千層
              </button>
              <button
                type="button"
                onClick={() => changeCategory("馬卡龍")}
                className={`list-group-item list-group-item-action list-group-item-light h4 mb-0 ${
                  category === "馬卡龍" && "active"
                }`}
              >
                經典馬卡龍
              </button>
            </ul>
          </div>
          <div className="col-md-9">
            <div className="row">
              {products.map(
                (product) =>
                  product.is_enabled && (
                    <div
                      key={product.id}
                      className="col-md-4 mb-5 mt-1"
                      data-aos="flip-left"
                    >
                      <ProductCard product={product} />
                    </div>
                  )
              )}
            </div>
            <div className="d-flex justify-content-center">
              <ButtomPagination
                pageInfo={pageInfo}
                handlePageChange={handlePageChange}
                category={category}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
