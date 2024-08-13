
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import FormTopUp from '../../../../components/FormTopUp';
import { AuthProvider } from '../../../../hooks/useAuth';


// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));



jest.mock('../../../../hooks/useNotification', () => ({
    useNotification: () => ({
        openNotificationWithIcon: jest.fn(),
    }),
}));

const mockSetProcessTransaction = jest.fn();

  


describe('FormTopUp', () => {
    const mockNavigate = useNavigate as jest.Mock;

    beforeEach(() => {
        mockNavigate.mockReset();
    });

    test('renders FormTopUp correctly', () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <FormTopUp pathUrl="/e-wallet/transfer" />
                </AuthProvider>
            </MemoryRouter>
        );

        // Check if the form elements are rendered
        expect(screen.getByLabelText('Nominal Top Up')).toBeInTheDocument();
        expect(screen.getByLabelText('Catatan')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Lanjutkan/i })).toBeInTheDocument();
    });

    test('submits form with valid data and navigates correctly', () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <FormTopUp pathUrl="/e-wallet/transfer" />
                </AuthProvider>
            </MemoryRouter>
        );

        // Fill in the form
        fireEvent.change(screen.getByLabelText('Nominal Top Up'), { target: { value: 20000 } });
        fireEvent.change(screen.getByLabelText('Catatan'), { target: { value: 'Valid note' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Lanjutkan/i }));

        // Check if setProcessTransaction is called with correct values
        expect(mockSetProcessTransaction).toHaveBeenCalledWith({
            nominal: '20.000',
            notes: 'Valid note',
        });

        // Check if navigate is called with correct path
        expect(mockNavigate).toHaveBeenCalledWith('/e-wallet/transfer/tinjau');
    });

    test('shows validation error for invalid nominal amount', async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <FormTopUp pathUrl="/e-wallet/transfer" />
                </AuthProvider>
            </MemoryRouter>
        );

        // Fill in the form with invalid nominal amount
        fireEvent.change(screen.getByLabelText('Nominal Top Up'), { target: { value: 5000 } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Lanjutkan/i }));

        // Check for validation error message
        expect(await screen.findByText('Minimum transfer adalah 10000, mohon isikan kembali')).toBeInTheDocument();
    });

    test('initializes form fields with transaction data', () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <FormTopUp pathUrl="/e-wallet/transfer" />
                </AuthProvider>
            </MemoryRouter>
        );

        // Check if the initial values are set correctly
        expect(screen.getByLabelText('Nominal Top Up')).toHaveValue('20.000');
        expect(screen.getByLabelText('Catatan')).toHaveValue('Valid note');
    });
});