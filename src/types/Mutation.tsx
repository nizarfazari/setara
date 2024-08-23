export type Transaction = {
    transaction_id: string;
    unique_code: string;
    type: string;
    total_amount: number;
    time: string;
    reference_number: string;
    destination_account_number: string | null;
    destination_phone_number: string | null;
    formatted_date: string;
    formatted_time: string;
  };
  
  export type MutationReq = {
    startDate: string;
    endDate: string;
    transactionCategory: string;
    page: number;
    size: number;
  };
  
  export type ApiResponse = {
    code: number;
    data: {
      mutation_responses : Transaction[]
      page : number
      size : number
      total_pages : number
    };
    message: string;
    status: boolean;
   
  };
  
  export type GroupedTransaction = {
    date: string;
    transactions: Transaction[];
  };