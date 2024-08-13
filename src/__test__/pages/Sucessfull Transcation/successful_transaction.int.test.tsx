import { render, screen, fireEvent } from '@testing-library/react';
import TransaksiBerhasil from '../../../pages/TransaksiBerhasil/index';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { FormatCurrency } from '../../../utils/index';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../hooks/useAuth');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('TransaksiBerhasil Integration Test', () => {
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

  it('renders the component with correct data and handles button clicks', () => {
    render(<TransaksiBerhasil />, { wrapper: MemoryRouter });

    expect(screen.getByText('Transaksi Berhasil')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Nominal Top Up')).toBeInTheDocument();
    expect(screen.getByText('Payment for services')).toBeInTheDocument();

    // Check if FormatCurrency is applied correctly
    expect(screen.getAllByText(FormatCurrency(50000)).length).toBeGreaterThan(0);
    expect(screen.getAllByText(FormatCurrency(0)).length).toBeGreaterThan(0);

    // Test the "Kembali Ke Homepage" button
    const backButton = screen.getByText('Kembali Ke Homepage');
    fireEvent.click(backButton);

    expect(mockUseAuth().clearTransaction).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');

    // Test the "Bagikan Bukti Transaksi" button
    const shareButton = screen.getByText('Bagikan Bukti Transaksi');
    fireEvent.click(shareButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
