import propTypes from "prop-types";
import { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { delFloat } from "../api/math";

function OrderDetail({ order, payOrder }) {
  const [userOrder, setUserOrder] = useState({ ...order });
  useEffect(() => {
    setUserOrder({ ...order });
  }, [order]);
  return (
    <>
      {userOrder && (
        <div className="container mt-5 mb-3" style={{ maxWidth: "800px" }}>
          <div className="mx-auto">
            <h3 className="text-center">訂單資訊</h3>
            <hr />
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button bg-secondary text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <strong className="fs-5">商品資訊</strong>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {Object.values(userOrder.products).map((item) => (
                      <CardItem
                        key={item.id}
                        removable={{ isRemovable: false }}
                        cart={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table className="table my-3">
            <tbody>
              <tr>
                <th width="100">訂單標號</th>
                <td>{userOrder.id}</td>
              </tr>
              <tr>
                <th width="100">Email</th>
                <td>{userOrder.user.email}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{userOrder.user.name}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{userOrder.user.tel}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{userOrder.user.address}</td>
              </tr>
              <tr>
                <th width="100">訂單金額</th>
                <td>NT$ {delFloat(userOrder.total)}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  {!userOrder.is_paid ? (
                    <span>尚未付款</span>
                  ) : (
                    <span className="text-success">付款完成</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>備註</th>
                <td>{userOrder.message}</td>
              </tr>
            </tbody>
          </table>
          {!userOrder.is_paid && (
            <button
              type="button"
              className="btn btn-lg btn-secondary w-100"
              onClick={payOrder}
            >
              確認付款
            </button>
          )}
        </div>
      )}
    </>
  );
}

OrderDetail.propTypes = {
  order: propTypes.object,
  payOrder: propTypes.func,
};

export default OrderDetail;
