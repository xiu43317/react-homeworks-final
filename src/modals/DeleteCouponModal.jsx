import propTypes, { bool } from "prop-types"
import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import { notify } from "../api/toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DeleteCouponModal({ getCoupons, isOpen, setIsOpen, tempCoupon }) {
  const delCouponModalRef = useRef(null);
  const handleDeleteCoupon = async () => {
    try {
      await deleteCoupon();
      getCoupons();
      handleDelCloseCouponModal();
    } catch (err) {
      notify(false,err.response.data.message)
    }
  };
  const handleDelCloseCouponModal = () => {
    const modalInstance = Modal.getInstance(delCouponModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };
  const deleteCoupon = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/api/${API_PATH}/admin/coupon/${tempCoupon.id}`
      );
    } catch (error) {
      console.log(error);
      alert("刪除產品失敗");
    }
  };
  useEffect(() => {
    new Modal(delCouponModalRef.current, {
      backdrop: 'static',
    });
  }, []);
  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(delCouponModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);
  return (
    <div
      ref={delCouponModalRef}
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除折價卷</h1>
            <button
              type="button"
              className="btn-close"
              onClick={handleDelCloseCouponModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold">{tempCoupon.title}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDelCloseCouponModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteCoupon}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteCouponModal.propTypes = {
  getCoupons: propTypes.func,
  isOpen: bool,
  setIsOpen: propTypes.func,
  tempCoupon: propTypes.object
}

export default DeleteCouponModal;
