import ProductCard from "../components/ProductCard";
import "./styles/Product.css";

const Product = () => {
  return (
    <section className="product-section">
      <h2 className="product-title">Who Is This Platform For?</h2>

      <p className="product-subtitle">
        Built for hackers who love solving and creators who love building.
      </p>

      <div className="product-grid">
        <ProductCard
          title="For Participants"
          description="Practice, compete, and sharpen your cybersecurity skills."
          points={[
            "Solve real-world CTF challenges",
            "Practice labs & learning paths",
            "Track progress & ranking",
            "Join live competitions",
          ]}
          buttonText="Start Hacking"
        />

        <ProductCard
          title="For Organisers"
          description="Host and manage CTF competitions effortlessly."
          points={[
            "Create & manage challenges",
            "Launch events easily",
            "Auto scoring & leaderboard",
            "Monitor participants",
          ]}
          buttonText="Host a CTF Event"
        />
      </div>
    </section>
  );
};

export default Product;