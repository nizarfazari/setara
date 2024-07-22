import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./context";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DestinationNumberPage from "./pages/E-Wallet/DestinationNumber/DestinationNumber";
import PlainLayout from "./layouts/PlainLayout";

import TransferWallet from "./pages/TransferWallet";
import TransferBCA from "./pages/TransferBCA";

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
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
