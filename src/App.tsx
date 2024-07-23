
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppProvider from './context'
import Login from './pages/Login'
import DestinationNumberPage from './pages/DestinationNumber';
import PlainLayout from './layouts/PlainLayout';
import AmountTopUpPage from './pages/AmountTopUp';
import TransferWallet from './pages/TransferWallet';
import Transfer from './pages/Transfer';
import Home from './pages/Home';
import TransactionFailed from './pages/TransaksiGagal';
import Mutasi from './pages/Mutasi';
import BuktiTransfer from './pages/BuktiTransfer';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PlainLayout />}>
            <Route index element={<Home />} />
            <Route path="/top-up" element={<TransferWallet />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/transfer/:tujuan" element={<DestinationNumberPage />} />
            <Route path="/transfer/:tujuan/:nomor" element={<AmountTopUpPage />} />
            <Route path="/transaction-failed" element={<TransactionFailed />} />
            <Route path="/mutasi" element={<Mutasi />} />
            <Route path="/mutasi/:id" element={<BuktiTransfer />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
