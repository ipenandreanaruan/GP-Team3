import { Outlet } from "react-router";
import Navbar from '../components/Navbar';
import { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";

export default function BaseLayout() {
    // Panggil
    const { currentTheme, theme } = useContext(ThemeContext);

    return (
        // Kelas bgColor & textColor diambil dari Context
        <div className={`min-h-screen ${theme[currentTheme].bgColor}`}>
            <Navbar />
            <Outlet />
        </div>
    );
}