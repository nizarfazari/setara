export type CombinedItem = {
    id: string;
    owner_id: string;
    favorite: boolean;
    name: string;
    image_path: string;
    avatar_path: string;
    type: "transfer" | "topup";
    account_number?: string;
    bank_name?: string;
    account_name?: string;
    ewallet_user_id?: string;
    ewallet_user_phone_number?: string;
    ewallet_name?: string;
    ewallet_user_name?: string;
  }
  
export type MonthlyReport = {
    income: number;
    expense: number;
    total: number;
}

