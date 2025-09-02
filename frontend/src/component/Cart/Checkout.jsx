import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { createOrder } from "../../actions/orderAction";
import { useNavigate, Link } from "react-router-dom";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const formatPKR = (num) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(num);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
      {/* Step Indicator */}
      <nav
        aria-label="Checkout Steps"
        className="flex justify-between items-center mb-8"
      >
        <p
          className={`flex-1 text-center ${
            step === 1 ? "text-primary" : "text-gray-400"
          }`}
        >
          🚚 Shipping
        </p>
        <p
          className={`flex-1 text-center ${
            step === 2 ? "text-primary" : "text-gray-400"
          }`}
        >
          ✅ Confirm Order
        </p>
        <p
          className={`flex-1 text-center ${
            step === 3 ? "text-primary" : "text-gray-400"
          }`}
        >
          💳 Payment
        </p>
      </nav>

      {/* Step Content */}
      {step === 1 && <ShippingDetails onContinue={nextStep} />}
      {step === 2 && (
        <OrderConfirmation onBack={prevStep} onContinue={nextStep} />
      )}
      {step === 3 && <PaymentMethod onBack={prevStep} />}
    </main>
  );
};

// ---------------- Shipping Step ----------------
const ShippingDetails = ({ onContinue }) => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 11) {
      toast.error("Phone Number should be 11 digits long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    onContinue();
  };

  return (
    <section aria-labelledby="shipping-title">
      <header>
        <h2
          id="shipping-title"
          className="text-xl font-semibold mb-4 text-center text-secondary"
        >
          Shipping Details
        </h2>
      </header>
      <form className="space-y-4" onSubmit={shippingSubmit}>
        <input
          type="text"
          name="address"
          className="w-full outline-none border-none bg-gray-50 p-3 rounded-sm"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="tel"
          required
          name="phone"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="w-full outline-none border-none bg-gray-50 p-3 rounded-sm"
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="code"
          required
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          className="w-full outline-none border-none bg-gray-50 p-3 rounded-sm"
          placeholder="Pin Code"
        />

        {/* Country Dropdown */}
        <select
          id="country"
          className="w-full outline-none border-none bg-gray-50 p-3 rounded-sm"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Country</option>
          {Country.getAllCountries().map((item) => (
            <option key={item.isoCode} value={item.isoCode}>
              {item.name}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        {country && (
          <select
            id="state"
            className="w-full outline-none border-none bg-gray-50 p-3 rounded-sm"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">State</option>
            {State.getStatesOfCountry(country).map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          name="city"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full outline-none border-none bg-gray-50 p-3 rounded-sm"
          placeholder="City"
        />

        <button
          type="submit"
          className="w-full bg-primary/90 text-white p-3 rounded-sm hover:bg-primary"
        >
          Continue
        </button>
      </form>
    </section>
  );
};

// ---------------- Order Confirmation Step ----------------
const OrderConfirmation = ({ onBack, onContinue }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const formatPKR = (num) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(num);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = cartItems.reduce(
    (acc, item) => acc + (item.shipping || 0) * item.quantity,
    0
  );

  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = { subtotal, shippingCharges, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    onContinue();
  };

  return (
    <section className="space-y-8">
      {/* Shipping Info */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Shipping Info
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {shippingInfo.phoneNo}
          </p>
          <p>
            <span className="font-medium">Address:</span> {address}
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Your Cart Items
        </h3>
        <div className="divide-y divide-gray-200">
          {cartItems &&
            cartItems.map((item) => (
              <div
                key={item.product}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0].url
                        : "/default-product-image.png"
                    }
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/default-product-image.png";
                    }}
                  />
                  <Link
                    to={`/product/${item.product}`}
                    className="font-medium hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </div>
                <span className="text-sm text-gray-600">
                  {item.quantity} × {formatPKR(item.price)}{" "}
                  <b className="text-gray-900 ml-2">
                    {formatPKR(item.price * item.quantity)}
                  </b>
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white border rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Order Summary
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <p>Items Price</p>
            <span>{formatPKR(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <p>Shipping Charges</p>
            <span>{formatPKR(shippingCharges)}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t pt-3 mt-3">
            <p>Total</p>
            <span>{formatPKR(totalPrice)}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onBack}
            className="w-1/2 border p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={proceedToPayment}
            className="w-1/2 bg-primary text-white p-3 rounded-lg hover:bg-primary/90"
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </section>
  );
};

// ---------------- Payment Step ----------------
const PaymentMethod = ({ onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error, success, loading } = useSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (success) {
      localStorage.removeItem("cartItems");
      navigate("/order/success");
    }
  }, [error, success, dispatch, navigate]);


const placeOrderHandler = (e) => {
  e.preventDefault();

  const validOrderItems = cartItems
    .map((item) => {
      if (!item.product || typeof item.product !== "string") return null;
      return {
        name: item.name,
        price: item.price,
        image: item.images && item.images.length > 0 ? item.images[0].url : "/default-product-image.png",
        quantity: item.quantity,
        product: item.product.trim(),
        shipping: item.shipping || 0, // ✅ Make sure to include shipping
      };
    })
    .filter((item) => item !== null);

  if (validOrderItems.length === 0) {
    toast.error("No valid products in cart. Please add products.");
    return;
  }

  const order = {
    shippingInfo,
    orderItems: validOrderItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: {
      id: "COD",
      status: "Pending",
    },
  };

  dispatch(createOrder(order));
};


  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-center text-secondary">
        Payment Method
      </h2>
      <form className="space-y-4" onSubmit={placeOrderHandler}>
        <label>
          <input type="radio" name="payment" value="cod" defaultChecked /> Cash
          on Delivery
        </label>
        <div className="flex gap-4 mt-6">
          <button
            onClick={onBack}
            type="button"
            className="w-1/2 border p-3 bg-gray-50 hover:bg-primary hover:text-white"
            disabled={loading}
          >
            Back
          </button>
          <button
            type="submit"
            className="w-1/2 bg-primary/90 text-white p-3 rounded-lg hover:bg-primary disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
