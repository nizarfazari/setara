import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppProvider from './context'

import Home from './pages/Home';
import TransactionFailed from './pages/TransaksiGagal';
import TransactionSuccess from './pages/TransaksiBerhasil';
import Mutasi from './pages/Mutasi/index';
import BuktiTransfer from './pages/BuktiTransfer';
import Notifikasi from './pages/Notifikasi';

/* 
  BCA
*/
import TransferBCA from "./pages/BCA";
import AmountTopUpBCA from "./pages/BCA/AmountTopUp";
import DestinationNumberBCA from "./pages/BCA/DestinationNumber/DestinationNumber";
import KonfirmasiBCA from './pages/BCA/Confirmation';
import ConfirmationPINBCA from "./pages/BCA/ConfirmationPin";
import PlainLayout from "./layouts/PlainLayout";
import NewDestinationNumberBCA from "./pages/BCA/NewDestination/NewDestinationNumber";

/*
  E Wallet
*/
import TransferWallet from "./pages/E-Wallet";
import DestinationNumberPage from "./pages/E-Wallet/DestinationNumber/DestinationNumber";
import AmountTopUpPage from "./pages/E-Wallet/AmountTopUp";
import ConfirmationPIN from "./pages/E-Wallet/ConfirmationPin";
import Konfirmasi from './pages/E-Wallet/Confirmation';
import NewDestinationNumberPage from "./pages/E-Wallet/NewDestination/NewDestinationNumber";
import Login from './pages/login';
import { AuthProvider } from './hooks/useAuth';
import ProtectedUser from './middleware/ProtectedUser';
import { NotificationProvider } from './hooks/useNotification';

function App() {
  return (
    <AppProvider>
      <Router>
        <NotificationProvider>
          <AuthProvider>
            <Routes>
              <Route element={<ProtectedUser />}>
                <Route path="/" element={<PlainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="/transaksi-gagal" element={<TransactionFailed />} />
                  <Route path="/transaksi-berhasil" element={<TransactionSuccess />} />
                  <Route path="/mutasi" element={<Mutasi />} />
                  <Route path="/mutasi/:id" element={<BuktiTransfer />} />
                  <Route path="/notifikasi" element={<Notifikasi />} />
                </Route>
                <Route path="/e-wallet" element={<PlainLayout />}>
                  <Route index element={<TransferWallet />} />
                  <Route path="/e-wallet/:slug" element={<DestinationNumberPage />} />
                  <Route path="/e-wallet/:slug/nominal-topup" element={<AmountTopUpPage />} />
                  <Route path="/e-wallet/:slug/tinjau" element={<Konfirmasi />} />
                  <Route path="/e-wallet/:slug/nomor-tujuan-baru" element={<NewDestinationNumberPage />} />
                  <Route path="/e-wallet/:slug/konfirmasi" element={<ConfirmationPIN />} />
                </Route>
                <Route path="/bca" element={<PlainLayout />}>
                  <Route index element={<TransferBCA />} />
                  <Route path="/bca/:slug" element={<DestinationNumberBCA />} />
                  <Route path="/bca/:slug/nominal-topup/:id" element={<AmountTopUpBCA />} />
                  <Route path="/bca/:slug/tinjau" element={<KonfirmasiBCA />} />
                  <Route path="/bca/:slug/nomor-tujuan-baru" element={<NewDestinationNumberBCA />} />
                  <Route path="/bca/:slug/konfirmasi" element={<ConfirmationPINBCA />} />
                </Route>
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>
        </NotificationProvider>

      </Router>
    </AppProvider>
  );
}

export default App;