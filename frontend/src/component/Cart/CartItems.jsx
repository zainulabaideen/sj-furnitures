import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { removeFromCart, addToCart } from "../../actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

const CartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [promo, setPromo] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  // ✅ PKR formatter
  const currency = (num) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(num);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateQuantity = (id, qty, stock, name) => {
    if (qty > stock) {
      alert(`⚠️ "${name}" is out of stock!`);
      return;
    }
    if (qty >= 1 && qty <= stock) {
      dispatch(addToCart(id, qty));
    }
  };

  const getSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalShipping = () =>
    cartItems.reduce((total, item) => total + (item.shipping || 0), 0);

  const total = getSubtotal() + getTotalShipping();
  const isCartEmpty = cartItems.length === 0;

  const checkOutHandler = () => {
    navigate("/login/shipping");
  };

  const applyPromo = () => {
    if (!promo) {
      setPromoMessage("⚠️ Please enter a promo code.");
      return;
    }
    setPromoMessage(`✅ Promo code "${promo}" applied!`);
  };

  if (isCartEmpty) {
    return (
      <div className="mt-28 min-h-[40vh] flex flex-col justify-center items-center text-center space-y-5">
        <h2 className="text-3xl font-semibold text-gray-700">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-500 text-lg">
          Looks like you haven’t added anything yet.
        </p>
        <Link to="/products">
          <button className="flex items-center justify-center gap-2 bg-primary hover:bg-opacity-95 text-white px-6 py-2 rounded-full font-semibold transition">
            Shop Now
            <FaArrowRight />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-24 md:px-20 px-3">
      {/* Desktop Table Layout */}
      <div className="hidden lg:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-4">Product</th>
              <th className="p-4">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4">Shipping</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Total</th>
              <th className="p-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.product}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  <Link to={`/product/${item.product}`}>
                    <img
                      src={Array.isArray(item.images) ? item.images[0] : item.images}
                      alt={item.name}
                      className="w-20 h-20 object-contain"
                    />
                  </Link>
                </td>
                <td className="p-4 font-medium">
                  <Link
                    to={`/product/${item.product}`}
                    className="hover:text-secondary"
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="p-4">{currency(item.price)}</td>
                <td className="p-4">
                  {item.shipping > 0 ? currency(item.shipping) : "Free"}
                </td>
                <td className="p-4">
                  <div className="flex items-center border rounded-md w-fit">
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(item.product, item.quantity - 1, item.stock, item.name)
                      }
                      className="px-3 py-1 disabled:opacity-50 hover:text-gray-800"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      disabled={item.quantity >= item.stock}
                      onClick={() =>
                        updateQuantity(item.product, item.quantity + 1, item.stock, item.name)
                      }
                      className="px-3 py-1 disabled:opacity-50 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-4 font-semibold">
                  {currency(item.price * item.quantity + item.shipping)}
                </td>
                <td className="p-4">
                  <IoClose
                    onClick={() => handleRemove(item.product)}
                    className="w-7 h-7 text-secondary hover:bg-secondary/20 cursor-pointer p-1 rounded-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 Updated Mobile Layout */}
      <div className="lg:hidden">
        <h3 className="text-secondary pb-10 text-xl text-center font-semibold">
        Order Summary
        </h3>
        {cartItems.map((item) => (
          <div
            key={item.product}
            className="flex flex-col justify-center gap-5 py-4 mb-6  rounded-lg shadow-lg p-3 bg-white"
          >
            {/* Product Row */}
            <div className="flex justify-between items-center">
              <p className="text-[18px] font-medium">Product</p>
              <Link to={`/product/${item.product}`}>
                <img
                  src={Array.isArray(item.images) ? item.images[0] : item.images}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />
              </Link>
            </div>
            {/* Title */}
            <div className="flex justify-between items-center">
              <p className="text-[18px] font-medium pr-10">Title</p>
              <Link
                to={`/product/${item.product}`}
                className="hover:text-secondary"
              >
                {item.name}
              </Link>
            </div>
            {/* Price */}
            <div className="flex justify-between items-center">
              <p className="text-[18px] font-medium">Price</p>
              <p>{currency(item.price)}</p>
            </div>
            {/* Quantity */}
            <div className="flex justify-between items-center">
              <p className="text-[18px] font-medium">Quantity</p>
              <div className="flex items-center border rounded-md w-fit">
                <button
                  disabled={item.quantity <= 1}
                  onClick={() =>
                    updateQuantity(item.product, item.quantity - 1, item.stock, item.name)
                  }
                  className="px-3 py-1 disabled:opacity-50 hover:text-gray-800"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  disabled={item.quantity >= item.stock}
                  onClick={() =>
                    updateQuantity(item.product, item.quantity + 1, item.stock, item.name)
                  }
                  className="px-3 py-1 disabled:opacity-50 hover:text-gray-800"
                >
                  +
                </button>
              </div>
            </div>
            {/* Total */}
            <div className="flex justify-between items-center">
              <p className="text-[18px] font-medium">Total</p>
              <p>{currency(item.price * item.quantity)}</p>
            </div>
            {/* Remove */}
            <div className="flex justify-between items-center">
              <p className="text-[18px] font-medium">Remove</p>
              <IoClose
                onClick={() => handleRemove(item.product)}
                className="w-6 h-6 text-secondary hover:bg-secondary/20 cursor-pointer p-1 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="md:flex items-start justify-between mt-12 gap-10">
        <div className="flex-1 bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold">Cart Totals</h2>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{currency(getSubtotal())}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>{getTotalShipping() > 0 ? currency(getTotalShipping()) : "Free"}</p>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <p>Total</p>
            <p>{currency(total)}</p>
          </div>
          <button
            onClick={checkOutHandler}
            className="w-full bg-primary hover:bg-opacity-95 text-white py-3 rounded-lg font-semibold transition"
          >
            Proceed to Checkout
          </button>
        </div>

        <div className="flex-1 bg-white p-6 rounded-xl shadow mt-6 md:mt-0">
          <p className="font-medium mb-3">Have a promo code?</p>
          <div className="flex gap-3">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Enter code"
              className="flex-1 px-3 py-2 border rounded-md outline-none"
            />
            <button
              onClick={applyPromo}
              className="bg-primary hover:bg-opacity-95 text-white px-5 py-2 rounded-lg transition"
            >
              Apply
            </button>
          </div>
          {promoMessage && (
            <p className="text-sm mt-2 text-gray-600">{promoMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
