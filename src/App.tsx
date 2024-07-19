
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppProvider from './context'
import Login from './pages/Login'
import DestinationNumberPage from './pages/DestinationNumber';
import PlainLayout from './layouts/PlainLayout';
import AmountTopUpPage from './pages/AmountTopUp';
import TransferWallet from './pages/TransferWallet';
import TransferBCA from './pages/TransferBCA';
import Home from './pages/Home';
import TransactionFailed from './pages/TransactionFailed';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PlainLayout />}>
            <Route index element={<Home />} />
            <Route path="/destination-number" element={<DestinationNumberPage />} />
            <Route path="/amount-topup" element={<AmountTopUpPage />} />
            <Route path="/e-wallet" element={<TransferWallet />} />
            <Route path="/transfer-bca" element={<TransferBCA />} />
            <Route path="/transaction-failed" element={<TransactionFailed />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
