import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const confirmOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!name || !phone || !address) {
      alert("Fill all details");
      return;
    }

    // Build WhatsApp message
    let message = "New Order:\n\n";
    cart.forEach(item => {
      message += `${item.name} x ${item.qty} - MYR ${item.price * item.qty}\n`;
    });
    message += `\nTotal: MYR ${total}`;
    message += `\n\nName: ${name}`;
    message += `\nPhone: ${phone}`;
    message += `\nAddress: ${address}`;

    const whatsappNumber = "917339398378"; // CHANGE THIS
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    // ✅ Save order to orderHistory in localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    savedOrders.push({ items: cart, total, name, phone, address, date: new Date().toLocaleString() });
    localStorage.setItem("orderHistory", JSON.stringify(savedOrders));

    // ✅ Clear cart
    localStorage.removeItem("cart");
    setCart([]);

    // ✅ Redirect to Ratings page
    window.location.href = "/ratings";
  };

  return (
    <div className="cart-container">
      <Link to="/" className="back-btn">⬅ Back to Products</Link>

      <h1 className="cart-title">Your Shopping Cart</h1>

      {cart.length === 0 && <p className="empty-cart">Your cart is empty.</p>}

      {cart.map(item => (
        <div key={item.id} className="cart-box">
          <h3>{item.name}</h3>
          <p className="cart-price">
            MYR {item.price} × {item.qty} = MYR {item.price * item.qty}
          </p>

          <div className="qty-section">
            <button onClick={() => decreaseQty(item.id)}>➖</button>
            <span>{item.qty}</span>
            <button onClick={() => increaseQty(item.id)}>➕</button>
          </div>

          <button className="remove-btn" onClick={() => removeItem(item.id)}>
            🗑 Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h2 className="cart-total">Total: MYR {total}</h2>

          <div className="customer-box">
            <input
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <button className="checkout-btn" onClick={confirmOrder}>
              Confirm Order via WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
