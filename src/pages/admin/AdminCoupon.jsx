import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import ButtomPagination from "../../components/ButtomPagination";
import CouponModal from "../../modals/CouponModal";
import DeleteCouponModal from "../../modals/DeleteCouponModal";
import { notify } from "../../api/toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  title: "",
  is_enabled: 0,
  code: "",
  due_date: new Date() / 1000,
  percent: 0,
  format_date: new Date().toISOString().split("T")[0],
  id: "",
};

function AdminCoupon() {
  const [tempCoupon, setTempCoupon] = useState(defaultModalState);
  const [coupons, setCoupons] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [modalMode, setModalModel] = useState(null);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isDelCouponModalOpen, setDelIsCouponModalOpen] = useState(false);

  const getCoupons = (page = 1) => {
    setIsScreenLoading(true);
    axios
      .get(`${BASE_URL}/api/${API_PATH}/admin/coupons?page=${page}`)
      .then((res) => {
        setCoupons([...res.data.coupons]);
        setPageInfo({ ...res.data.pagination });

        let newCoupons = res.data.coupons.map((item) => {
          return {
            ...item,
            format_date: new Date(item.due_date * 1000)
              .toISOString()
              .split("T")[0],
          };
        });
        setCoupons(newCoupons);
        setIsScreenLoading(false);
      })
      .catch((err) => {
        notify(false,err.message)
        setIsScreenLoading(false);
      });
  };
  const handlePageChange = (e, page) => {
    e.preventDefault();
    getCoupons(page);
  };
  const handleOpenProductModal = (mode, coupon) => {
    setModalModel(mode);
    switch (mode) {
      case "create":
        setTempCoupon(defaultModalState);
        break;
      case "edit":
        setTempCoupon(coupon);
        break;
    }
    setIsCouponModalOpen(true);
  };
  const handleDelOpenProductModal = (coupon) => {
    setTempCoupon(coupon);
    setDelIsCouponModalOpen(true);
  };
  useEffect(() => {
    getCoupons();
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
      <div className="h3 mt-4 text-center">優惠卷新增頁面</div>
      <div className="container">
        <div className="text-end mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleOpenProductModal("create")}
          >
            建立新的優惠卷
          </button>
        </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>名稱</th>
              <th>折扣百分比</th>
              <th>到期日</th>
              <th>折扣碼</th>
              <th>是否啟用</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.percent}</td>
                <td>{item.format_date}</td>
                <td>{item.code}</td>
                <td>
                  {item.is_enabled ? (
                    <span className="text-success">啟用</span>
                  ) : (
                    <span>未啟用</span>
                  )}
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleOpenProductModal("edit", item)}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelOpenProductModal(item)}
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ButtomPagination
          pageInfo={pageInfo}
          handlePageChange={handlePageChange}
        />
      </div>
      <CouponModal
        modalMode={modalMode}
        tempCoupon={tempCoupon}
        isOpen={isCouponModalOpen}
        setIsOpen={setIsCouponModalOpen}
        getCoupons={getCoupons}
      />
      <DeleteCouponModal
        getCoupons={getCoupons}
        isOpen={isDelCouponModalOpen}
        setIsOpen={setDelIsCouponModalOpen}
        tempCoupon={tempCoupon}
      />
    </>
  );
}

export default AdminCoupon;
