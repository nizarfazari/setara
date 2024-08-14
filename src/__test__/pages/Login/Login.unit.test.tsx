import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../../pages/login/index';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';

jest.mock('../../../hooks/useAuth');
jest.mock('../../../hooks/useNotification');

describe('Login Component', () => {
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

  it('renders the login form', () => {
    render(<Login />);
    expect(
      screen.getByLabelText('Masukan Username ID Anda')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Masukan Password Anda')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument();
  });

  it('displays validation errors when required fields are empty', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));
    expect(
      await screen.findByText('Mohon Masukan Username!')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Mohon Masukan Password!')
    ).toBeInTheDocument();
  });

  it('calls the login function on successful form submission', async () => {
    // Mock fetch
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

  it('displays error notification on failed login', async () => {
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ errors: 'Invalid credentials' }),
      })
    ) as jest.Mock;

    render(<Login />);

    fireEvent.change(screen.getByLabelText('Masukan Username ID Anda'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Masukan Password Anda'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));

    await waitFor(() => {
      expect(mockOpenNotificationWithIcon).toHaveBeenCalledWith(
        'error',
        'Error',
        'Invalid credentials'
      );
    });
  });
});
