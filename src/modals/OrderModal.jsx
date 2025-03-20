/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";

function OrderModal({ tempOrder, isOpen, setIsOpen, updatePaid }) {
  const orderModalRef = useRef(null);
  const [modalData, setModalData] = useState(tempOrder);

  const handleModalInputChange = (e) => {
    const { value, name, checked, type } = e.target;
    setModalData({
      ...modalData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const currency = (num) => {
    const n = parseInt(num, 10);
    return `${n
      .toFixed(0)
      .replace(/./g, (c, i, a) =>
        i && c !== "." && (a.length - i) % 3 === 0
          ? `, ${c}`.replace(/\s/g, "")
          : c
      )}`;
  };
  const handleCloseOrderModal = () => {
    const modalInstance = Modal.getInstance(orderModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };
  const date = (time) => {
    const localDate = new Date(time * 1000);
    return localDate.toLocaleDateString();
  };
  useEffect(() => {
    new Modal(orderModalRef.current, {
      backdrop: false,
    });
  }, []);
  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(orderModalRef.current);
      modalInstance.show();
    }else{
        const modalInstance = Modal.getInstance(orderModalRef.current);
        modalInstance.hide();
    }
  }, [isOpen]);
  useEffect(() => {
    setModalData({
      ...tempOrder,
    });
  }, [tempOrder]);
  return (
    <>
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={orderModalRef}
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content border-0">
            <div className="modal-header bg-secondary text-white">
              <h5 className="modal-title" id="exampleModalLabel">
                <span>訂單細節</span>
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
              <div className="row">
                <div className="col-md-4">
                  <h3>用戶資料</h3>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th style={{ width: "100px" }}>姓名</th>
                        <td>{modalData.user.name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{modalData.user.email}</td>
                      </tr>
                      <tr>
                        <th>電話</th>
                        <td>{modalData.user.tel}</td>
                      </tr>
                      <tr>
                        <th>地址</th>
                        <td>{modalData.user.address}</td>
                      </tr>
                      <tr>
                        <th>備註</th>
                        <td>{modalData.message}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-8">
                  <h3>訂單細節</h3>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th style={{ width: "100px" }}>訂單編號</th>
                        <td>{modalData.id}</td>
                      </tr>
                      <tr>
                        <th>下單時間</th>
                        <td>{date(modalData.create_at)}</td>
                      </tr>
                      <tr>
                        <th>付款時間</th>
                        <td>
                          {modalData.paid_date ? (
                            <span>{date(modalData.paid_date)}</span>
                          ) : (
                            <span>時間不正確</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>付款狀態</th>
                        <td>
                          {modalData.is_paid ? (
                            <strong className="text-success">已付款</strong>
                          ) : (
                            <span className="text-muted">尚未付款</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>總金額</th>
                        <td>{currency(modalData.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3>選購商品</h3>
                  <table className="table">
                    <thead>
                      <tr></tr>
                    </thead>
                    <tbody>
                      {Object.values(tempOrder.products).map((item) => (
                        <tr key={item.id}>
                          <th>{item.product.title}</th>
                          <td>
                            {item.qty} / {item.product.unit}
                          </td>
                          <td className="text-end">
                            {currency(item.final_total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={modalData.is_paid}
                        id="flexCheckDefault"
                        name="is_paid"
                        onChange={handleModalInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        {
                            modalData.is_paid ? <span>已付款</span>
                            : <span>未付款</span>
                        }
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseOrderModal}
              >
                取消
              </button>
              <button type="button" className="btn btn-primary" onClick={()=>updatePaid(modalData)}>
                修改付款狀態
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
