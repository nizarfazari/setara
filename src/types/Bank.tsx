// Tipe data untuk item favorit dan tersimpan
export type BankUser = {
    id?: string;
    owner_id?: string;
    bank_user_id?: string;
    favorite?: boolean | undefined;
    account_name: string;
    user_image_path: string;
    account_number: string;
    bank_name: string; 
}

// Tipe data untuk respons API
export type ResponseBank = {
    total_favorites: number;
    total_saved: number;
    favorites: BankUser[];
    saved: BankUser[];
}


export type SearchBankReq = {
    no: string
}



export type TransactionBankReq = {
    account_number: string
    destinationAccountNumber: string
    amount: number
    mpin: string
    note: string | undefined
    savedAccount: true
} 

interface User {
    accountNumber: string;
    name: string;
    imagePath: string;
    bankName: string;
}

interface destinationUser {
    name: string;
    bank: string;
    accountNumber: string;
    imagePath: string;
}

export type TransactionBankRes = {
    
    user: User;
    destinationUser: destinationUser;
    amount: number;
    adminFee: number;
    totalAmount: number;
}



