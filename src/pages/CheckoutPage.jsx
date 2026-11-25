
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, selectItems, selectTotal } from '../store/cartSlice';

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const [payment, setPayment] = useState('COD');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!/^\+?[0-9\s-]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!form.address.trim()) {
      newErrors.address = 'Please enter your delivery address.';
    }

    if (!terms) {
      newErrors.terms = 'You must accept the Terms and Conditions.';
    }

    if (items.length === 0) {
      newErrors.cart = 'Your cart is empty. Please add a product first.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    dispatch(clearCart());
    navigate('/success');
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {errors.cart && <p className="error">{errors.cart}</p>}

      <form onSubmit={handleSubmit} noValidate>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="03XXXXXXXXX"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label>Delivery Address</label>
        <textarea
          name="address"
          placeholder="Enter your complete address"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <h3>Select Payment Method</h3>

        <label>
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={payment === 'COD'}
            onChange={(e) => setPayment(e.target.value)}
          />
          Cash on Delivery (COD)
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="Online"
            checked={payment === 'Online'}
            onChange={(e) => setPayment(e.target.value)}
          />
          Online Payment
        </label>

        <h3>Order Total: Rs. {total}</h3>

        <label className="terms-label">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          I agree to the Terms and Conditions.
        </label>

        {errors.terms && <p className="error">{errors.terms}</p>}

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
