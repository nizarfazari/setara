import { render, screen, waitFor } from '@testing-library/react';

import axios from 'axios';
import { CatatanKeuangan } from '../../components/Homepage/CatatanKeuangan';
import { useAuth } from '../../hooks/useAuth';


// Mock the useAuth hook
jest.mock('../../hooks/useAuth');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock axios
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('CatatanKeuangan Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: {
        user: {
          name: 'John Doe',
          image_path: '/images/user.png',
          bank_name: 'BCA',
          account_number: '1234567890',
          signature: '',
        },
        token: 'mock-token',
      },
      transactions: {
        recipients: {
          nama: 'Jane Smith',
          wallet: 'Tahapan BCA',
          imageUrl: '/images/recipient.png',
          numberDestination: '0987654321',
          bank: '',
          account_number: '',
        },
        transaction: {
          nominal: '50000',
          notes: 'Payment for services',
        },
        transactionId: '',
      },
      clearTransaction: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      setRecipients: jest.fn(),
      setTransactionId: jest.fn(),
      setProcessTransaction: jest.fn(),
    });
  });

  beforeEach(() => {
    mockAxios.get.mockResolvedValue({
      data: {
        data: {
          income: 100000,
          expense: 50000,
          total: 50000,
        },
      },
    });
  });


  it('fetches and displays monthly report data', async () => {
    render(<CatatanKeuangan />);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalled());

    expect(screen.getByText('Pemasukan')).toBeInTheDocument();
    expect(screen.getByText('Pengeluaran')).toBeInTheDocument();
    expect(screen.getByText('Selisih')).toBeInTheDocument();
  });

  
});
