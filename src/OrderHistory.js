import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(savedOrders);
  }, []);

  // 🔴 Clear ALL orders
  const clearAllOrders = () => {
    if (window.confirm("Are you sure you want to clear all order history?")) {
      localStorage.removeItem("orderHistory");
      setOrders([]);
    }
  };

  // 🔴 Clear single order
  const clearSingleOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "25px",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      color: "#333",
    }}>
      {/* 🔙 Back Button */}
      <Link to="/" style={{
        display: "inline-block",
        marginBottom: "20px",
        padding: "8px 15px",
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(8px)",
        borderRadius: "12px",
        textDecoration: "none",
        color: "#27ae60",
        fontWeight: "600",
        transition: "0.3s",
        cursor: "pointer"
      }}
      onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.target.style.transform = "scale(1)"}  
      >
        ⬅ Back to Products
      </Link>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Order History</h1>

      {orders.length === 0 && <p style={{ textAlign: "center" }}>No previous orders.</p>}

      {orders.map((order, index) => (
        <div
          key={index}
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(15px)",
            padding: "20px",
            margin: "15px 0",
            borderRadius: "20px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            transition: "0.3s"
          }}
        >
          <h3>Order #{index + 1}</h3>

          {order.items.map((item, idx) => (
            <p key={idx}>
              {item.name} x {item.qty} - MYR {item.price * item.qty}
            </p>
          ))}

          <p><strong>Total:</strong> MYR {order.total}</p>

          {/* 🔴 Clear Single Order Button */}
          <button
            onClick={() => clearSingleOrder(index)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              background: "linear-gradient(135deg, #e74c3c, #c0392b)",
              color: "white",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >
            Delete This Order
          </button>
        </div>
      ))}

      {/* 🔴 Clear All Button */}
      {orders.length > 0 && (
        <button
          onClick={clearAllOrders}
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "12px 0",
            background: "linear-gradient(135deg, #1e8449, #27ae60)",
            color: "white",
            border: "none",
            borderRadius: "20px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >
          Clear All Orders
        </button>
      )}
    </div>
  );
}

export default OrderHistory;
