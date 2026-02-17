import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Products() {
  const productList = [
    { id: 1, name: "big tiffin set", price: 126, image: "/images/BIG Tiffin set  Stainless Stee2.png" },
    { id: 2, name: "coper", price: 162, image: "/images/coper1.png" },
    { id: 3, name: "Madu Tualang Asli 1KG", price: 130, image: "/images/Madu Tualang Asli 1kg 1.png" },
    { id: 4, name: "Botol Air Tembaga Tulen1", price: 75, image: "/images/Botol Air Tembaga Tulen1.png" },
    { id: 5, name: "HALWA KELAPA", price: 126, image: "/images/HALWA KELAPA4.png" },
    { id: 6, name: "Minyak Kelapa Asli (Wooden Press)", price: 126, image: "/images/Minyak Kelapa Asli (Wooden Press) 1.png" },
    { id: 7, name: "minyak1", price: 126, image: "/images/minyak1.png" },
    { id: 9, name: "stainless_steel_hot box", price: 126, image: "/images/stainless_steel_hot box1.png" },
    { id: 10, name: "Tepung barli organik", price: 126, image: "/images/Tepung barli organik1.png" },
  ];

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Add to cart + flying flower effect
  const addToCart = (product, e) => {
    // Cart logic
    const exist = cart.find(item => item.id === product.id);
    const updatedCart = exist
      ? cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      : [...cart, { ...product, qty: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Flower animation
    const rect = e.target.getBoundingClientRect();
    const flower = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top,
    };
    setFlowers(prev => [...prev, flower]);
    setTimeout(() => setFlowers(prev => prev.filter(f => f.id !== flower.id)), 1000);
  };

  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <a href="#about">About</a>
        <Link to="/cart">Cart ({cart.length})</Link>

        <div className="menu-icon" onClick={() => setMenuOpen(true)}>☰</div>

        {/* Slide Menu */}
        <div className={`slide-menu ${menuOpen ? "active" : ""}`}>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link></li>
            <li><Link to="/order-history" onClick={() => setMenuOpen(false)}>Order History</Link></li>
            <li><Link to="/ratings" onClick={() => setMenuOpen(false)}>Ratings</Link></li>
          </ul>
        </div>
      </nav>

      {/* SEARCH */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCTS GRID */}
      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-box">
            <img src={product.image} alt={product.name} className="product-img" />
            <h3>{product.name}</h3>
            <div className="price">MYR {product.price}</div>
            <button onClick={(e) => addToCart(product, e)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Flying flowers */}
      {flowers.map(flower => (
        <div
          key={flower.id}
          className="flying-flower"
          style={{
            left: flower.x,
            top: flower.y,
          }}
        >🌸</div>
      ))}

      {/* ABOUT */}
      <section id="about" className="about-section">
        <h2>Kembara Afiat</h2>
        <p>
          We provide natural healthy products like pure honey, A2 ghee,
          copper containers and herbal oils.
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <h3>🏢 Company: Kembara Afiat</h3>
        <h3>👤 Founder: Mohamed Firdous</h3>
        <h3>📍 Location: Johor, Malaysia</h3>
        <h3>✉️ Email: asbarpkm2004@gmail.com</h3>
        <h3>📞 Mobile: +91 78269 74909</h3>
        <div className="link">
          <a href="https://wa.me/c/60108266105">💬 Click here!</a>
        </div>
      </footer>

      <div className="copyright">
        © 2026 Kembara Afiat • All Rights Reserved
      </div>
    </div>
  );
}

export default Products;
