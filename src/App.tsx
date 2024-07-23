import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./context";
import Login from "./pages/Login";
import Home from "./pages/Home";

/* 
  BCA
*/
import TransferBCA from "./pages/BCA";
import AmountTopUpBCA from "./pages/BCA/AmountTopUp";
import DestinationNumberBCA from "./pages/BCA/DestinationNumber/DestinationNumber";
import ConfirmationPINBCA from "./pages/BCA/ConfirmationPin";
import PlainLayout from "./layouts/PlainLayout";

/* 
  E Wallet
*/
import TransferWallet from "./pages/E-Wallet";
import DestinationNumberPage from "./pages/E-Wallet/DestinationNumber/DestinationNumber";
import AmountTopUpPage from "./pages/E-Wallet/AmountTopUp";
import ConfirmationPIN from "./pages/E-Wallet/ConfirmationPin";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PlainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/e-wallet" element={<PlainLayout />}>
            <Route index element={<TransferWallet />} />
            <Route path="/e-wallet/:slug" element={<DestinationNumberPage />} />
            <Route path="/e-wallet/:slug/nomor-tujuan" element={<AmountTopUpPage />} />
            <Route path="/e-wallet/:slug/konfirmasi" element={<ConfirmationPIN />} />
          </Route>
          <Route path="/bca" element={<PlainLayout />}>
            <Route index element={<TransferBCA />} />
            <Route path="/bca/:slug" element={<DestinationNumberBCA />} />
            <Route path="/bca/:slug/nomor-tujuan" element={<AmountTopUpBCA />} />
            <Route path="/bca/:slug/konfirmasi" element={<ConfirmationPINBCA />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
