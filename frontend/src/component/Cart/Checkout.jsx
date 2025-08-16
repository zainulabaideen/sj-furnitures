import React, { useState , Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { createOrder } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";
import img from "../../assets/p1_img.jpg"
import { Country, State } from "country-state-city";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Checkout.css";

import { Link  } from "react-router-dom";
import { Typography } from "@material-ui/core";


const Checkout = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const { shippingInfo } = useSelector((state) => state.cart);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Step Indicator */}
      <nav aria-label="Checkout Steps" className="flex justify-between items-center mb-8">
        <p className={`flex-1 text-center ${step === 1 ? "text-primary" : "text-gray-400"}`}>
          🚚 Shipping
        </p>
        <p className={`flex-1 text-center ${step === 2 ? "text-primary" : "text-gray-400"}`}>
          ✅ Confirm Order
        </p>
        <p className={`flex-1 text-center ${step === 3 ? "text-primary" : "text-gray-400"}`}>
          💳 Payment
        </p>
      </nav>

      {/* Step Content */}
      {step === 1 && <ShippingDetails onContinue={nextStep} />}
      {step === 2 && <OrderConfirmation onBack={prevStep} onContinue={nextStep} />}
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

    if (phoneNo.length < 11 || phoneNo.length > 11) {
      toast.error("Phone Number should be 11 digits Long");
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
        <h2 id="shipping-title" className="text-xl font-semibold mb-4 text-center text-secondary">
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

  

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;


  const totalPrice = subtotal  + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    onContinue();

  };

  return (
     <Fragment>

   
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    {/* <img src={item.image} alt="Product" /> */}
                    <img src={img} alt="Product" />

                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
             
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// ---------------- Payment Step ----------------
const PaymentMethod = ({ onBack }) => {
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
   const placeOrderHandler = (e) => {
    e.preventDefault();

    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
      paymentInfo: {
        id: "COD", // since it's cash on delivery
        status: "Pending",
      },
    };

    dispatch(createOrder(order));
    navigate("/order/success");
  };
  return (
    // <section>
    //   <h2 className="text-xl font-semibold mb-4 text-center text-secondary">
    //     Payment Method
    //   </h2>
    //   <form className="space-y-4">
    //     {/* <label>
    //       <input type="radio" name="payment" value="card" /> Credit/Debit Card
    //     </label>
    //     <label>
    //       <input type="radio" name="payment" value="paypal" /> PayPal
    //     </label> */}
    //     <label>
    //       <input type="radio" name="payment" value="cod" /> Cash on Delivery
    //     </label>
    //     <div className="flex gap-4 mt-6">
    //       <button onClick={onBack} type="button" className="w-1/2 border p-3 bg-gray-50 hover:bg-primary hover:text-white">
    //         Back
    //       </button>
    //       <button type="submit" className="w-1/2 bg-primary/90 text-white p-3 rounded-sm hover:bg-primary">
    //         Place Order
    //       </button>
    //     </div>
    //   </form>
    // </section>
      <section>
      <h2 className="text-xl font-semibold mb-4 text-center text-secondary">
        Payment Method
      </h2>
      <form className="space-y-4" onSubmit={placeOrderHandler}>
        <label>
          <input type="radio" name="payment" value="cod" defaultChecked /> Cash on Delivery
        </label>
        <div className="flex gap-4 mt-6">
          <button
            onClick={onBack}
            type="button"
            className="w-1/2 border p-3 bg-gray-50 hover:bg-primary hover:text-white"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-1/2 bg-primary/90 text-white p-3 rounded-sm hover:bg-primary"
          >
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
