import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { PlayerContext } from '../App';

const PlaylistDetail = () => {
  const params = useParams();
  const rawId = params.id;
  const id = String(rawId);
  
  console.log('歌单详情页ID参数:', id, '类型:', typeof id, '原始URL参数:', rawId);
  
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(6);
  const [isLast, setIsLast] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
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
    const fetchPlaylist = async () => {
      try {
        if (!id) {
          console.error('歌单ID不存在');
          navigate('/playlists');
          return;
        }
        
        const strId = String(id);
        console.log('请求歌单详情，原始ID:', rawId, '处理后ID:', strId);
        
        const url = new URL(`${API_BASE_URL}/capi/playlist/get`);
        url.searchParams.append('id', strId);
        
        console.log('请求完整URL:', url.toString());
        
        const response = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
          
          if (data.success && data.data && data.data.id) {
            console.log('API返回的歌单ID:', data.data.id, '类型:', typeof data.data.id);
            data.data.id = String(data.data.id);
          }
        } catch (e) {
          console.error('JSON解析错误:', e);
          navigate('/playlists');
          return;
        }
        
        if (data.success) {
          setPlaylist(data.data);
        } else {
          console.error('获取歌单详情失败:', data.errorMsg);
          navigate('/playlists');
        }
      } catch (error) {
        console.error('获取歌单详情失败:', error);
        navigate('/playlists');
      }
    };
    fetchPlaylist();
  }, [id, navigate, rawId]);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        if (!id) {
          console.error('歌单ID不存在');
          return;
        }
        
        const strId = String(id);
        
        const url = new URL(`${API_BASE_URL}/capi/playlist/song/page`);
        url.searchParams.append('playlistId', strId);
        url.searchParams.append('pageNo', String(pageNo));
        url.searchParams.append('pageSize', String(pageSize));
        
        console.log('请求歌曲列表完整URL:', url.toString());
        
        const response = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
          
          if (data.success && data.data && data.data.list) {
            data.data.list.forEach(song => {
              if (song.id) {
                song.id = String(song.id);
              }
            });
          }
        } catch (e) {
          console.error('JSON解析错误:', e);
          setLoading(false);
          return;
        }
        
        console.log('API response:', data);
        
        if (data.success) {
          setSongs(data.data.list || []);
          setIsLast(data.data.isLast);
          if (data.data.totalRecords) {
            setTotalPages(Math.ceil(data.data.totalRecords / pageSize));
          }
        }
      } catch (error) {
        console.error('获取歌单歌曲失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [id, pageNo, pageSize, rawId]);

  const handlePrevPage = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };
  const handleNextPage = () => {
    if (!isLast) setPageNo(pageNo + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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

  if (!playlist) return <div className="main-container"><div style={{color:'#fff'}}>加载中...</div></div>;

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
          <div className="nav-item" onClick={() => navigate('/')}> <i className="icon-home"></i> <span>发现音乐</span> </div>
          <div className="nav-item" onClick={() => navigate('/playlists')}> <i className="icon-library"></i> <span>我的歌单</span> </div>
          <div className="nav-item"> <i className="icon-playlist"></i> <span>最近播放</span> </div>
        </div>
        <div className="content">
          <div className="playlist-header">
            <img src={playlist.cover || 'default-cover.jpg'} alt="cover" className="playlist-cover" />
            <div className="playlist-info">
              <h2 className="section-title">{playlist.name}</h2>
              <div className="playlist-stats">共{playlist.plSongNum}首 | 播放量{playlist.plListenNum} | 评论{playlist.plCommentNum} | 分享{playlist.plShareNum}</div>
              <div className="playlist-id">歌单ID: {playlist.id} {playlist.isPublic ? '公开' : '私有'}</div>
            </div>
          </div>
          <h3 className="songs-heading">歌曲列表 ({songs.length}首, 第{pageNo}页, 每页{pageSize}首)</h3>
          {loading ? (
            <div className="loading-indicator">加载中...</div>
          ) : (
            <div className="playlists-grid">
              {songs.map((song, index) => (
                <div key={song.id} className="song-card">
                  <div className="song-index">{(pageNo - 1) * pageSize + index + 1}</div>
                  <img 
                    src={song.cover || 'default-cover.jpg'} 
                    alt="cover" 
                    className="song-cover"
                    onClick={() => navigateToSongDetail(song.id)}
                  />
                  <div className="song-info">
                    <div className="song-name">{song.name}</div>
                    <div className="song-artist">{song.artist || '未知艺术家'}</div>
                  </div>
                  <div className="song-duration">3:45</div>
                  <button 
                    className="play-song-btn"
                    onClick={() => playSong(song)}
                  >
                    ▶
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="pagination">
            <button className="pagination-btn prev-btn" onClick={handlePrevPage} disabled={pageNo===1}>上一页</button>
            <span className="page-info">{pageNo} / {totalPages}</span>
            <button className="pagination-btn next-btn" onClick={handleNextPage} disabled={isLast}>下一页</button>
          </div>
        </div>
      </div>
      <div className="player-container"></div>
      <style>{`
        .main-container { 
          position: relative; 
          max-width: 1600px; 
          margin: 0 auto; 
          background-color: #121212; 
          color: #ffffff; 
          min-height: 100vh; 
          padding: 40px 32px 60px; 
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
          display: flex;
          flex-direction: column;
          flex: 1; 
          min-width: 0;
          overflow: hidden;
          width: 100%;
        }
        
        .playlist-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .playlist-cover {
          width: 120px;
          height: 120px;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        
        .playlist-info {
          flex: 1;
        }
        
        .section-title { 
          font-size: 24px; 
          font-weight: 700; 
          margin: 0 0 12px 0; 
          color: #fff; 
        }
        
        .playlist-stats {
          color: #b3b3b3;
          margin-bottom: 8px;
        }
        
        .playlist-id {
          color: #b3b3b3;
        }
        
        .songs-heading {
          color: #fff;
          margin: 24px 0 18px;
          font-size: 18px;
          font-weight: 500;
        }
        
        .loading-indicator {
          color: #fff;
          text-align: center;
          padding: 40px 0;
        }
        
        .playlists-grid { 
          display: grid; 
          grid-template-columns: repeat(2, 1fr); 
          gap: 25px; 
          min-height: 120px;
          max-width: 100%;
        }
        
        .song-card { 
          background: #181818; 
          border-radius: 8px;
          padding: 16px;
          transition: transform 0.3s ease; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.2); 
          border-left: 3px solid #9b59b6; 
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        
        .song-card:hover { 
          transform: translateY(-3px); 
          background: #242424; 
        }
        
        .song-index { 
          min-width: 20px;
          width: 20px;
          text-align: center; 
          color: #b3b3b3; 
          font-size: 14px;
          flex-shrink: 0;
        }
        
        .song-cover {
          width: 48px;
          height: 48px;
          border-radius: 6px;
          object-fit: cover;
          cursor: pointer;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }

        .song-cover:hover {
          opacity: 0.8;
        }
        
        .song-info { 
          flex: 1; 
          min-width: 0; 
          padding: 0 8px;
          max-width: calc(100% - 130px); /* Adjusted to account for smaller elements */
          overflow: hidden;
        }
        
        .song-name { 
          font-size: 16px; 
          color: #fff; 
          font-weight: 500; 
          margin-bottom: 5px; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis; 
        }
        
        .song-artist { 
          font-size: 13px; 
          color: #b3b3b3; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis; 
        }
        
        .play-song-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .play-song-btn:hover {
          transform: scale(1.1);
          border-color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .song-duration {
          color: #7f8c8d;
          font-size: 12px;
          width: 40px;
          text-align: right;
          margin-left: auto;
        }
        
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
        @media (max-width: 1200px) {
          .playlists-grid { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 20px;
          }
          
          .song-card {
            padding: 14px;
            gap: 10px;
          }
        }

        @media (max-width: 992px) {
          .playlists-grid { 
            grid-template-columns: 1fr; 
          }
          
          .song-info {
            max-width: calc(100% - 120px);
          }
          
          .song-cover {
            width: 45px;
            height: 45px;
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
    </div>
  );
};

export default PlaylistDetail;