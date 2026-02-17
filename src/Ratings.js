import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Ratings() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [ratings, setRatings] = useState({});
  const [hover, setHover] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    if (orders.length > 0) {
      const lastOrder = orders[orders.length - 1];
      setOrder(lastOrder);

      const initialRatings = {};
      lastOrder.items.forEach(item => {
        initialRatings[item.name] = 5;
      });
      setRatings(initialRatings);
    }
  }, []);

  const handleRatingChange = (itemName, value) => {
    setRatings({ ...ratings, [itemName]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!order) return;

    let message = `⭐ *New Rating - Kembara Afiat* ⭐\n\n`;
    message += `Order Date: ${order.date}\n\n`;

    order.items.forEach(item => {
      message += `${item.name} x ${item.qty}\n`;
      message += `Rating: ${ratings[item.name]} ⭐\n\n`;
    });

    message += `Customer: ${order.name}\n`;
    message += `Phone: ${order.phone}\n`;
    message += `Address: ${order.address}`;

    const whatsappNumber = "60108266105"; // your WhatsApp number
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
    setSubmitted(true);
  };

  if (!order) return <h2 style={{ textAlign: "center" }}>No recent order to rate.</h2>;

  return (
    <div style={{
      maxWidth: "600px",
      margin: "50px auto",
      padding: "30px",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
      background: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255,255,255,0.3)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      position: "relative",
      color: "#0c050b"
    }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "8px 15px",
          borderRadius: "10px",
          border: "none",
          background: "rgba(0, 250, 21, 0.81)",
          backdropFilter: "blur(5px)",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.3s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(2, 250, 217, 0.5)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
      >
        ← Back
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "30px", textShadow: "0 2px 5px rgba(0,0,0,0.3)" }}>
        ⭐ Rate Your Order
      </h1>

      <form onSubmit={handleSubmit}>
        {order.items.map(item => (
          <div key={item.id} style={{ marginBottom: "25px" }}>
            <h3>{item.name} x {item.qty}</h3>

            {/* Star Rating */}
            <div style={{ display: "flex", gap: "8px", fontSize: "28px" }}>
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  style={{
                    cursor: "pointer",
                    transition: "0.3s",
                    color: star <= (hover[item.name] || ratings[item.name]) ? "#f1c40f" : "#ccc",
                    transform: star <= (hover[item.name] || ratings[item.name]) ? "scale(1.3)" : "scale(1)",
                  }}
                  onClick={() => handleRatingChange(item.name, star)}
                  onMouseEnter={() => setHover({ ...hover, [item.name]: star })}
                  onMouseLeave={() => setHover({ ...hover, [item.name]: 0 })}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}

       <button
  type="submit"
  style={{
    width: "100%",
    padding: "15px",
    fontSize: "18px",
    borderRadius: "15px",
    border: "none",
    background: "linear-gradient(135deg, #27ae60, #16a085)", // ✅ new gradient color
    color: "#ffffff", // ✅ text color
    cursor: "pointer",
    marginTop: "20px",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)", // subtle shadow
    transition: "0.3s",
  }}
  onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(135deg, #2ecc71, #1abc9c)"} // hover color
  onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(135deg, #27ae60, #16a085)"} // default
>
  Submit Rating via WhatsApp
</button>

      </form>

      {submitted && (
        <p style={{
          marginTop: "20px",
          textAlign: "center",
          color: "lightgreen",
          fontWeight: "bold"
        }}>
          Thank you! WhatsApp opened successfully.
        </p>
      )}
    </div>
  );
}

export default Ratings;
