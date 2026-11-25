
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <h3>${product.price}</h3>

      <div className="card-buttons">
        <Link to={`/product/${product.id}`} className="btn">
          View Details
        </Link>

        <button onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
