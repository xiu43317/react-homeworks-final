import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";

const url = import.meta.env.VITE_BASE_URL;

function AdminDashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const checkLogin = useCallback(async() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    await axios
      .post(`${url}/api/user/check`)
      .then(() => {
        setIsAuth(true);
      })
      .catch((error) => {
        alert(error.response.data.message);
        navigate("/Login");
      });
  },[navigate]) 
  const signOut = (e) => {
    e.preventDefault()
    axios.post(`${url}/logout`)
      .then((res) => {
        alert(res.data.message)
        document.cookie = 'hexToken=;expires=;'
        navigate('/login')
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  }
  useEffect(()=>{
    checkLogin()
  },[checkLogin])

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/admin/products" className="navbar-brand">
            後臺系統
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink to="/admin/products" className="nav-link">
                產品列表
              </NavLink>
              <NavLink to="/admin/coupons" className="nav-link">
                優惠券
              </NavLink>
              <NavLink to="/admin/orders" className="nav-link">
                訂單
              </NavLink>
              <NavLink to="/admin/articles" className="nav-link">
                新增文章
              </NavLink>
              <a className="nav-link" href="#" onClick={signOut}>
                登出
              </a>
            </div>
            <div className="navbar-nav ms-auto">
              <NavLink to="/" className="nav-link">
                回前台
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      {
        isAuth && <Outlet/>
      }
    </>
  );
}

export default AdminDashboard;
