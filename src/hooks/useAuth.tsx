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

export type recipientsData = {
    nama: string;
    wallet: string;
    bank: string;
    account_number:string;
    numberDestination: string;
    imageUrl: string;
}

export type transactionData = {
    nominal: string;
    notes: string | undefined;
}

type transWallet = {
    recipients: recipientsData;
    idWallet: string;
    transaction: transactionData;
}

type transBank = {
    recipients: recipientsData;
    account_number: string;
    transaction: transactionData;
}

interface AuthContextType {
    user: AuthData | null;
    login: (data: object) => void;
    logout: () => void;
    setRecipients: (recipients: recipientsData) => void;
    setIdWallet: (idWallet: string) => void;
    setAccount_number: (account_number: string) => void;
    setTransaction: (transaction: transactionData) => void;
    transWallet: transWallet;
    transBank: transBank;
    clearTransaction: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
    const { openNotificationWithIcon } = useNotification();

    const [user, setUser] = useLocalStorage("user", null);
    const [transWallet, setTransWallet] = useLocalStorage("transactionWallet", {
        recipients: null,
        transaction: null,
        idWallet: null,
    });

    const [transBank, setTransBank] = useLocalStorage("transactionBank", {
        recipients: null,
        transaction: null,
        account_number: null,
    });

    const navigate = useNavigate();

    const login = async (data: object) => {
        setUser(data);
        navigate("/", { replace: true });
    };

    const logout = () => {
        setUser(null);
        setTransWallet({
            recipients: null,
            transaction: null,
            idWallet: null
        });
        openNotificationWithIcon('success', 'Success', "Berhasil Logout")
        navigate("/login", { replace: true });
    };
    

    const setRecipients = (recipients: recipientsData) => {
        setTransWallet({
            ...transWallet,
            recipients: recipients,
        });
        setTransBank({
            ...transBank,
            recipients: recipients,
        });
    }

    const setIdWallet = (wallet: string) => {
        setTransWallet({
            ...transWallet,
            idWallet: wallet,
        });
    }

    const setAccount_number = (account_number: string) => {
        setTransBank({
            ...transBank,
            account_number: account_number,
        });
    }

    const setTransaction = (transaction: transactionData) => {
        setTransWallet({
            ...transWallet,
            transaction: transaction,
        });
        setTransBank({
            ...transBank,
            transaction: transaction,
        });
    }

    const clearTransaction = () => {
        setTransWallet({
            recipients: null,
            transaction: null,
            idWallet: null,
        });
        setTransBank({
            recipients: null,
            transaction: null,
            account_number: null,
        });
    }

    const value = useMemo(() => ({
        user,
        login,
        logout,
        setRecipients,
        setIdWallet,
        transWallet,
        setAccount_number, 
        transBank,
        setTransaction,
        clearTransaction,
    }), [user, transWallet, transBank]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    return useContext(AuthContext)!;
};
