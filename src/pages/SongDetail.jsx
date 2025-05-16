import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { PlayerContext } from '../App';

const SongDetail = () => {
  // 获取原始ID，不让ID自动转为数字
  const params = useParams();
  const rawId = params.id;
  // 确保ID始终为字符串
  const id = String(rawId);
  
  // 输出ID以便调试
  console.log('歌曲详情页ID参数:', id, '类型:', typeof id, '原始URL参数:', rawId);
  
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { setCurrentSong } = useContext(PlayerContext);

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

  useEffect(() => {
    const fetchSongDetails = async () => {
      setLoading(true);
      try {
        if (!id) {
          console.error('歌曲ID不存在');
          navigate('/');
          return;
        }
        
        // 使用URLSearchParams来构建参数，避免字符串拼接导致的精度丢失
        const strId = String(id);
        console.log('请求歌曲详情，原始ID:', rawId, '处理后ID:', strId);
        
        // 直接构建URL对象和URLSearchParams
        const url = new URL(`${API_BASE_URL}/capi/song/get`);
        url.searchParams.append('id', strId);
        
        console.log('请求完整URL:', url.toString());
        
        const response = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('网络响应异常');
        
        // 手动解析JSON，防止大整数精度丢失
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
          
          // 确保解析后的歌曲ID仍为字符串
          if (data.success && data.data && data.data.id) {
            console.log('API返回的歌曲ID:', data.data.id, '类型:', typeof data.data.id);
            data.data.id = String(data.data.id);
          }
        } catch (e) {
          console.error('JSON解析错误:', e);
          setLoading(false);
          return;
        }
        
        if (data.success) {
          setSong(data.data);
        }
      } catch (error) {
        console.error('获取歌曲详情失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongDetails();
  }, [id, navigate, rawId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const playSong = () => {
    if (song) {
      setCurrentSong(song);
    }
  };

  if (loading || !song) {
    return (
      <div className="main-container">
        <div className="loading-indicator">加载中...</div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="user-info-container">
        <div className="user-info">
          <span className="welcome-text">你好，</span>
          <span 
            className="username" 
            onMouseEnter={() => setShowUserInfo(true)}
            onMouseLeave={() => setShowUserInfo(false)}
          >
            {username || '游客'}
            {showUserInfo && (
              <div className="user-info-popup">
                <div className="user-info-item">用户: {username}</div>
                <div className="user-info-item">等级: VIP用户</div>
                <div className="user-info-item">关注: 233</div>
                <div className="user-info-item">粉丝: 156</div>
              </div>
            )}
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="搜索歌单、歌曲、歌手..."
          />
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            退出登录
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="sidebar">
          <div className="nav-item" onClick={() => navigate('/')}>
            <i className="icon-home"></i>
            <span>发现音乐</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/playlists')}>
            <i className="icon-library"></i>
            <span>我的歌单</span>
          </div>
          <div className="nav-item">
            <i className="icon-playlist"></i>
            <span>最近播放</span>
          </div>
        </div>

        <div className="content">
          <div className="song-detail-container">
            <div className="song-cover-container">
              <img src={song.cover || 'default-cover.jpg'} alt={song.name} className="large-cover" />
            </div>
            <div className="song-detail-info">
              <h1 className="song-title">{song.name}</h1>
              <div className="song-meta">
                <div className="meta-item">
                  <span className="meta-label">歌手：</span>
                  <span className="meta-value">{song.artist}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">专辑：</span>
                  <span className="meta-value">{song.album || '未知专辑'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">发行时间：</span>
                  <span className="meta-value">{song.releaseDate || '未知'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">播放次数：</span>
                  <span className="meta-value">{song.playCount || 0}</span>
                </div>
              </div>
              <div className="song-actions">
                <button onClick={playSong} className="play-button">
                  <span className="play-icon">▶</span>
                </button>
                <button className="add-to-playlist-button">
                  <span className="add-icon">+</span>
                  添加到歌单
                </button>
              </div>
            </div>
          </div>
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
          padding: 40px 32px 120px; 
        }
        
        .loading-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          color: #fff;
          font-size: 18px;
        }
        
        .main-content { 
          display: flex; 
          gap: 30px; 
        }
        
        /* 用户信息容器 */
        .user-info-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(18, 18, 18, 0.95);
          backdrop-filter: blur(10px);
          padding: 10px 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-info {
          display: flex;
          align-items: center;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
        }

        .welcome-text {
          font-size: 16px;
          color: #b3b3b3;
        }

        .username {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          position: relative;
          cursor: pointer;
          margin-right: auto;
        }

        .username:hover {
          text-decoration: underline;
        }

        .user-info-popup {
          position: absolute;
          top: 100%;
          left: 0;
          width: 200px;
          background: rgba(40, 40, 40, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          padding: 12px;
          margin-top: 10px;
          z-index: 1001;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-info-item {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 14px;
          color: #e1e1e1;
        }

        .user-info-item:last-child {
          border-bottom: none;
        }

        .logout-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          padding: 5px 15px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* 搜索栏样式 */
        .search-input {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          padding: 8px 16px;
          border: none;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 14px;
          outline: none;
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.15);
        }
        
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
        
        .content { 
          flex: 1; 
          min-width: 0; 
        }

        .song-detail-container {
          display: flex;
          gap: 30px;
          margin-top: 20px;
        }

        .song-cover-container {
          flex-shrink: 0;
        }

        .large-cover {
          width: 250px;
          height: 250px;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .song-detail-info {
          flex: 1;
          min-width: 0;
        }

        .song-title {
          font-size: 30px;
          font-weight: 700;
          margin: 0 0 20px 0;
          color: #fff;
        }

        .song-meta {
          margin-bottom: 20px;
        }

        .meta-item {
          margin-bottom: 10px;
          font-size: 16px;
        }

        .meta-label {
          color: #b3b3b3;
          display: inline-block;
          width: 100px;
        }

        .meta-value {
          color: #fff;
        }

        .song-actions {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }

        .play-button, .add-to-playlist-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .play-button {
          width: 40px;
          height: 40px;
          padding: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #fff;
          font-size: 16px;
          border: 1px solid rgba(255, 255, 255, 0.7);
        }

        .play-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #fff;
          transform: scale(1.05);
        }

        .play-icon {
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .add-to-playlist-button {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
        }

        .add-to-playlist-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 992px) {
          .song-detail-container {
            flex-direction: column;
          }

          .song-cover-container {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default SongDetail; 