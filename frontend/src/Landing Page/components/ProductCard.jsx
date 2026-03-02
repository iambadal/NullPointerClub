import "./styles/ProductCard.css";

const ProductCard = ({ title, description, points, buttonText }) => {
  return (
    <div className="product-card">
      <h3>{title}</h3>
      <p className="product-desc">{description}</p>

      <ul>
        {points.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button>{buttonText}</button>
    </div>
  );
};

export default ProductCard;
