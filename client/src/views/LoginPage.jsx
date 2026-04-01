import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!username.trim()) return;

        localStorage.setItem("username", username);
        navigate("/home"); 
    }

    return (
        <div className="flex items-center justify-center h-[calc(100vh-70px)] px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-6 tracking-widest text-primary">
                        LOGIN CHAT
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Username</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Ketik nama..." 
                                className="input input-bordered w-full focus:input-primary" 
                                required 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full mt-6 text-lg tracking-wider">
                            Masuk
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}