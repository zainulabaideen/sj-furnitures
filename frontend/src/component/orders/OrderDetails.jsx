import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/loader/Loader";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <> 
      {loading ? (
        <Loader />
      ) : ( 
        <>
         
          <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h1 className="text-2xl font-bold mb-6">
              Order #{order?._id}
            </h1>  

            {/* Shipping Info */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">Shipping Info</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {order?.user?.name}</p>
                <p><span className="font-medium">Phone:</span> {order?.shippingInfo?.phoneNo}</p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {order?.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                </p>
              </div>
            </section>

            {/* Payment Info */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">Payment</h2>
              <div className="space-y-2">
                <p
                  className={`font-semibold ${
                    order?.paymentInfo?.status === "succeeded"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order?.paymentInfo?.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
                <p>  <span className="font-medium">Amount:</span> PKR
  {order?.orderItems?.reduce((total, item) => total + (item.price * item.quantity), 0)}


                </p>
              </div>
            </section>

            {/* Order Status */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">Order Status</h2>
              <p
                className={`font-semibold ${
                  order?.orderStatus === "Delivered"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order?.orderStatus}
              </p>
            </section>

            {/* Order Items */}
            <section>
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order?.orderItems?.map((item) => (
                  <div
                    key={item.product}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <span className="font-medium">
                      {item.quantity} x ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
