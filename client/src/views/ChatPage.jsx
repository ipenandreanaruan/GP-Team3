import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { socket } from '../socket/socket';
import { ThemeContext } from '../context/ThemeContext'; // Import Context

export default function ChatPage() {
    const [messageSent, setMessageSent] = useState("");
    const [messages, setMessages] = useState([]); 
    const navigate = useNavigate();

    // Panggil Context
    const { currentTheme, theme } = useContext(ThemeContext);

    const myUsername = localStorage.getItem("username");
    const myRoom = localStorage.getItem("room");

    useEffect(() => {
        if (!myUsername || !myRoom) {
            navigate('/login');
            return;
        }

        socket.auth = { username: myUsername };
        socket.connect();
        socket.emit("join:room", { username: myUsername, room: myRoom });

        socket.on("message:update", (newMessage) => {
            setMessages(current => [...current, newMessage]);
        });

        return () => {
            socket.off("message:update");
            socket.disconnect();
        };
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (!messageSent.trim()) return;

        socket.emit("message:new", {
            username: myUsername,
            room: myRoom,
            message: messageSent
        });
        setMessageSent(""); 
    }

    return (
        <div className="flex flex-col items-center justify-center w-full p-4 sm:p-10 h-[calc(100vh-70px)]">
            <div className={`flex flex-col flex-grow w-full max-w-3xl rounded-2xl overflow-hidden transition-colors duration-300 ${theme[currentTheme].cardColor}`}>
                
                <div className="bg-primary text-primary-content p-4 text-center shadow-md z-10 flex justify-between items-center">
                    <button onClick={() => navigate('/home')} className="btn btn-sm btn-circle btn-ghost text-white hover:bg-red-500" title="Leave Room">✖</button>
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-widest">Room: <span className="text-accent">{myRoom}</span></h2>
                        <p className="text-xs opacity-80">Logged in as {myUsername}</p>
                    </div>
                    <div className="w-8"></div>
                </div>

                <div className="flex flex-col flex-grow p-4 overflow-y-auto space-y-2 opacity-90">
                    {messages.length === 0 ? (
                        <div className="flex h-full items-center justify-center opacity-50">Belum ada obrolan. Ketik sesuatu!</div>
                    ) : (
                        messages.map((msg, idx) => (
                            <div key={idx} className={`chat ${msg.from === myUsername ? "chat-end" : "chat-start"}`}>
                                <div className="chat-header opacity-50 text-xs mb-1">{msg.from === myUsername ? "You" : msg.from}</div>
                                <div className={`chat-bubble shadow-sm ${msg.from === myUsername ? "chat-bubble-primary" : "chat-bubble-neutral"}`}>{msg.message}</div>
                            </div>
                        ))
                    )}
                </div>

                <form className="bg-base-300 p-4 flex gap-2" onSubmit={handleSubmit}>
                    <input 
    value={messageSent}
    onChange={(e) => setMessageSent(e.target.value)} 
    className="input input-bordered w-full focus:input-primary transition-all text-black bg-white" 
    type="text" 
    placeholder="Ketik pesan di sini..." 
    autoComplete="off"
/>
                    <button className="btn btn-primary px-8" type='submit'>Kirim</button>
                </form>

            </div>
        </div>
    );
}