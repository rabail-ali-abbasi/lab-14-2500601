
import products from '../data/products';
import ProductCard from '../components/ProductCard';

function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to Mini Shop</h1>
      <p>Explore our products and add your favourites to the cart.</p>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
