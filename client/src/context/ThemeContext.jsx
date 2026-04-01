import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
    currentTheme: "",
    setCurrentTheme: () => { },
    theme: {
        light: { bgColor: "", navColor: "", cardColor: "" },
        dark: { bgColor: "", navColor: "", cardColor: "" }
    }
});

export default function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        localStorage.setItem("theme", currentTheme);
        const daisyTheme = currentTheme === "light" ? "light" : "dark";
        document.documentElement.setAttribute('data-theme', daisyTheme);
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{
            currentTheme,
            setCurrentTheme,
            theme: {
                light: {
                    bgColor: "bg-gray-100 text-gray-800 transition-colors duration-300",
                    navColor: "bg-white text-black shadow-md border-b-2 border-gray-200",
                    cardColor: "bg-white shadow-xl border border-gray-200" 
                },
                dark: {
                    bgColor: "bg-gray-900 text-gray-100 transition-colors duration-300",
                    navColor: "bg-gray-800 text-white shadow-lg border-b-2 border-gray-700",
                    cardColor: "bg-gray-800 shadow-2xl border border-gray-700 text-white"
                }
            }
        }}>
            {children}
        </ThemeContext.Provider>
    )
}