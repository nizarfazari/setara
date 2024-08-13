import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Transfer from '../../../pages/BCA/index';

describe('Transfer Component', () => {
    test('should highlight the selected wallet on click', () => {
        render(
            <MemoryRouter>
                <Transfer />
            </MemoryRouter>
        );

        const wallet = screen.getByText('Transfer Antar BCA');
        const walletContainer = wallet.closest('div[class^="flex justify-center"]');

        // Check that the wallet is initially not selected
        if (walletContainer) {
            expect(walletContainer).toHaveClass('bg-primary-300');

            // Click the wallet to select it
            fireEvent.click(walletContainer);

            // Check that the wallet is now selected
            expect(walletContainer).toHaveClass('bg-primary-100');
        }
    });
});
