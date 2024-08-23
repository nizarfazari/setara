import { render, screen, waitFor } from '@testing-library/react';
import { FavoriteTransaction } from '../../../../components/Homepage/FavoriteTransaction';
import { useAuth } from '../../../../hooks/useAuth';
import axios from 'axios';

// Mock the Axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('swiper/modules', () => ({
    Navigation: jest.fn(),
    Pagination: jest.fn(),
    Virtual: jest.fn(),
  }));
  
  jest.mock('swiper/react', () => ({
    SwiperSlide: jest.fn(),
    useSwiper: jest.fn(),
    Swiper: jest.fn(),
  }));
  
  jest.mock('swiper/css', () => '');
  jest.mock('swiper/css/pagination', () => '');
  jest.mock('swiper/css/navigation', () => '');
  jest.mock('swiper/css/free-mode', () => '');

jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('FavoriteTransaction Integration Test', () => {
  const user = { token: 'mock-token' };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user });

    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: [
        { id: 1, type: 'transfer', account_name: 'Account 1' },
        { id: 2, type: 'topup', ewallet_name: 'Ewallet 1' },
      ],
      
    });
  });

  it('renders favorite transactions correctly', async () => {
    render(<FavoriteTransaction />);

    await waitFor(() => {
      expect(screen.getByText('Transfer Antar BCA')).toBeInTheDocument();
      expect(screen.getByText('Top Up Ewallet 1')).toBeInTheDocument();
    });
  });

  it('renders no favorite transactions message when there are no favorites', async () => {
    // Mock empty response
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: [],
    });

    render(<FavoriteTransaction />);

    await waitFor(() => {
      expect(screen.getByText('No favorite transactions found.')).toBeInTheDocument();
    });
  });
});
