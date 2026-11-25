
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectItems,
  selectTotal,
  setQty,
  removeFromCart
} from '../store/cartSlice';

function CartView() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  if (items.length === 0) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <Link to="/">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Shopping Cart</h2>

      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>

          <button
            onClick={() =>
              dispatch(setQty({ id: item.id, qty: item.qty - 1 }))
            }
          >
            -
          </button>

          <span> {item.qty} </span>

          <button
            onClick={() =>
              dispatch(setQty({ id: item.id, qty: item.qty + 1 }))
            }
          >
            +
          </button>

          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>

          <p>Subtotal: ${item.price * item.qty}</p>
        </div>
      ))}

      <h2>Total: ${total}</h2>
      <Link className="btn" to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}

export default CartView;
