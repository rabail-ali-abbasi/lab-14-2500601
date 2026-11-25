
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCount } from '../store/cartSlice';

function Navbar() {
  const count = useSelector(selectCount);

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Mini Shop</Link>

      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({count})</Link>
      </div>
    </nav>
  );
}

export default Navbar;
