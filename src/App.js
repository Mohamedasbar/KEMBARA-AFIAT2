import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";
import Ratings from "./Ratings";
import Lifestyle from "./Lifestyle"; // Lifestyle page
import "./style.css";

function App() {
  return (
    <Router>
      {/* Top Header with Logo and Company Name */}
      <div className="top-header">
        <div className="company-box">
          {/* ✅ Logo clickable to home */}
          <Link to="/">
            <img src="/images/logo.png" alt="Company Logo" className="company-logo" />
          </Link>
        
            <h2 className="company-name">Kembara Afiat</h2>
          
        </div>

        {/* Navigation Links */}
        <nav className="main-nav">
          
          <Link to="/lifestyle">Lifestyle</Link>
        
          <Link to="/order-history">Order History</Link>
        
        </nav>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/ratings" element={<Ratings />} />
      </Routes>
    </Router>
  );
}

export default App;
