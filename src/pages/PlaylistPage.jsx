import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { PlayerContext } from '../App';

const PlaylistPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(3);
  const [isLast, setIsLast] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
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
    const fetchPlaylists = async () => {
      try {
        // 使用URLSearchParams来构建参数，避免字符串拼接导致的精度丢失
        const url = new URL(`${API_BASE_URL}/capi/playlist/page`);
        url.searchParams.append('pageNo', String(pageNo));
        url.searchParams.append('pageSize', String(pageSize));
        
        console.log('请求歌单列表完整URL:', url.toString());
        
        const response = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const text = await response.text(); // 先获取原始文本
        
        // 手动解析JSON，保持大整数ID为字符串
        let data;
        try {
          data = JSON.parse(text);
          console.log('原始歌单列表数据:', data);
          
          if (data.success && data.data && data.data.list) {
            // 确保每个歌单的ID保持为字符串格式
            data.data.list.forEach(playlist => {
              if (playlist.id) {
                // 记录原始ID值以便调试
                console.log(`歌单ID: ${playlist.id}, 类型: ${typeof playlist.id}`);
                // 确保ID为字符串
                playlist.id = String(playlist.id);
              }
            });
          }
        } catch (e) {
          console.error('JSON解析错误:', e);
          return;
        }
        
        if (data.success) {
          setPlaylists(data.data.list);
          setIsLast(data.data.isLast);
          if (data.data.totalRecords) {
            setTotalPages(Math.ceil(data.data.totalRecords / pageSize));
          }
        }
      } catch (error) {
        console.error('获取歌单失败:', error);
      }
    };
    fetchPlaylists();
  }, [pageNo, pageSize]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePrevPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLast) {
      setPageNo(pageNo + 1);
    }
  };

  const navigateToPlaylist = (playlistId) => {
    // 确保ID作为字符串处理，防止大整数精度丢失
    const strId = String(playlistId);
    console.log('导航到歌单详情，歌单ID:', strId);
    
    // 使用URL构建
    const pathname = `/playlist/${strId}`;
    navigate(pathname);
  };

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const navigateToSongDetail = (songId) => {
    // 确保ID作为字符串处理，防止大整数精度丢失
    const strId = String(songId);
    console.log('导航到歌曲详情，歌曲ID:', strId);
    
    // 使用URL构建
    const pathname = `/song/${strId}`;
    navigate(pathname);
  };

  // Mock song data for the preview
  const getSampleSongs = (playlist) => {
    return [
      { id: `${playlist.id}-1`, name: '歌曲1', artist: '歌手名', cover: playlist.cover, url: '#', playlistId: playlist.id },
      { id: `${playlist.id}-2`, name: '歌曲2', artist: '歌手名', cover: playlist.cover, url: '#', playlistId: playlist.id },
      { id: `${playlist.id}-3`, name: '歌曲3', artist: '歌手名', cover: playlist.cover, url: '#', playlistId: playlist.id }
    ];
  };

  return (
    <>
      <div className="main-container">
        {/* 用户信息区域 */}
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

        {/* 主内容区域 */}
        <div className="main-content">
          <div className="sidebar">
            <div className="nav-item" onClick={() => navigate('/')}>
              <i className="icon-home"></i>
              <span>发现音乐</span>
            </div>
            <div className="nav-item active">
              <i className="icon-library"></i>
              <span>我的歌单</span>
            </div>
            <div className="nav-item">
              <i className="icon-playlist"></i>
              <span>最近播放</span>
            </div>
          </div>

          <div className="content">
            <h2 className="section-title">我的歌单</h2>
            
            <div className="playlists-grid">
              {playlists.map((playlist) => {
                const sampleSongs = getSampleSongs(playlist);
                return (
                  <div key={playlist.id} className="playlist-card" onClick={() => navigateToPlaylist(playlist.id)}>
                    <h3>{playlist.name}</h3>
                    <ul className="card-list">
                      {sampleSongs.map((song, index) => (
                        <li key={song.id} className="song-item">
                          <img 
                            src={song.cover || 'default-cover.jpg'} 
                            alt="cover" 
                            className="song-cover"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToSongDetail(song.id);
                            }}
                          />
                          <div className="item-info">
                            <div className="title">{song.name}</div>
                            <div className="subtitle">
                              {index === 2 ? `共${playlist.plSongNum}首` : song.artist}
                            </div>
                          </div>
                          <div className="song-duration">3:45</div>
                          <button 
                            className="play-song-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              playSong(song);
                            }}
                          >
                            ▶
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            
            <div className="pagination">
              <button 
                className="pagination-btn prev-btn" 
                onClick={handlePrevPage}
                disabled={pageNo === 1}
              >
                上一页
              </button>
              <span className="page-info">{pageNo} / {totalPages}</span>
              <button 
                className="pagination-btn next-btn" 
                onClick={handleNextPage}
                disabled={isLast}
              >
                下一页
              </button>
            </div>
          </div>
        </div>

        {/* 播放器区域（保持原有结构） */}
        <div className="player-container">
          {/* 播放器控件 */}
        </div>
      </div>

      <style>{`
        .main-container {
          position: relative;
          max-width: 1600px;
          margin: 0 auto;
          background-color: #121212;
          color: #ffffff;
          min-height: 100vh;
          padding: 40px 32px 120px;
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
          margin-left: auto;
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

        /* 主内容区域 */
        .main-content {
          display: flex;
          gap: 30px;
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

        /* 章节标题 */
        .section-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 24px 0;
          color: #fff;
        }

        /* 歌单网格 */
        .playlists-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          min-height: 300px;
        }

        .playlist-card {
          background: #181818;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, background 0.3s ease;
          border-left: 4px solid #9b59b6;
          cursor: pointer;
        }

        .playlist-card:hover {
          transform: translateY(-5px);
          background: #202020;
        }

        .playlist-card h3 {
          font-size: 20px;
          margin: 0 0 20px 0;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }

        .playlist-card h3:hover {
          text-decoration: underline;
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
          position: relative;
        }

        .card-list li:hover {
          background: #2e2e2e;
        }

        .card-list img {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          object-fit: cover;
          cursor: pointer;
        }

        .song-item {
          position: relative;
        }

        .song-cover:hover {
          opacity: 0.8;
        }

        .play-song-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          margin-right: 10px;
        }

        .play-song-btn:hover {
          transform: scale(1.1);
          border-color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .song-duration {
          color: #7f8c8d;
          font-size: 12px;
          margin-left: auto;
        }

        .item-info .title {
          font-size: 14px;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-info .subtitle {
          font-size: 12px;
          color: #b3b3b3;
        }

        /* 分页控制 */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
          gap: 20px;
        }
        
        .pagination-btn {
          background: transparent;
          border: 1px solid #b3b3b3;
          color: #b3b3b3;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .pagination-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-color: #fff;
        }
        
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .page-info {
          font-size: 14px;
          color: #b3b3b3;
        }

        /* 播放器 */
        .player-container {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 80px;
          background: rgba(24, 24, 24, 0.98);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 999;
        }

        /* 响应式设计 */
        @media (max-width: 1400px) {
          .playlists-grid { 
            grid-template-columns: repeat(2, 1fr); 
          }
        }

        @media (max-width: 992px) {
          .playlists-grid { 
            grid-template-columns: 1fr; 
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

export default PlaylistPage;