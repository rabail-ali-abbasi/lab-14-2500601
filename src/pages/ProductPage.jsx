
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import products from '../data/products';
import { addToCart } from '../store/cartSlice';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="container">
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <h2>Price: ${product.price}</h2>

      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>

      <p><Link to="/">Back to Home</Link></p>
    </div>
  );
}

export default ProductPage;
