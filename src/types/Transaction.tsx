
export interface AuthProps {
    children: React.ReactElement;
}

interface User {
    name: string;
    account_number: string;
    signature: string;
    image_path: string;
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
    isSavedAccount? : boolean;
}

type transasction = {
    recipients: recipientsData;
    transactionId: string;
    transaction: transactionData;
    
}

export interface AuthContextType {
    user: AuthData | null;
    login: (data: object) => void;
    logout: () => void;
    setRecipients: (recipients: recipientsData) => void;
    setTransactionId: (idWallet: string) => void;
    setProcessTransaction: (transaction: transactionData) => void;
    transactions: transasction;
    clearTransaction: () => void;
}
