import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./context";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DestinationNumberPage from "./pages/E-Wallet/DestinationNumber/DestinationNumber";
import PlainLayout from "./layouts/PlainLayout";

import TransferWallet from "./pages/TransferWallet";
import TransferBCA from "./pages/TransferBCA";
import AmountTopUpPage from "./pages/E-Wallet/AmountTopUp";
import ConfirmationPIN from "./pages/E-Wallet/ConfirmationPin";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PlainLayout />}>
            <Route index element={<Home />} />
            <Route path="/transfer-bca" element={<TransferBCA />} />
          </Route>
          <Route path="/e-wallet" element={<PlainLayout />}>
            <Route index element={<TransferWallet />} />
            <Route path="/e-wallet/:slug" element={<DestinationNumberPage />} />
            <Route path="/e-wallet/:slug/destination-number" element={<AmountTopUpPage />} />
            <Route path="/e-wallet/:slug/confirmation" element={<ConfirmationPIN />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
