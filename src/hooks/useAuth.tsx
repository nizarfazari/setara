import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useNotification } from "./useNotification";
import { AuthContextType, AuthProps, recipientsData, transactionData } from "../types/Transaction";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
    const { openNotificationWithIcon } = useNotification();

    const [user, setUser] = useLocalStorage("user", null);
    const [transactions, setTransaction] = useLocalStorage("transaction", {
        recipients: null,
        transaction: null,
        transactionId: null,
    });

    const navigate = useNavigate();

    const login = async (data: object) => {
        setUser(data);
        navigate("/", { replace: true });
    };

    const logout = () => {
        setUser(null);
        setTransaction({
            recipients: null,
            transaction: null,
            transactionId: null
        });
        openNotificationWithIcon('success', 'Success', "Berhasil Logout")
        navigate("/login", { replace: true });
    };


    const setRecipients = (recipients: recipientsData) => {
        setTransaction({
            ...transactions,
            recipients: recipients,
        });

    }

    const setTransactionId = (idTrans: string) => {
        setTransaction({
            ...transactions,
            transactionId: idTrans,
        });
    }


    const setProcessTransaction = (transaction: transactionData) => {
        setTransaction({
            ...transactions,
            transaction: transaction,
        });

    }

    const clearTransaction = () => {
        setTransaction({
            recipients: null,
            transaction: null,
            transactionId: null,
        });
    }

    const value = useMemo(() => ({
        user,
        login,
        logout,
        setRecipients,
        setTransactionId,
        transactions,
        setProcessTransaction,
        clearTransaction,
    }), [user, transactions]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    return useContext(AuthContext)!;
};
