import { useParams, Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const productList = [
    { 
      id: 1, 
      name: "Koleh Tembaga siap penutup", 
      price: 126,
      image: "/images/koleh.jpg",
      description: "High quality copper container with lid."
    },
    { 
      id: 2, 
      name: "A2 Grassfed Ghee 650g", 
      price: 162,
      image: "/images/ghee.jpg",
      description: "Pure A2 grassfed ghee for healthy cooking."
    },
    { 
      id: 3, 
      name: "Madu Tualang Asli 1KG", 
      price: 130,
      image: "/images/madu.jpg",
      description: "100% pure Tualang honey from Malaysia."
    },
    { 
      id: 4, 
      name: "Minyak Habbatus Sauda 100ml", 
      price: 75,
      image: "/images/minyak.jpg",
      description: "Natural black seed oil for health benefits."
    }
  ];

  const product = productList.find(
    item => item.id === parseInt(id)
  );

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="details-container">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>MYR {product.price}</p>
      <p>{product.description}</p>

      <Link to="/">
        <button>Back to Products</button>
      </Link>
    </div>
  );
}

export default ProductDetails;
