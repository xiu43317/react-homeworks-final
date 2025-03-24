import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../api/toast";
import { ToastContainer } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminLogin() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    username: "example@test.com",
    password: "example",
  });
  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setAccount({
      ...account,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/signin`, account);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;
      alert("登入成功");
      navigate("/admin");
    } catch (err) {
      notify(false,err.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          <div className="form-floating mb-3">
            <input
              name="username"
              value={account.username}
              onChange={handleInputChange}
              type="email"
              className="form-control"
              id="username"
              placeholder="name@example.com"
            />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input
              name="password"
              value={account.password}
              onChange={handleInputChange}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            登入
          </button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
        <NavLink to={"/"}>
          <p>回首頁</p>
        </NavLink>
      </div>
    </>
  );
}

export default AdminLogin;
