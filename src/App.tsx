import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./context";
import Login from "./pages/Login";
import Home from "./pages/Home";
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
            <Route path="/destination-number" element={<DestinationNumberPage />} />
            <Route path="/amount-topup" element={<AmountTopUpPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
