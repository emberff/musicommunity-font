import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Main = () => {
  // ...保持原有逻辑代码不变...

  return (
    <>
      <div className="main-container">
        <div className="header">
          {/* 保持原有header内容不变 */}
        </div>

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
              <input type="text" placeholder="搜索歌单、歌曲、歌手..." />
            </div>

            <div className="cards-container">
              {/* 歌单卡片 */}
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

              {/* 歌曲卡片 */}
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

              {/* 歌手卡片 */}
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

        {/* 保持原有播放器代码不变 */}
      </div>

      <style>{`
        .main-container {
          max-width: 1600px;
          margin: 0 auto;
          background-color: #121212;
          color: #ffffff;
          min-height: 100vh;
          padding: 24px 32px;
        }

        .main-content {
          display: flex;
          gap: 30px;
          margin-top: 20px;
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

        /* 主内容区 */
        .content {
          flex: 1;
          min-width: 0;
        }

        /* 卡片容器 */
        .cards-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 24px;
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

        /* 卡片列表公共样式 */
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

        /* 歌单卡片特殊样式 */
        .playlist-card {
          border-left: 4px solid #9b59b6;
        }

        .playlist-card img {
          width: 50px;
          height: 50px;
          border-radius: 6px;
        }

        /* 歌曲卡片特殊样式 */
        .songs-card {
          border-left: 4px solid #3498db;
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

        /* 歌手卡片特殊样式 */
        .artists-card {
          border-left: 4px solid #e74c3c;
        }

        .artists-card img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        /* 公共信息样式 */
        .item-info {
          flex: 1;
        }

        .item-info .title {
          font-size: 14px;
          color: #fff;
        }

        .item-info .subtitle {
          font-size: 12px;
          color: #b3b3b3;
        }

        /* 搜索栏优化 */
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

        /* 响应式设计 */
        @media (max-width: 1400px) {
          .cards-container {
            grid-template-columns: 1fr;
          }
          
          .card {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Main;