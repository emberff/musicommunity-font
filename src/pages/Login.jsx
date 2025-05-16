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
      <div className="login-box">
        <div className="login-header">
          <h1>MusiCommunity</h1>
          <p>享受音乐，分享生活</p>
        </div>
        {showRegister ? (
          <form className="login-form" onSubmit={async (e) => {
            e.preventDefault();
            setRegisterLoading(true);
            setRegisterError("");
            try {
              const res = await fetch(`${API_BASE_URL}/capi/user/public/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: registerName, phone: registerPhone })
              });
              const data = await res.json();
              if (res.ok && data.success) {
                setShowRegister(false);
                setPhone(registerPhone);
                setRegisterPhone("");
                setRegisterName("");
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
            <div className="input-group">
              <input
                type="text"
                placeholder="手机号"
                value={registerPhone}
                onChange={e => setRegisterPhone(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="昵称"
                value={registerName}
                onChange={e => setRegisterName(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={registerLoading} className="primary-btn">
              {registerLoading ? "注册中..." : "注册"}
            </button>
            <button type="button" onClick={()=>setShowRegister(false)} className="secondary-btn">
              返回登录
            </button>
            {registerError && <div className="login-error">{registerError}</div>}
          </form>
        ) : (
          <form className="login-form" onSubmit={handleLogin}>
            <h2>登录</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="手机号"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? "登录中..." : "登录"}
            </button>
            <button type="button" onClick={()=>setShowRegister(true)} className="secondary-btn">
              注册新账号
            </button>
            {error && <div className="login-error">{error}</div>}
          </form>
        )}
      </div>
      <style jsx>{`
        /* 全局盒模型设置 */
        * {
          box-sizing: border-box;
        }
        
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #121212;
          color: #ffffff;
          width: 100%;
          padding: 40px 20px;
          overflow-y: auto;
        }

        .login-box {
          width: 100%;
          max-width: 450px;
          margin: 0 auto;
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-header h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #9b59b6 0%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-header p {
          color: #b3b3b3;
          font-size: 16px;
        }

        .login-form {
          background: #181818;
          border-radius: 12px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-sizing: border-box;
        }

        .login-form h2 {
          margin-bottom: 24px;
          font-weight: 700;
          color: #fff;
          text-align: center;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .login-form input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          font-size: 16px;
          color: #fff;
          outline: none;
          transition: all 0.3s;
        }

        .login-form input:focus {
          border-color: #9b59b6;
          background: rgba(255, 255, 255, 0.1);
        }

        .login-form input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .primary-btn {
          background: linear-gradient(90deg, #9b59b6 0%, #f472b6 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 14px 0;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-bottom: 16px;
        }

        .primary-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(155, 89, 182, 0.3);
        }

        .primary-btn:disabled {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.4);
          cursor: not-allowed;
        }

        .secondary-btn {
          background: transparent;
          color: #b3b3b3;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px 0;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .login-error {
          color: #e74c3c;
          margin-top: 16px;
          font-size: 14px;
          text-align: center;
          background: rgba(231, 76, 60, 0.1);
          padding: 10px;
          border-radius: 6px;
          border-left: 3px solid #e74c3c;
        }

        /* 响应式样式 */
        @media (max-height: 700px) {
          .login-container {
            padding: 20px;
            align-items: flex-start;
          }
          
          .login-form {
            padding: 30px 25px;
          }
          
          .login-header {
            margin-bottom: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .login-box {
            max-width: 100%;
          }
          
          .login-form {
            padding: 30px 20px;
          }
          
          .login-header h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;