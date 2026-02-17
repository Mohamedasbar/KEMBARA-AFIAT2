import { useEffect, useState } from "react";
import "./Lifestyle.css";

function Lifestyle() {
  const [typing, setTyping] = useState("");
  const text = "Kembara Afiat Lifestyle";

  // Typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTyping(prev => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lifestyle-page">
      {/* Flying leaves */}
      <div className="leaves-container">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`leaf leaf-${i}`}>🍃</div>
        ))}
      </div>

      {/* Main content */}
      <div className="lifestyle-content">
        <h1 className="typing-effect">{typing}</h1>
        <p>
          Embrace a natural and balanced lifestyle with Kembara Afiat. We bring wellness,
          sustainability, and natural goodness to your daily life.
        </p>
        <p>
          Our philosophy focuses on conscious living, connecting you with nature,
          traditional wisdom, and holistic health practices.
        </p>
        <p>
          From pure honey and A2 ghee to herbal oils and sustainable products,
          Kembara Afiat enhances your lifestyle with natural goodness.
        </p>
        <p>
          Join us on this journey towards health, wellness, and mindful living.
        </p>
      </div>
    </div>
  );
}

export default Lifestyle;
