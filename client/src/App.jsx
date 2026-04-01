import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import LoginPage from './views/LoginPage'; 
import HomePage from './views/HomePage';
import ChatPage from './views/ChatPage';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-base-200">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}