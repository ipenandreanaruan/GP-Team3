import { Link, useNavigate } from 'react-router';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { currentTheme, setCurrentTheme, theme } = useContext(ThemeContext);

    function handleLogout() {
        localStorage.clear();
        navigate('/login');
    }

    return (
        // Pakai navColor dari Context buat warna Navbar-nya
        <div className={`navbar sticky top-0 z-50 transition-colors duration-300 ${theme[currentTheme].navColor}`}>
            <div className="flex-1">
                <Link to="/home" className="btn btn-ghost normal-case text-xl tracking-widest font-bold">
                    RealtimeChat
                </Link>
            </div>
            <div className="flex-none gap-4 px-4">
                {/* Logic tombol ubah tema*/}
                <button 
                    onClick={() => setCurrentTheme(currentTheme === "light" ? "dark" : "light")} 
                    className="btn btn-ghost btn-circle text-2xl"
                    title="Toggle Theme"
                >
                    {currentTheme === "light" ? "🌙" : "☀️"}
                </button>
                
                <button 
                    onClick={handleLogout} 
                    className="btn btn-error btn-sm text-white font-bold"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}