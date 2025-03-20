/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CouponModal({ modalMode, tempCoupon, isOpen, setIsOpen, getCoupons }) {
  const couponModalRef = useRef(null);
  const [modalData, setModalData] = useState(tempCoupon);
  const handleCloseOrderModal = () => {
    const modalInstance = Modal.getInstance(couponModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };
  const handleModalInputChange = (e) => {
    const { value, name, checked, type } = e.target;
    setModalData({
      ...modalData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const updateCoupon = (mode) => {
    if (modalData.percent < 1) alert("折扣百分比不得小於1");
    else if (modalData.percent > 100) alert("折扣百分比不得大於100");
    else {
      if (mode === "create") {
        axios
          .post(`${BASE_URL}/api/${API_PATH}/admin/coupon`, { data: modalData })
          .then((res) => {
            alert(res.data.message);
            handleCloseOrderModal();
            getCoupons();
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        axios
          .put(`${BASE_URL}/api/${API_PATH}/admin/coupon/${modalData.id}`, {
            data: modalData,
          })
          .then((res) => {
            alert(res.data.message);
            handleCloseOrderModal();
            getCoupons();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      }
    }
  };
  useEffect(() => {
    new Modal(couponModalRef.current, {
      backdrop: false,
    });
  }, []);
  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(couponModalRef.current);
      modalInstance.show();
      setModalData(tempCoupon);
    } else {
      const modalInstance = Modal.getInstance(couponModalRef.current);
      modalInstance.hide();
    }
  }, [isOpen]);
  useEffect(() => {
    setModalData({
      ...tempCoupon,
    });
  }, [tempCoupon]);
  useEffect(() => {
    setModalData({
      ...modalData,
      due_date: Math.floor(new Date(modalData.format_date) / 1000),
    });
  }, [modalData.format_date]);
  useEffect(() => {
    setModalData({
      ...modalData,
      is_enabled: Number(modalData.is_enabled),
    });
  }, [modalData.is_enabled]);
  useEffect(()=>{
    setModalData({
        ...modalData,
        percent: Number(modalData.percent),
      });
  },[modalData.percent])
  return (
    <>
      <div
        id="couponModal"
        ref={couponModalRef}
        className="modal fade"
        tabIndex="1"
        aria-labelledby="couponModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-secondary">
              <h5 className="modal-title text-white">
                {modalMode === "create" ? (
                  <span>新增優惠券</span>
                ) : (
                  <span>更新優惠券</span>
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseOrderModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title">標題</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="title"
                  value={modalData.title}
                  placeholder="請輸入標題"
                  onChange={handleModalInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="coupon_code">優惠碼</label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  id="coupon_code"
                  value={modalData.code}
                  placeholder="請輸入優惠碼"
                  onChange={handleModalInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="due_date">到期日</label>
                <input
                  type="date"
                  className="form-control"
                  id="due_date"
                  name="format_date"
                  value={modalData.format_date}
                  onChange={handleModalInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price">折扣百分比</label>
                <input
                  type="number"
                  className="form-control"
                  name="percent"
                  id="price"
                  value={modalData.percent}
                  placeholder="請輸入折扣百分比"
                  min="1"
                  max="100"
                  onChange={handleModalInputChange}
                />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={modalData.is_enabled}
                    onChange={handleModalInputChange}
                    name="is_enabled"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="is_enabled"
                    name="is_enabled"
                  >
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseOrderModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => updateCoupon(modalMode)}
              >
                更新優惠券
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CouponModal;
