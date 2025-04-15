import propTypes from "prop-types";
import { useState } from "react";
import { delFloat } from "../api/math";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { notify } from "../api/toast";
import { setCart, setIsCartLoading } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";

function ProductOrderCard({ cart }) {
  const isCartLoading = useSelector((state) => state.cart.isCartLoading);
  const [qty, setQty] = useState(cart?.qty);
  const dispatch = useDispatch();
  let add = false;

  const getCart = () => {
    api
      .getCart()
      .then((res) => {
        dispatch(setCart({ cart: { ...res.data.data } }));
      })
      .catch((err) => {
        notify(false, err.response.data.message);
      });
    dispatch(setIsCartLoading({ isLoading: false }));
    notify(true, "已更新購物車");
  };
  const deleteItem = async () => {
    withReactContent(Swal)
      .fire({
        icon: "warning", // error\warning\info\question
        title: `確定刪除${cart.product.title}`,
        text: "刪除後的資料無法恢復",
        showCancelButton: true,
        cancelButtonColor: "gray",
        confirmButtonColor: "red",
        cancelButtonText: "取消",
        confirmButtonText: "確定",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          dispatch(setIsCartLoading({ isLoading: true }));
          await api
            .deleteCart(cart.id)
            .then((res) => {
              withReactContent(Swal).fire({
                title: "刪除成功",
                confirmButtonColor: "green",
                text: `${cart.product.title}${res.data.message}`,
                icon: "success",
              });
            })
            .catch((err) => {
              withReactContent(Swal).fire({
                title: "刪除失敗",
                text: `${err.response.data.message}`,
                icon: "error",
              });
            });
          getCart();
        } else if (result.isDenied) {
          notify(false, "動作取消");
        }
      });
  };
  const updateCart = (qty) => {
    if (qty < 1) {
      notify(false, "數量不得小於1");
    } else {
      const renewData = {
        data: {
          product_id: cart.product.id,
          qty,
        },
      };
      updateItem(cart, renewData, add);
    }
  };
  const addItem = () => {
    setQty(qty + 1);
    add = true;
    updateCart(qty + 1);
  };
  const removeItem = () => {
    setQty(qty - 1);
    add = false;
    updateCart(qty - 1);
  };
  const updateItem = (cart, renewData, add) => {
    dispatch(setIsCartLoading({ isLoading: true }));
    api
      .updateCart(cart.id, renewData)
      .then(() => {
        if (add === true) notify(true, `${cart.product.title}已加入`);
        else notify(true, `${cart.product.title}已移除`);
        dispatch(setIsCartLoading({ isLoading: false }));
        getCart();
      })
      .catch((err) => {
        notify(false, err.response.data.message);
        dispatch(setIsCartLoading({ isLoading: false }));
      });
  };
  useEffect(() => {
    setQty(cart.qty);
  }, [cart]);
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <img
            src={cart?.product.imageUrl}
            alt={cart?.product.title}
            className="img-fluid object-fit-cover h-100"
          />
        </div>
        <div className="col-md-8 d-flex justify-content-between align-items-center my-3 my-lg-0">
          <div className="d-flex justify-content-between flex-lg-column">
            <div className="mt-3">
              <h5>{cart?.product.title}</h5>
              <p className="mt-3 mt-lg-0">單價：NT$ {cart?.product.price}</p>
              {cart?.final_total !== cart?.total ? (
                <p className="mt-lg-0 text-success">
                  折扣價：NT$ {delFloat(cart?.final_total)}
                </p>
              ) : (
                <p className="mt-lg-0">小計：NT$ {cart?.total}</p>
              )}
            </div>
          </div>
          <div className="d-flex">
            <div
              className="input-group mb-3"
              style={{ maxWidth: "150px", maxHeight: "20px" }}
            >
              <button
                disabled={isCartLoading || qty === 1}
                className="fs-4 btn btn-sm btn-secondary border-0"
                type="button"
                onClick={removeItem}
              >
                <i className="bi bi-dash-lg"></i>
              </button>
              <input
                disabled
                value={qty}
                type="number"
                className="form-control text-center"
                placeholder="1"
                min="1"
              />
              <button
                disabled={isCartLoading}
                className="fs-4 btn btn-sm btn-secondary border-0"
                type="button"
                onClick={addItem}
              >
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
            <div className="ms-3 d-flex flex-column justify-content-center">
              <button
                type="button"
                className="bg-white border-0"
                disabled={isCartLoading}
                onClick={deleteItem}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-trash mt-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

ProductOrderCard.propTypes = {
  cart: propTypes.object,
};

export default ProductOrderCard;
