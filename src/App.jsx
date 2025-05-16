import { useState, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'
import PlaylistPage from './pages/PlaylistPage';
import PlaylistDetail from './pages/PlaylistDetail';
import SongDetail from './pages/SongDetail';
import AudioPlayer from './components/AudioPlayer';

// Create a context for music player
export const PlayerContext = createContext();

function App() {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/playlists" element={<PlaylistPage />} />
          <Route path="/playlist/:id" element={<PlaylistDetail />} />
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
        {currentSong && <AudioPlayer song={currentSong} />}
      </Router>
    </PlayerContext.Provider>
  )
}

export default App
