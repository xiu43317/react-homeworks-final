import ButtomPagination from "../../components/ButtomPagination";
import ReactLoading from "react-loading";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderModal from "../../modals/OrderModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { notify } from "../../api/toast";
import { date, currency } from "../../api/utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  products: {},
  user: {},
  is_paid: false,
};

function AdminOrder() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [tempOrder, setTempOrder] = useState(defaultModalState);
  const [pages, setPages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const getOrders = (page = 1) => {
    setIsScreenLoading(true);
    setCurrentPage(page);
    axios
      .get(`${BASE_URL}/api/${API_PATH}/admin/orders?page=${page}`)
      .then((res) => {
        setOrders([...res.data.orders]);
        setPages({ ...res.data.pagination });
        setIsScreenLoading(false);
      })
      .catch((err) => {
        notify(false, err.response.data.message);
        setIsScreenLoading(false);
      });
  };
  const handlePageChange = (e, page) => {
    e.preventDefault();
    getOrders(page);
  };
  const handleOpenOrderModal = (order) => {
    setTempOrder(order);
    setIsOrderModalOpen(true);
  };
  const updatePaid = async (item) => {
    setIsScreenLoading(true);
    await axios
      .put(`${BASE_URL}/api/${API_PATH}/admin/order/${item.id}`, { data: item })
      .then((res) => {
        setIsOrderModalOpen(false);
        notify(true, res.data.message);
        getOrders(currentPage);
      })
      .catch((err) => {
        setIsScreenLoading(false);
        notify(false, err.response.data.message);
        setIsOrderModalOpen(false);
      });
  };
  const deleteAllOrders = () => {
    withReactContent(Swal)
      .fire({
        icon: "warning", // error\warning\info\question
        title: "確定刪除全部訂單",
        text: "刪除後的資料無法恢復",
        showCancelButton: true,
        cancelButtonColor: "gray",
        confirmButtonColor: "red",
        cancelButtonText: "取消",
        confirmButtonText: "確定",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setIsScreenLoading(true);
          axios
            .delete(`${BASE_URL}/api/${API_PATH}/admin/orders/all`)
            .then((res) => {
              notify(true, res.data.message);
              setIsScreenLoading(false);
              getOrders();
            })
            .catch((err) => {
              notify(false, err.response.data.message);
              setIsScreenLoading(false);
            });
        }
      });
  };
  const deleteOrder = (order) => {
    withReactContent(Swal)
      .fire({
        icon: "warning", // error\warning\info\question
        title: `確定刪除${order.user.name}的訂單`,
        text: "刪除後的資料無法恢復",
        showCancelButton: true,
        cancelButtonColor: "gray",
        confirmButtonColor: "red",
        cancelButtonText: "取消",
        confirmButtonText: "確定",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setIsScreenLoading(true);
          axios
            .delete(`${BASE_URL}/api/${API_PATH}/admin/order/${order.id}`)
            .then((res) => {
              notify(true, res.data.message + "該訂單");
              setIsScreenLoading(false);
              getOrders(currentPage);
            })
            .catch((err) => {
              notify(false, err.response.data.message);
              setIsScreenLoading(false);
            });
        }
      });
  };
  const handleChaekedChange = (e, key) => {
    let newData = {};
    const newOrder = orders.map((item, index) => {
      if (index === key) {
        newData = { ...item, is_paid: e.target.checked };
        return {
          ...item,
          is_paid: e.target.checked,
        };
      } else return item;
    });
    setOrders([...newOrder]);
    updatePaid(newData);
  };
  useEffect(() => {
    getOrders();
  }, []);
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
      <div className="container">
        <div className="text-end">
          <button
            type="button"
            className="btn btn-danger mt-3"
            onClick={deleteAllOrders}
          >
            刪除全部訂單
          </button>
        </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>購買時間</th>
              <th>Email</th>
              <th>購買款項</th>
              <th>應付金額</th>
              <th>是否付款</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={item.id}>
                <td>{date(item.create_at)}</td>
                <td>
                  <span>{item.user.email}</span>
                </td>
                <td>
                  <ul className="list-unstyled">
                    {Object.values(item.products).map((product) => (
                      <li key={product.id}>
                        {product.product.title} 數量：{product.qty}
                        {product.product.unit}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="text-right">{currency(item.total)}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_paid"
                      checked={item.is_paid}
                      onChange={(e) => handleChaekedChange(e, index)}
                    />
                    <label className="form-check-label">
                      {item.is_paid ? <span>已付款</span> : <span>未付款</span>}
                    </label>
                  </div>
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      type="button"
                      onClick={() => handleOpenOrderModal(item)}
                    >
                      檢視
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      onClick={() => deleteOrder(item)}
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ButtomPagination pageInfo={pages} handlePageChange={handlePageChange} />
      <OrderModal
        tempOrder={tempOrder}
        setIsOpen={setIsOrderModalOpen}
        isOpen={isOrderModalOpen}
        getOrders={getOrders}
        updatePaid={updatePaid}
      />
    </>
  );
}

export default AdminOrder;
