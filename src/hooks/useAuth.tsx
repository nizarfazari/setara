import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useNotification } from "./useNotification";


interface AuthProps {
    children: React.ReactElement;
}


interface User {
    name: string;
    account_number: string;
    signature: string;
    avatar_path: string;
    bank_name: string;
}

interface AuthData {
    user: User;
    token: string;
}


interface AuthContextType {
    user: AuthData | null;
    login: (data: object) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
    const { openNotificationWithIcon } = useNotification()

    const [user, setUser]
        = useLocalStorage("user", null);
    const [transWallet, setTransWallet]
        = useLocalStorage("transactionWallet", null);
    const navigate = useNavigate();

    const login = async (data: object) => {
        setUser(data);
        navigate("/", { replace: true });
    };

    const logout = () => {
        setUser(null);
        localStorage.clear()
        openNotificationWithIcon('success', 'Success', "Berhasil Logout")
        navigate("/login", { replace: true });
    };

    

    const value = useMemo(() => ({
        user,
        login,
        logout,
    }), [user]);

    return (
        <AuthContext.Provider
            value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth
    = (): AuthContextType => {
        return useContext(AuthContext)!;
    };