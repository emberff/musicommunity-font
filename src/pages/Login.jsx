import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { API_BASE_URL } from '../config';

const Login = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerAvatar, setRegisterAvatar] = useState("");
  const [registerSex, setRegisterSex] = useState(0);
  const [registerError, setRegisterError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${API_BASE_URL}/capi/user/public/login?phone=${encodeURIComponent(phone)}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("token", data.data.token || "");
        navigate("/");
      } else {
        setError(data.errorMsg || "登录失败，请检查手机号");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {showRegister ? (
        <form className="login-form" onSubmit={async (e) => {
          e.preventDefault();
          setRegisterLoading(true);
          setRegisterError("");
          try {
            const res = await fetch(`${API_BASE_URL}/capi/user/public/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
              body: JSON.stringify({ avatar: registerAvatar, name: registerName, phone: registerPhone, sex: Number(registerSex) })
            });
            const data = await res.json();
            if (res.ok && data.success) {
              setShowRegister(false);
              setPhone(registerPhone);
              setRegisterPhone("");
              setRegisterName("");
              setRegisterAvatar("");
              setRegisterSex(0);
              setRegisterError("");
            } else {
              setRegisterError(data.errorMsg || "注册失败，请重试");
            }
          } catch (err) {
            setRegisterError("网络错误，请稍后重试");
          } finally {
            setRegisterLoading(false);
          }
        }}>
          <h2>注册</h2>
          <input
            type="text"
            placeholder="手机号"
            value={registerPhone}
            onChange={e => setRegisterPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="昵称"
            value={registerName}
            onChange={e => setRegisterName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="头像链接"
            value={registerAvatar}
            onChange={e => setRegisterAvatar(e.target.value)}
          />
          <select value={registerSex} onChange={e => setRegisterSex(e.target.value)} style={{marginBottom:18}}>
            <option value={0}>保密</option>
            <option value={1}>男</option>
            <option value={2}>女</option>
          </select>
          <button type="submit" disabled={registerLoading}>{registerLoading ? "注册中..." : "注册"}</button>
          <button type="button" style={{marginTop:8}} onClick={()=>setShowRegister(false)}>返回登录</button>
          {registerError && <div className="login-error">{registerError}</div>}
        </form>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>登录</h2>
          <input
            type="text"
            placeholder="手机号"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? "登录中..." : "登录"}</button>
          <button type="button" style={{marginTop:8}} onClick={()=>setShowRegister(true)}>注册新账号</button>
          {error && <div className="login-error">{error}</div>}
        </form>
      )}
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .login-form {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          min-width: 320px;
        }
        .login-form h2 {
          margin-bottom: 24px;
          font-weight: 700;
          color: #222;
        }
        .login-form input {
          margin-bottom: 18px;
          padding: 12px 14px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          transition: border 0.2s;
        }
        .login-form input:focus {
          border-color: #7c3aed;
        }
        .login-form button {
          background: linear-gradient(90deg, #7c3aed 0%, #f472b6 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 0;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .login-form button:disabled {
          background: #e0e0e0;
          color: #aaa;
          cursor: not-allowed;
        }
        .login-error {
          color: #e53e3e;
          margin-top: 8px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Login;