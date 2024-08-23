import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DestinationNumber from '../../../components/DestinationNumber';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';
import { useNavigate, useParams } from 'react-router-dom';
import { ResponseEWallet } from '../../../types/E-Wallet';

jest.mock('../../../hooks/useAuth');
jest.mock('../../../hooks/useNotification');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe('DestinationNumber Component', () => {
  const mockSetRecipients = jest.fn();
  const mockNavigate = jest.fn();
  const mockSlug = 'test-slug';
  const mockOpenNotificationWithIcon = jest.fn();

  const walletMock: ResponseEWallet = {
    favorites: [
      {
        ewallet_user_name: 'Alice',
        ewallet_user_phone_number: '1234567890',
        id: '1',
        ewallet_user_image_path:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEA',
        ewallet_name: 'shopeepay',
      },
    ],
    saved: [
      {
        ewallet_user_name: 'Bob',
        ewallet_user_phone_number: '0987654321',
        id: '2',
        ewallet_user_image_path:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEA',
        ewallet_name: 'ovo',
      },
    ],
    total_favorites: 1,
    total_saved: 1,
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      setRecipients: mockSetRecipients,
    });
    (useNotification as jest.Mock).mockReturnValue({
      openNotificationWithIcon: mockOpenNotificationWithIcon,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ slug: mockSlug });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('filters contacts based on search input', async () => {
    render(<DestinationNumber pathUrl="/e-wallet" wallet={walletMock} />);

    const searchInput = screen.getByPlaceholderText('Cari Nomor Tujuan');

    // Search for 'Alice'
    fireEvent.change(searchInput, { target: { value: 'Alice' } });

    // Tunggu hingga DOM diperbarui
    await waitFor(() => {
      const aliceElement = screen.queryByText(/Alice/i);
      const bobElement = screen.queryByText(/Bob/i);

      // Debugging untuk membantu melihat struktur DOM
      // screen.debug();

      expect(aliceElement).toBeInTheDocument();
      expect(bobElement).not.toBeInTheDocument();
    });
  });
});
