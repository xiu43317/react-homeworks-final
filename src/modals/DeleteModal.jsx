import propTypes, { object } from "prop-types"
import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import { notify } from "../api/toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DeleteModal({ getProducts, isOpen, setIsOpen, tempProduct }) {
  const delProductModalRef = useRef(null);
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct();
      getProducts();
      handleDelCloseProductModal();
    } catch (err) {
      notify(false,err.response.data.message)
    }
  };
  const handleDelCloseProductModal = () => {
    const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };
  const deleteProduct = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/api/${API_PATH}/admin/product/${tempProduct.id}`
      );
    } catch (err) {
      notify(false,err.response.data.message)
    }
  };
  useEffect(() => {
    new Modal(delProductModalRef.current, {
      backdrop: 'static',
    });
  }, []);
  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(delProductModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);
  return (
    <div
      ref={delProductModalRef}
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              type="button"
              className="btn-close"
              onClick={handleDelCloseProductModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold">{tempProduct.title}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDelCloseProductModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteProduct}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  getProducts: propTypes.func,
  isOpen: propTypes.bool,
  setIsOpen: propTypes.func,
  tempProduct: object
}

export default DeleteModal;
