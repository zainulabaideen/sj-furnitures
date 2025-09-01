import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaExternalLinkAlt } from "react-icons/fa";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  // Format PKR currency
  const formatPKR = (amount) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
    }).format(amount);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 px-6 py-10 mt-10">
          <div className="max-w-6xl mx-auto backdrop-blur-lg bg-white/80 rounded-3xl shadow-2xl p-8 border border-gray-200">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
              {user?.name}'s Orders
            </h1>

            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm uppercase tracking-wider">
                    <th className="py-4 px-6">Order ID</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Items Qty</th>
                    <th className="py-4 px-6">Amount (PKR)</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white/60">
                  {orders && orders.length > 0 ? (
                    orders.map((item) => {
                      const itemsQty =
                        item.orderItems?.reduce(
                          (acc, curr) => acc + curr.quantity,
                          0
                        ) || 0;

                      const totalAmount =
                        item.orderItems?.reduce(
                          (acc, curr) => acc + curr.price * curr.quantity,
                          0
                        ) || 0;

                      return (
                        <tr
                          key={item._id}
                          className="hover:bg-indigo-50/70 transition-all duration-300"
                        >
                          <td className="py-4 px-6 font-mono text-sm text-gray-700">
                            {item._id}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-4 py-1 rounded-full text-xs font-semibold border shadow-sm ${
                                item.orderStatus === "Delivered"
                                  ? "bg-green-100 text-green-700 border-green-300"
                                  : "bg-yellow-100 text-yellow-700 border-yellow-300"
                              }`}
                            >
                              {item.orderStatus || "Pending"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-700 font-medium">
                            {itemsQty}
                          </td>
                          <td className="py-4 px-6 font-bold text-indigo-700">
                            {formatPKR(totalAmount)}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Link
                              to={`/order/${item._id}`}
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                              <FaExternalLinkAlt size={14} /> View
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-6 text-center text-gray-500 italic"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
