import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { ThemeContext } from '../context/ThemeContext'; 

export default function HomePage() {
    const [customRoom, setCustomRoom] = useState("");
    const navigate = useNavigate();
    const myUsername = localStorage.getItem("username");
    
    // Panggil Context
    const { currentTheme, theme } = useContext(ThemeContext); 

    useEffect(() => {
        if (!myUsername) navigate('/login');
    }, [myUsername, navigate]);

    function joinRoom(roomName) {
        localStorage.setItem("room", roomName);
        navigate("/chat");
    }

    function handleCustomRoom(e) {
        e.preventDefault();
        if (!customRoom.trim()) return;
        joinRoom(customRoom);
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-10 h-[calc(100vh-70px)]">
            <div className={`w-full max-w-2xl rounded-2xl p-8 transition-colors duration-300 ${theme[currentTheme].cardColor}`}>
                <h1 className="text-3xl font-bold text-center mb-2">Welcome, <span className="text-primary">{myUsername}</span>!</h1>
                <p className="text-center opacity-70 mb-8">Silahkan untuk pilih room atau bikin room kamu sendiri.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <button onClick={() => joinRoom("ROOM A")} className="btn btn-outline btn-primary h-24 text-xl">ROOM A</button>
                    <button onClick={() => joinRoom("ROOM B")} className="btn btn-outline btn-secondary h-24 text-xl">ROOM B</button>
                    <button onClick={() => joinRoom("ROOM C")} className="btn btn-outline btn-accent h-24 text-xl">ROOM C</button>
                </div>

                <div className="divider">ATAU</div>

                <form onSubmit={handleCustomRoom} className="flex gap-2 mt-4">
                    <input 
    type="text" 
    placeholder="Ketik nama room baru..." 
    className="input input-bordered w-full focus:input-primary text-black bg-white" 
    value={customRoom}
    onChange={(e) => setCustomRoom(e.target.value)}
/>
                    <button type="submit" className="btn btn-primary px-8">Join</button>
                </form>
            </div>
        </div>
    );
}