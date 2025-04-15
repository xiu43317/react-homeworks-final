import propTypes from "prop-types";
import "../assets/css/productcard.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setIsCartLoading } from "../redux/cartSlice";
import { notify } from "../api/toast";
import ReactLoading from "react-loading";
import { useState } from "react";

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const isCartLoading = useSelector((state) => state.cart.isCartLoading);
  const cart = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gotoDetail = (product) => {
    navigate(`/product/${product.id}`);
  };
  const getCart = () => {
    api
      .getCart()
      .then((res) => {
        dispatch(setCart({ cart: { ...res.data.data } }));
      })
      .catch((err) => {
        notify(false, err.response.data.message);
      });
    notify(true, "已更新購物車");
    setIsLoading(false);
    dispatch(setIsCartLoading({ isLoading: false }));
  };

  const addToCart = async () => {
    const title = product.title;
    setIsLoading(true);
    dispatch(setIsCartLoading({ isLoading: true }));
    const index = cart.carts.findIndex(
      (item) => item.product_id === product.id
    );
    const item = {
      data: {
        product_id: product.id,
        qty: 1,
      },
    };
    // 有在購物車裡面
    if (index !== -1) {
      const newQty = cart.carts[index].qty + 1;
      const cartId = cart.carts[index].id;
      item.data.qty = newQty;
      await api
        .updateCart(cartId, item)
        .then((res) => {
          notify(true, `${title}${res.data.message}`);
        })
        .catch((err) => {
          notify(false, err.response.data.message);
        });
      getCart();
    } else {
      // 沒有在購物車裡面
      await api
        .createCart(item)
        .then((res) => {
          notify(true, `${title}${res.data.message}`);
        })
        .catch((err) => {
          notify(false, err.response.data.message);
        });
      getCart();
    }
  };

  return (
    <div className="card h-100">
      <div
        className="position-relative bg-img"
        onClick={() => gotoDetail(product)}
      >
        <img
          src={product.imageUrl}
          className="card-img-top img-fluid object-fit-cover"
          alt={product.title}
          style={{ height: "250px" }}
        />
        <div
          className="title-bg position-absolute w-100 top-0
        d-flex justify-content-center align-items-end"
        >
          <p className="text-white fs-3 fw-bold">查看內容</p>
        </div>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <span className="bg-success text-white py-1 px-2 rounded">
            {product.category}
          </span>
        </div>
        <h5 className="card-title fs-4">{product.title}</h5>
        <p className="card-text fs-5">NT$ {product.price}</p>
        <button
          type="button"
          className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={() => addToCart(product.id, 1)}
          disabled={isCartLoading}
        >
          {isLoading && (
            <ReactLoading
              type={"spin"}
              color={"#000"}
              height={"1.5rem"}
              width={"1.5rem"}
            />
          )}
          <div>加入購物車</div>
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: propTypes.object,
};

export default ProductCard;
