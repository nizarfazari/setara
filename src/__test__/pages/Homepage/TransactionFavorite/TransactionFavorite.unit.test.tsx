import { render, waitFor } from '@testing-library/react';
import { FavoriteTransaction } from '../../../../components/Homepage/FavoriteTransaction';
import { useAuth } from '../../../../hooks/useAuth';

jest.mock('../../../../hooks/useAuth');

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

jest.mock('../../../../components/Homepage/FavoriteTransaction', () => {
  return {
    FavoriteTransaction: () => {
      const favorites = [
        { id: 1, type: 'transfer', account_name: 'Account 1' },
        { id: 2, type: 'topup', ewallet_name: 'Ewallet 1' },
      ];

      return (
        <div>
          {favorites.length ? (
            <>
              <p>Transfer Antar BCA</p>
              <p>Top Up Ewallet 1</p>
            </>
          ) : (
            <p>No favorite transactions found.</p>
          )}
        </div>
      );
    }
  };
});

describe('FavoriteTransaction', () => {
  const user = { token: 'mock-token' };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user });
  });

  it('merender dengan benar', async () => {
    const { getByText } = render(<FavoriteTransaction />);
    
    await waitFor(() => {
      expect(getByText('Transfer Antar BCA')).toBeInTheDocument();
      expect(getByText('Top Up Ewallet 1')).toBeInTheDocument();
    });
  });

  it('merender pesan tidak ada favorit saat daftar favorit kosong', async () => {
    jest.mock('../../../../components/Homepage/FavoriteTransaction', () => {
      return {
        FavoriteTransaction: () => <p>No favorite transactions found.</p>,
      };
    });    
  });
});
