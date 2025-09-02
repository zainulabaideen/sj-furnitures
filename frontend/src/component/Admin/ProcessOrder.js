import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Typography, Button } from "@mui/material";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import "../layout/loader/Loader.css";

const Loader = () => {
  return (
    <div className="loading">
      <div></div>
    </div>
  );
};

const ProcessOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const alert = useAlert();

  console.log("order list", order)

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders");
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError, navigate]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            order && (
              <div
                className="confirmOrderPage"
                style={{
                  display:
                    order && order.orderStatus === "Delivered"
                      ? "block"
                      : "grid",
                }}
              >
                <div>
                  {/* Shipping Info */}
                  <div className="confirmshippingArea">
                    <Typography
                      style={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      Shipping Info
                    </Typography>
                    <div className="orderDetailsContainerBox">
                      <div className="infoRow">
                        <strong>Name:</strong>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div className="infoRow">
                        <strong>Phone:</strong>
                        <span>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div className="infoRow">
                        <strong>Address:</strong>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>

                    {/* Payment */}
                    <Typography
                      style={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      Payment
                    </Typography>
                    <div className="orderDetailsContainerBox">
                      <div className="infoRow">
                        <strong>Status:</strong>
                        <span
                          className={
                            order.paymentInfo &&
                              order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </span>
                      </div>
                      <div className="infoRow">
                        <strong>Amount:</strong>
                        {/* <span>Rs {order.totalPrice && order.totalPrice}</span> */}
                        <span>Rs {order.paymentInfo?.totalPrice}</span>
                        {/* or this <span>Rs {order.totalPrice}</span>
                        or this <span>Rs {order.paymentInfo?.totalPrice || 0}</span> */}
                      </div>
                    </div>

                    {/* Order Status */}
                    <Typography
                      style={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      Order Status
                    </Typography>
                    <div className="orderDetailsContainerBox">
                      <div className="infoRow">
                        <strong>Status:</strong>
                        <span
                          className={
                            order &&
                              order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order && order.orderStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="confirmCartItems">
                    <Typography
                      style={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      Your Cart Items:
                    </Typography>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item.product} className="cartItemRow">

                            <img
                              src={item.image} 
                              alt={item.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/images/default-product.png";
                              }}
                            />

                            <Link
                              to={`/product/${item.product}`}
                              className="cartItemName"
                            >
                              {item.name}
                            </Link>
                            <span className="cartItemPrice">
                              {item.quantity} × Rs {" "}{item.price} ={" "}
                              <b>Rs{" "}{item.price * item.quantity}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Process Order Form */}
                <div
                  style={{
                    display:
                      order && order.orderStatus === "Delivered"
                        ? "none"
                        : "block",
                  }}
                >
                  <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1 style={{ fontWeight: "bold", marginBottom: "15px" }}>
                      Process Order
                    </h1>
                    <div className="formGroup">
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order &&
                          order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}
                        {order &&
                          order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                      </select>
                    </div>
                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={loading || status === ""}
                      style={{
                        marginTop: "15px",
                        fontWeight: "bold",
                        background: "#333",
                        color: "#fff",
                      }}
                    >
                      Process
                    </Button>
                  </form>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
