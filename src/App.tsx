import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./context";
import Login from "./pages/Login";
import Home from "./pages/homepage";
import TransactionFailed from "./pages/transactionFailed";
import DestinationNumberPage from "./pages/DestinationNumber";
import PlainLayout from "./layouts/PlainLayout";
import AmountTopUpPage from "./pages/AmountTopUp";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PlainLayout />}>
            <Route index element={<Home />} />
            <Route
              path="/destination-number"
              element={<DestinationNumberPage />}
            />
            <Route path="/amount-topup" element={<AmountTopUpPage />} />
            <Route path="/transaction-failed" element={<TransactionFailed />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
