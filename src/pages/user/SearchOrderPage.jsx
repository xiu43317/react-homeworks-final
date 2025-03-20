import ReactLoading from "react-loading";
import "../../assets/css/searchorderpage.css";
import OrderDetail from "../../components/OrderDetail";
import { notify } from "../../api/toast";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function SearchOrderPage() {
  const navigate = useNavigate();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const location = useLocation();
  const parsed = queryString.parse(location?.search);
  const [hideSearchBar, setHideSearchbar] = useState(false);
  const [orderId, setOrderId] = useState(parsed.id || '');
  const [order, setOrder] = useState({});
  const getOrder = () => {
    setIsScreenLoading(true);
    api
      .getOrder(orderId)
      .then((res) => {
        if (res.data.order === null) notify(false, "沒有此訂單喔");
        else {
          if (res.data.order.is_paid) {
            setOrder(res.data.order);
            setHideSearchbar(true);
          } else navigate(`/payment?id=${orderId}`);
        }
        setIsScreenLoading(false);
      })
      .catch((err) => {
        notify(false, err.response.data.message);
        setIsScreenLoading(false);
      });
  };
  const redoSearch = () => {
    setHideSearchbar(false);
    setOrder({});
    setOrderId('');
    window.scrollTo(0, 0);
  };
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
      {!hideSearchBar ? (
        <>
          <div className="container text-center mh-370">
            <h3 className="fs-2 my-5">查詢訂單</h3>
            <div className="input-group input-group-lg mt-5 mx-auto mw-500">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-white bg-opacity-50 text-dark"
                placeholder="請輸入訂單編號"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                onClick={getOrder}
              >
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {order && <OrderDetail order={order} />}
          <div className="contaner text-center">
            <button
              type="button"
              className="btn btn-lg btn-outline-success"
              onClick={redoSearch}
            >
              重新查詢
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default SearchOrderPage;
