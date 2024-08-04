// Tipe data untuk item favorit dan tersimpan
export type EwalletUser =  {
    id: string;
    owner_id: string;
    ewallet_user_id: string;
    favorite: boolean;
    ewallet_user_name: string;
    ewallet_user_image_path: string;
    ewallet_user_phone_number: string;
    ewallet_name: string;
}

// Tipe data untuk respons API
export type ResponseEWallet = {
    total_favorites: number;
    total_saved: number;
    favorites: EwalletUser[];
    saved: EwalletUser[];
}


export type SearchEWalletReq = {
    noEwallet: string
    ewalletId: string
}