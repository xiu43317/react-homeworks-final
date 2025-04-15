import "../assets/css/buttombanner.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { notify } from "../api/toast";
import { useState } from "react";

function ButtomBanner() {
  const imgUrl =
    "https://images.unsplash.com/photo-1551578657-a7e74acb0135?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlfGVufDB8MHwwfHx8MA%3D%3D";
    const bg = `url(${imgUrl})`
    const [email,setEmail] = useState('')
    const checkEmail = () => {
      const validate = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      const result = validate.test(email)
      if (!result) notify(false, '信箱格式錯誤')
      else {
        withReactContent(Swal).fire({
          icon: 'info', // error\warning\info\question
          title: '訂閱優惠碼',
          text: 'newcustomer',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: 'green',
          cancelButtonColor: 'gray',
          confirmButtonText: '複製',
          cancelButtonText: '取消'
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigator.clipboard.writeText('newcustomer')
              .then(() => {
                setEmail('')
                withReactContent(Swal).fire({
                  icon: 'success',
                  confirmButtonColor: 'green',
                  title: '複製成功'
                })
              })
          } else if (result.isDenied) {
            notify(false, '取消動作')
          }
        })
      }
    }
    return (
      <div className="fixed-banner-wrap mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="wrap w-100">
              <hgroup className="title-box">
                <h4>立即訂閱享8折優惠碼</h4>
                <div className="input-group  input-group-lg mt-5 mx-auto fixed-input">
                  <input
                    type="email"
                    value={email}
                    className="form-control bg-white bg-opacity-75 text-dark"
                    placeholder="請輸入信箱"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <button className="btn btn-outline-light" type="submit" onClick={checkEmail}>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </hgroup>
              <div className="bg-item" style={{ backgroundImage: bg }}></div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ButtomBanner;
