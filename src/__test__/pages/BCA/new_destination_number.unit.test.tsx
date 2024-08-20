import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewDestinationNumberPage from '../../../pages/BCA/NewDestination/NewDestinationNumber';
import { useAuth } from '../../../hooks/useAuth';
import { useFetchData } from '../../../hooks/useFetchData';
import { BrowserRouter } from 'react-router-dom';

// Mock the hooks
jest.mock('../../../hooks/useAuth');
jest.mock('../../../hooks/useFetchData');

const mockUseAuth = useAuth as jest.Mock;
const mockUseFetchData = useFetchData as jest.Mock;

describe('NewDestinationNumberPage', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: {
        token: 'mockToken',
        user: {
          bank_name: 'MockBank',
          account_number: '12345678',
        },
      },
      setProcessTransaction: jest.fn(),
      setRecipients: jest.fn(),
    });

    mockUseFetchData.mockReturnValue({
      data: {
        balance: 5000000,
      },
    });
  });

  it('should render the component correctly', () => {
    render(
      <BrowserRouter>
        <NewDestinationNumberPage />
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Nomor Transfer Baru')).toBeInTheDocument();
    expect(screen.getByLabelText('Cari Nomor')).toBeInTheDocument();
    expect(screen.getByLabelText('Masukkan ke daftar tersimpan')).toBeInTheDocument();
    expect(screen.getByLabelText('Nama Transfer')).toBeInTheDocument();
    expect(screen.getByLabelText('Sumber Rekening')).toBeInTheDocument();
    expect(screen.getByLabelText('Nominal Transfer')).toBeInTheDocument();
    expect(screen.getByLabelText('Catatan')).toBeInTheDocument();
    expect(screen.getByLabelText('Lanjutkan')).toBeInTheDocument();
  });

  it('should display error when destination number is empty and search is clicked', async () => {
    render(
      <BrowserRouter>
        <NewDestinationNumberPage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByLabelText('Cari Nomor'));

    await waitFor(() =>
      expect(screen.getByText('Nomor Tidak Boleh Kosong')).toBeInTheDocument()
    );
  });

  it('should disable the "Lanjutkan" button when the number is not verified', () => {
    render(
      <BrowserRouter>
        <NewDestinationNumberPage />
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Lanjutkan')).toBeDisabled();
  });
});
