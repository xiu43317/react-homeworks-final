import { NavLink, Outlet } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCallback, useEffect, useState } from "react";
import ButtomBanner from "../../components/ButtomBanner";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axios";
import { delFloat } from "../../api/math";
import { notify } from "../../api/toast";
import { setCart } from "../../redux/cartSlice";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import CardItem from "../../components/CardItem";
import UpArrow from "../../components/UpArrow";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Homelayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.carts);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [clearButtonDisable, setClearButtonDisable] = useState(false);

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
          setIsLoading(true);
          setClearButtonDisable(true);
          setIsBtnDisabled(true);
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
  const deleteItem = async (cart) => {
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
          setIsLoading(true);
          setIsBtnDisabled(true);
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
  const updateItem = (cart, renewData, add) => {
    setIsBtnDisabled(true);
    setClearButtonDisable(true);
    api
      .updateCart(cart.id, renewData)
      .then(() => {
        if (add === true) notify(true, `${cart.product.title}已加入`);
        else notify(true, `${cart.product.title}已移除`);
        setIsBtnDisabled(false);
        getCart();
      })
      .catch((err) => {
        notify(false, err.response.data.message);
        setIsBtnDisabled(false);
        setClearButtonDisable(false);
      });
  };
  const getCart = useCallback(() => {
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
    setIsBtnDisabled(false);
    setClearButtonDisable(false);
  }, [dispatch]);
  const goToShop = () => {
    navigate("/products");
  };
  useEffect(() => {
    getCart();
    AOS.init();
  }, [getCart]);
  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink to={"/introduction"} className="navbar-brand">
            <img src="img/logo-removebg.png" height="80" alt="羅傑之家" />
          </NavLink>
          <a
            className="nav-link order-md-1 position-relative"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
            style={{ width: "40px", height: "40px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-cart4"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
            {cart?.carts?.length > 0 && (
              <div
                className="rounded-circle bg-danger position-absolute start-100 translate-middle d-flex justify-content-center align-items-center"
                style={{ width: "20px", height: "20px", top: "5px" }}
              >
                <span className="text-white">{cart.carts.length}</span>
              </div>
            )}
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto h4 nav-underline text-center">
              <li className="nav-item">
                <NavLink to={"/aboutus"} className="nav-link" data-toggle>
                  關於我們
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/news"} className="nav-link" data-toggle>
                  最新消息
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/products"} className="nav-link" data-toggle>
                  產品一覽
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/notice"} className="nav-link" data-toggle>
                  購買須知
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/orders"} className="nav-link" data-toggle>
                  訂單查詢
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      <ButtomBanner />
      <div className="container-fluid py-5 bg-light h-100">
        <div
          className="copyright text-center fs-5"
          style={{ color: "#89b0ae" }}
        >
          <p>羅傑之家 所有圖片皆來自於網路</p>
          <p>
            Copyright © 2024{" "}
            <NavLink to={"/admin"} className="link-success">
              進入後台
            </NavLink>
          </p>
        </div>
      </div>
      {/* 購物出側邊欄 */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header bg-light">
          <h5 className="offcanvas-title fs-3 mt-1" id="offcanvasExampleLabel">
            購物車
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-2 d-flex justify-content-end">
            <button
              disabled={clearButtonDisable || !cart.total}
              type="button"
              className="btn btn-outline-success d-flex justify-content-center gap-2"
              onClick={deleteAllItems}
            >
              {isLoading && (
                <ReactLoading
                  type={"spin"}
                  color={"#000"}
                  height={"1.2rem"}
                  width={"1.2rem"}
                />
              )}
              <div>清空購物車</div>
            </button>
          </div>
          <hr />
          {cart.total === 0 && (
            <div className="text-center my-5">
              <p className="fs-4 fw-bold">你的購物車裡沒東西喔！</p>
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-lg btn-success"
                onClick={goToShop}
              >
                繼續選購
              </button>
            </div>
          )}
          {cart &&
            cart.carts?.map((item) => (
              <CardItem
                key={item.id}
                cart={item}
                removable={{ isRemovable: true }}
                isBtnDisabled={isBtnDisabled}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            ))}
          {cart.final_total !== cart.total ? (
            <p className="h4 text-success">
              折扣價：NT${delFloat(cart.final_total)}
            </p>
          ) : (
            <p className="h4">總計：NT$ {cart.total}</p>
          )}
          <div className="check mt-3">
            <button
              type="button"
              className="btn btn-secondary w-100 fs-4"
              data-bs-dismiss="offcanvas"
              disabled={clearButtonDisable || !cart.total}
              onClick={() => navigate("/check")}
            >
              前往結帳
            </button>
          </div>
        </div>
      </div>
      <UpArrow />
    </>
  );
}

export default Homelayout;
