import queryString from "query-string";
import ReactLoading from "react-loading";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import { notify } from "../../api/toast";
import FlowChart from "../../components/FlowChart";
import FinishPayment from "../../components/FinishPayment";
import OrderDetail from "../../components/OrderDetail";

function PaymentPage() {
  const location = useLocation();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [dataReady,setDataReady] = useState(false)
  const parsed = queryString.parse(location?.search);
  const [isPaid,setIsPaid] = useState(false)
  const [progress,setProgress] = useState(50)
  const [order,setOrder] = useState({})
  const getOrder = (id) => {
    setIsScreenLoading(true);
    api
      .getOrder(id)
      .then((res) => {
        setOrder(res.data.order)
        if (order.is_paid === true) {
            setIsPaid(true)
            setProgress(100)
        }
        setIsScreenLoading(false);
        setDataReady(true)
      })
      .catch((err) => {
        notify(err.response.data.message);
        setIsScreenLoading(false);
      });
  };
  const payOrder = () => {
    setIsScreenLoading(true);
    api
      .payOrder(parsed.id)
      .then((res) => {
        if (res.data.success) setIsPaid(true);
        setProgress(100)
        window.scrollTo(0, 0);
        setIsScreenLoading(false);
        getOrder(parsed.id)
      })
      .catch((err) => {
        notify(err.response.data.message);
        setIsScreenLoading(false);
      });
  };
  useEffect(()=>{
    getOrder(parsed.id)
  },[])
  return (
    <>
      {dataReady && <FlowChart progress={progress}/>}
      {isPaid && dataReady && <FinishPayment orderId={order.id}/>}
      {!isPaid && dataReady && <OrderDetail order={order} payOrder={payOrder}/>}
      
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

export default PaymentPage;
