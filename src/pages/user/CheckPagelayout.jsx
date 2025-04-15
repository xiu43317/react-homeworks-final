import FlowChart from "../../components/FlowChart";
import ProductOrderCard from "../../components/ProductOrderCard";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { delFloat } from "../../api/math";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import { notify } from "../../api/toast";
import api from "../../api/axios";
import { setCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CheckPageLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const cart = useSelector((state) => state.cart.carts);
  const [couponCode, setCouponCode] = useState("");
  const [addBtnState, setAddBtnState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const useMyCoupon = async () => {
    setIsScreenLoading(true);
    const coupon = {
      data: {
        code: couponCode,
      },
    };
    await api
      .useCoupon(coupon)
      .then((res) => {
        setIsScreenLoading(false);
        withReactContent(Swal)
          .fire({
            icon: "success",
            confirmButtonColor: "green",
            title: res.data.message,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              setIsScreenLoading(true);
              getCart();
            }
          });
      })
      .catch((err) => {
        notify(false, err.response.data.message);
        setIsScreenLoading(false);
      });
  };

  const onSubmit = handleSubmit((data) => {
    const { message, ...user } = data;
    const userInfo = {
      data: {
        user,
        message,
      },
    };
    checkout(userInfo);
  });

  const checkout = async (data) => {
    try {
      setIsScreenLoading(true);
      const res = await api.sendOrder(data);
      reset();
      dispatch(setCart({ cart: {} }));
      navigate(`/payment?id=${res.data.orderId}`);
    } catch (err) {
      notify(false, err.response.data.message);
    } finally {
      setIsScreenLoading(false);
    }
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
    setAddBtnState(false);
    setIsScreenLoading(false);
  };

  const deleteAllItems = () => {
    withReactContent(Swal)
      .fire({
        icon: "warning",
        title: <i>確定刪除整個購物車？</i>,
        text: "刪除後的資料無法恢復",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "red",
        cancelButtonColor: "gray",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setAddBtnState(true);
          setIsScreenLoading(true);
          await api
            .deleteCartAll()
            .then((res) => {
              withReactContent(Swal).fire({
                title: "刪除成功",
                confirmButtonColor: "green",
                text: `全部${res.data.message}`,
                icon: "success",
              });
            })
            .catch((err) => {
              Swal.fire({
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
  return (
    <>
      <FlowChart progress={0} />
      <div className="container my-4">
        <div className="my-5 row justify-content-center">
          <div className="col-lg-6">
            <h4 className="text-center">購物車資訊</h4>
            <hr />
            {!cart.total && (
              <div className="text-center my-5">
                <p className="fs-4 fw-bold">你的購物車現在沒東西喔!</p>
                <NavLink to={"/products"} className="btn btn-lg btn-success">
                  選購商品
                </NavLink>
              </div>
            )}
            {cart.carts?.map((item) => (
              <ProductOrderCard key={item.id} cart={item} />
            ))}
            <div className="row">
              <div className="col-md-6 my-3">
                <div className="input-group my-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="請輸入折扣碼"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    disabled={addBtnState || !cart.total}
                    className="btn btn-outline-success"
                    type="button"
                    id="button-addon2"
                    onClick={useMyCoupon}
                  >
                    套用
                  </button>
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="row">
                  {cart.final_total !== cart.total ? (
                    <span className="fs-4 fw-bold text-success col-md-12 col-7 text-end my-auto order-md-1 order-2">
                      折扣價：NT$ {delFloat(cart.final_total)}
                    </span>
                  ) : (
                    <span className="fs-4 fw-bold col-md-12 col-6 col-7 text-end my-auto order-md-1 order-2">
                      總計：NT$ {cart.total}
                    </span>
                  )}
                  <div className="col-md-12 col-5 mt-md-4 text-md-end order-lg-2 order-1 my-auto">
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      disabled={addBtnState || !cart.total}
                      onClick={deleteAllItems}
                    >
                      清空購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1"></div>
          </div>
          <form className="col-lg-6" onSubmit={onSubmit}>
            <h4 className="text-center">訂購人資訊</h4>
            <hr />
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email欄位必填",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email格式錯誤",
                  },
                })}
                id="email"
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                placeholder="請輸入 Email"
              />

              {errors.email && (
                <p className="text-danger my-2">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                收件人姓名
              </label>
              <input
                {...register("name", {
                  required: "姓名欄位必填",
                })}
                id="name"
                className={`form-control ${errors.name && "is-invalid"}`}
                placeholder="請輸入姓名"
              />

              {errors.name && (
                <p className="text-danger my-2">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="tel" className="form-label">
                收件人電話
              </label>
              <input
                {...register("tel", {
                  required: "電話欄位必填",
                  pattern: {
                    value: /^(0[2-8]\d{7}|09\d{8})$/,
                    message: "電話格式錯誤",
                  },
                })}
                id="tel"
                type="tel"
                className={`form-control ${errors.tel && "is-invalid"}`}
                placeholder="請輸入電話"
              />

              {errors.tel && (
                <p className="text-danger my-2">{errors.tel.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                收件人地址
              </label>
              <input
                {...register("address", {
                  required: "地址欄位必填",
                })}
                id="address"
                type="text"
                className={`form-control ${errors.address && "is-invalid"}`}
                placeholder="請輸入地址"
              />

              {errors.address && (
                <p className="text-danger my-2">{errors.address.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                留言
              </label>
              <textarea
                {...register("message")}
                id="message"
                className="form-control"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="btn btn-success"
                disabled={!cart.total}
              >
                送出訂單
              </button>
            </div>
          </form>
        </div>
      </div>
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
    </>
  );
}

export default CheckPageLayout;
