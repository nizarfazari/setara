import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoSaldo from '../../../components/Homepage/InfoSaldo';
import { useAuth } from '../../../hooks/useAuth';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// Mock the useAuth hook
jest.mock('../../../hooks/useAuth');

// Mock axios
jest.mock('axios');

// Mock the antd notification module
jest.mock('antd', () => ({
  notification: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Skeleton: () => <div>Mocked Skeleton</div>, // Mock Skeleton to avoid rendering issues
}));

describe('InfoSaldo Component', () => {
  const mockUser = {
    token: 'test-token',
    user: {
      account_number: '1234567890',
      image_path: '/images/user.png',
    },
  };

  // Set up the mock return value for useAuth
  (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

  it('renders the component correctly', async () => {
    // Mock the API response
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        data: {
          balance: 10000, // Mocked balance value
        },
      },
    });

    render(<InfoSaldo />, { wrapper: MemoryRouter });

    // Wait for the loading to finish
    await waitFor(() => {
      expect(screen.getByLabelText('Informasi Saldo Rekening')).toBeInTheDocument();
    });
    

    expect(screen.getByLabelText("Saldo ditampilkan")).toBeInTheDocument();
  
    // Simulate a click to toggle the balance visibility
    fireEvent.click(screen.getByRole('button', { name: 'Saldo ditampilkan' }));
    fireEvent.click(screen.getByRole('button', { name: 'Saldo disembunyikan' }));

    expect(
      screen.getByLabelText("Salin nomor rekening 1234-5678-90")
    ).toBeInTheDocument();
  });
});
