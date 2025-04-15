import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function FinishPayment({ orderId }) {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="d-flex justify-content-evenly flex-column align-items-center mh-400 py-3">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="currentColor"
            className="bi bi-cart-check text-success"
            viewBox="0 0 16 16"
          >
            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
        </div>
        <p className="fs-1 fw-bold">付款完成</p>
        <span className="fs-4 text-center">你的訂單編號</span>
        <span className="fs-3">{orderId}</span>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-lg btn-secondary py-2 px-5 m-1"
            onClick={() => navigate("/products?categlory=all")}
          >
            繼續選購
          </button>
          <button
            type="button"
            className="btn btn-lg btn-outline-success py-2 px-5 m-1"
            onClick={() => navigate(`/orders?id=${orderId}`)}
          >
            查詢訂單
          </button>
        </div>
      </div>
    </div>
  );
}

FinishPayment.propTypes = {
  orderId: propTypes.string,
};

export default FinishPayment;
