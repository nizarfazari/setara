import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../../pages/login/index';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';

jest.mock('../../../hooks/useAuth');
jest.mock('../../../hooks/useNotification');

describe('Login Integration Test', () => {
  const mockLogin = jest.fn();
  const mockOpenNotificationWithIcon = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    (useNotification as jest.Mock).mockReturnValue({
      openNotificationWithIcon: mockOpenNotificationWithIcon,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('integrates useAuth and useNotification correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ data: 'testData', message: 'Login successful' }),
      })
    ) as jest.Mock;

    render(<Login />);

    fireEvent.change(screen.getByLabelText('Masukan Username ID Anda'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Masukan Password Anda'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testData');
      expect(mockOpenNotificationWithIcon).toHaveBeenCalledWith(
        'success',
        'Success',
        'Login successful'
      );
    });
  });
});
