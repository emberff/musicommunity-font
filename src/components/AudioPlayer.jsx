import React, { useContext, useRef, useEffect, useState } from 'react';
import { PlayerContext } from '../App';
import { useNavigate } from 'react-router-dom';

const AudioPlayer = ({ song }) => {
  const navigate = useNavigate();
  const { setCurrentSong } = useContext(PlayerContext);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSliderChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleClose = () => {
    setCurrentSong(null);
  };

  const navigateToSongDetail = () => {
    // 确保ID作为字符串处理，防止大整数精度丢失
    const strId = String(song.id);
    console.log('导航到歌曲详情，歌曲ID:', strId);
    
    // 使用URL构建
    const pathname = `/song/${strId}`;
    navigate(pathname);
  };

  return (
    <div className="audio-player">
      <audio 
        ref={audioRef} 
        src={song.url} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="player-content">
        <div className="song-info" onClick={navigateToSongDetail}>
          <img src={song.cover || 'default-cover.jpg'} alt={song.name} className="song-cover" />
          <div className="song-details">
            <div className="song-name">{song.name}</div>
            <div className="song-artist">{song.artist}</div>
          </div>
        </div>

        <div className="player-controls">
          <button 
            className="play-pause-btn" 
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          
          <div className="time-control">
            <span className="current-time">{formatTime(currentTime)}</span>
            <input 
              type="range" 
              min="0" 
              max={duration || 0} 
              value={currentTime} 
              onChange={handleSliderChange} 
              className="time-slider"
            />
            <span className="duration">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player-actions">
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
      </div>

      <style jsx>{`
        .audio-player {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background: rgba(24, 24, 24, 0.98);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 999;
        }

        .player-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 32px;
          height: 100%;
        }

        .song-info {
          display: flex;
          align-items: center;
          gap: 15px;
          width: 250px;
          cursor: pointer;
        }

        .song-cover {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          object-fit: cover;
        }

        .song-details {
          min-width: 0;
        }

        .song-name {
          font-size: 14px;
          color: #fff;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .song-artist {
          font-size: 12px;
          color: #b3b3b3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .player-controls {
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 700px;
          gap: 20px;
        }

        .play-pause-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.7);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }

        .play-pause-btn:hover {
          border-color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .time-control {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .current-time, .duration {
          font-size: 12px;
          color: #b3b3b3;
          width: 40px;
        }

        .time-slider {
          flex: 1;
          cursor: pointer;
          height: 4px;
          appearance: none;
          background: #535353;
          border-radius: 2px;
          outline: none;
        }

        .time-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #1db954;
        }

        .player-actions {
          display: flex;
          gap: 10px;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: #b3b3b3;
          font-size: 24px;
          cursor: pointer;
          padding: 5px;
        }

        .close-btn:hover {
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer; 