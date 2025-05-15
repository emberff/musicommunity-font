import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Main = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/capi/user/userInfo`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('网络响应异常');
        
        const data = await response.json();
        if (data.success) {
          setUsername(data.data.name);
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
        navigate('/login');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <div className="main-container">
        {/* 用户信息区域 */}
        <div className="user-info-container">
          <div className="user-info">
            <span className="welcome-text">你好，</span>
            <span className="username">{username || '游客'}</span>
            <button 
              className="logout-btn"
              onClick={handleLogout}
            >
              退出登录
            </button>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="main-content">
          <div className="sidebar">
            <div className="nav-item active">
              <i className="icon-home"></i>
              <span>发现音乐</span>
            </div>
            <div className="nav-item">
              <i className="icon-library"></i>
              <span>我的歌单</span>
            </div>
            <div className="nav-item">
              <i className="icon-playlist"></i>
              <span>最近播放</span>
            </div>
          </div>

          <div className="content">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="搜索歌单、歌曲、歌手..." 
              />
            </div>

            <div className="cards-container">
              {/* 推荐歌单卡片 */}
              <div className="card playlist-card">
                <h3>推荐歌单</h3>
                <ul className="card-list">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <li key={item}>
                      <img src="playlist-cover.jpg" alt="cover" />
                      <div className="item-info">
                        <div className="title">热门电子音乐单</div>
                        <div className="subtitle">32首 播放量12万</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 热门歌曲卡片 */}
              <div className="card songs-card">
                <h3>热门歌曲</h3>
                <ul className="card-list">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <li key={item}>
                      <span className="index">{item}</span>
                      <div className="item-info">
                        <div className="title">Summer Vibes</div>
                        <div className="subtitle">Electric Dreams</div>
                      </div>
                      <span className="duration">3:45</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 人气歌手卡片 */}
              <div className="card artists-card">
                <h3>人气歌手</h3>
                <ul className="card-list">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <li key={item}>
                      <img src="artist-avatar.jpg" alt="artist" />
                      <div className="item-info">
                        <div className="title">Alan Walker</div>
                        <div className="subtitle">电子音乐制作人</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 播放器区域（保持原有结构） */}
        <div className="player-container">
          {/* 播放器控件 */}
        </div>
      </div>

      <style jsx>{`
        .main-container {
          position: relative;
          max-width: 1600px;
          margin: 0 auto;
          background-color: #121212;
          color: #ffffff;
          min-height: 100vh;
          padding: 80px 32px 120px;
        }

        /* 用户信息容器 */
        .user-info-container {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(40, 40, 40, 0.95);
          padding: 8px 20px;
          border-radius: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .welcome-text {
          font-size: 16px;
          color: #b3b3b3;
        }

        .username {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
        }

        .logout-btn {
          background: transparent;
          border: 1px solid #ffffff;
          color: #ffffff;
          padding: 6px 18px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          margin-left: 10px;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        /* 主内容区域 */
        .main-content {
          display: flex;
          gap: 30px;
          margin-top: 60px;
        }

        /* 侧边栏样式 */
        .sidebar {
          width: 260px;
          flex-shrink: 0;
          background: #000000;
          border-radius: 12px;
          padding: 20px 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 14px 24px;
          color: #b3b3b3;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-item:hover {
          background: #282828;
          color: #ffffff;
        }

        .nav-item.active {
          color: #ffffff;
          background: #282828;
        }

        /* 内容区域 */
        .content {
          flex: 1;
          min-width: 0;
        }

        /* 搜索栏 */
        .search-bar {
          max-width: 750px;
          margin-bottom: 30px;
        }

        .search-bar input {
          width: 100%;
          padding: 14px 24px;
          border: none;
          border-radius: 30px;
          background: #282828;
          color: #fff;
          font-size: 16px;
          outline: none;
          transition: all 0.3s;
        }

        .search-bar input:focus {
          background: #333;
          box-shadow: 0 0 0 2px #535353;
        }

        /* 卡片容器 */
        .cards-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .card {
          background: #181818;
          border-radius: 12px;
          padding: 20px;
          transition: transform 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .card:hover {
          transform: translateY(-5px);
          background: #242424;
        }

        .card h3 {
          font-size: 20px;
          margin: 0 0 20px 0;
          color: #fff;
        }

        /* 卡片列表 */
        .card-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 480px;
          overflow-y: auto;
        }

        .card-list li {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 10px;
          background: #252525;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: background 0.3s;
        }

        .card-list li:hover {
          background: #2e2e2e;
        }

        /* 特殊卡片样式 */
        .playlist-card { border-left: 4px solid #9b59b6; }
        .songs-card    { border-left: 4px solid #3498db; }
        .artists-card  { border-left: 4px solid #e74c3c; }

        .playlist-card img,
        .artists-card img { 
          width: 50px; 
          height: 50px; 
          border-radius: 6px; 
        }

        .artists-card img { 
          border-radius: 50%; 
        }

        .songs-card .index { 
          color: #7f8c8d; 
          width: 20px; 
          text-align: center; 
        }

        .songs-card .duration { 
          color: #7f8c8d; 
          margin-left: auto; 
        }

        .item-info .title { 
          font-size: 14px; 
          color: #fff; 
        }

        .item-info .subtitle { 
          font-size: 12px; 
          color: #b3b3b3; 
        }

        /* 响应式设计 */
        @media (max-width: 1400px) {
          .cards-container { 
            grid-template-columns: 1fr; 
          }
          
          .card { 
            max-width: 100%; 
          }
        }

        @media (max-width: 768px) {
          .user-info {
            padding: 6px 15px;
          }
          
          .logout-btn {
            padding: 4px 12px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
};

export default Main;