export interface QrRes {
    code: number;
    message: string;
    status: boolean;
    data: {
      sourceUser: {
        name: string;
        bank: string;
        accountNumber: string;
        imagePath: string;
      };
      destinationUser: {
        name: string;
        nameMerchant: string;
        nmid: string;
        terminalId: string;
        imagePath: string;
      };
      amount: number;
      adminFee: number;
      totalAmount: number;
      note: string;
    };
  }
  