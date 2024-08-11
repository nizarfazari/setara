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
    account_number: string
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
    name: string;
    bank: string;
    account_number: string;
    image_path: string;
}


interface TransferData {
    source_user: User;
    destination_user: User;
    amount: number;
    admin_fee: number;
    total_amount: number;
    note: string;
}

export type TransactionBankRes = {    
    code: number;
    message: string;
    status: boolean;
    data: TransferData;

}



