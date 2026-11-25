
import { Link } from 'react-router-dom';

function SuccessPage() {
  return (
    <div className="container success-page">
      <h1>Order Successful!</h1>
      <p>Thank you for shopping with Mini Shop.</p>
      <p>Your order has been placed successfully.</p>

      <Link to="/" className="btn">
        Continue Shopping
      </Link>
    </div>
  );
}

export default SuccessPage;
