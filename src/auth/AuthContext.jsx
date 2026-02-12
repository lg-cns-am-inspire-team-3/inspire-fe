import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    return (
        <AuthContext.Provider value={{ role, setRole, isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);