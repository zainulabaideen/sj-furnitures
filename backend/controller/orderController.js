const Order = require("../models/orderModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandling");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const apiFeatures = require("../utils/apiFeatures");
const Product = require("../models/productModel");
const { validate } = require("../models/userModel");
const sendEmail = require("../utils/sendEmail.js")

// create a new order 
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || "naumanalin865@gmail.com";

  // Build order items with snapshot
  const orderItemsWithDetails = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item.product).select(
        "name price images shipping"
      );
      if (!product) {
        throw new ErrorHandler(`Product not found: ${item.product}`, 404);
      }
      return {
        name: product.name,
        price: product.price,
        image: product.images[0]?.url || "/default-product.png",
        product: product._id,
        quantity: item.quantity,
        shipping: product.shipping || 0, // ✅ Make sure to include shipping charges
      };
    })
  );

  // Prices
  const itemsPrice = orderItemsWithDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tacPrice = Math.round(itemsPrice * 0.1); // 10% example
  
  // Calculate shipping charges correctly
  const shippingCharges = orderItemsWithDetails.reduce(
    (acc, item) => acc + (item.shipping || 0) * item.quantity,
    0
  );
  
  const totalPrice = itemsPrice + tacPrice + shippingCharges;

  // Save order
  const order = await Order.create({
    orderItems: orderItemsWithDetails,
    shippingInfo,
    shippingCharges, // ✅ new top-level field
    paymentInfo: {
      ...paymentInfo,
      itemsPrice,
      tacPrice,
      shippingPrice: shippingCharges, // ✅ mirror to keep compatibility
      totalPrice,
      paidAt: Date.now(),
    },
    totalPrice,
    user: req.user._id,
  });

  // Email notifications
  const user = await User.findById(req.user._id);

  const itemsList = orderItemsWithDetails
    .map(
      (item) =>
        `<li>${item.name} - ${item.quantity} x Rs.${item.price} = Rs.${
          item.price * item.quantity
        } ${item.shipping > 0 ? `(Shipping: Rs.${item.shipping * item.quantity})` : ''}</li>`
    )
    .join("");

  const htmlMessage = `
    <div style="font-family:Arial,sans-serif; padding:20px; color:#333;">
      <h2 style="color:#4CAF50;">Thank you for your order, ${user.name}!</h2>
      <p>Your order has been placed successfully. Below are your order details:</p>

      <h3>🛍 Order Summary</h3>
      <ul>${itemsList}</ul>

      <p><strong>Items Price:</strong> Rs.${itemsPrice}</p>
      <p><strong>Tax:</strong> Rs.${tacPrice}</p>
      <p><strong>Shipping Charges:</strong> Rs.${shippingCharges}</p>
      <p><strong>Total:</strong> <b style="color:#e63946;">Rs.${totalPrice}</b></p>

      <h3>📦 Shipping Information</h3>
      <p>
        ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}<br/>
        Phone: ${shippingInfo.phoneNo}
      </p>
      <p style="margin-top:20px;">We will notify you once your order is shipped.</p>
      <p style="font-size:12px;color:#888;">This is an automated email.</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: "🛒 Order Confirmation",
    message: "Your order has been placed successfully.",
    html: htmlMessage,
  });

  const adminHtmlMessage = `
    <div style="font-family:Arial,sans-serif; padding:20px; color:#333;">
      <h2 style="color:#e63946;">📢 New Order Received!</h2>
      <p>A new order has been placed by <b>${user.name}</b> (${user.email}).</p>

      <h3>🛍 Order Summary</h3>
      <ul>${itemsList}</ul>

      <p><strong>Items Price:</strong> Rs.${itemsPrice}</p>
      <p><strong>Tax:</strong> Rs.${tacPrice}</p>
      <p><strong>Shipping Charges:</strong> Rs.${shippingCharges}</p>
      <p><strong>Total:</strong> <b style="color:#4CAF50;">Rs.${totalPrice}</b></p>

      <h3>📦 Shipping Information</h3>
      <p>
        ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}<br/>
        Phone: ${shippingInfo.phoneNo}
      </p>
      <p style="margin-top:20px;">Login to admin panel to view full details.</p>
    </div>
  `;

  await sendEmail({
    email: adminEmail,
    subject: `📦 New Order Rs.${totalPrice}`,
    message: `A new order has been placed by ${user.name}, Email: ${user.email}`,
    html: adminHtmlMessage,
  });

  res.status(201).json({ success: true, order });
});





exports.getSingleOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));

  }
  res.status(200).json({
    success: true,
    order,
  })
});

// exports.getSingleOrders = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id)
//     .populate("user", "name email");

//   if (!order) {
//     return next(new ErrorHandler("Order not found with this Id", 404));
//   }

//   res.status(200).json({
//     success: true,
//     order,
//   });
// });


// get login users order
 
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })

  res.status(200).json({
    success: true,
    orders,
  })
});

//get all orders -- admin

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find()

  let totalAmount = 0;
  orders.forEach(order => {
    totalAmount += order.totalPrice;
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  })
});

//update order staus -- admin
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  
  if(!order){
    return next(new ErrorHandler("Order not found with this id" , 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("you have already delivered this order", 404));


    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    })
  }
  order.orderStatus = req.body.status;
  if (req.body.status === " Delivered") {
    order.deliveredAt = Date.now();

  }

  await order.save({validateBeforeSave: false});
  res.status(200).json({
    success: true,
    order,
  })
});


async function updateStock(id,quantity){
    const product = await Product.findById(id);
     product.Stock = product.stock - quantity;
   await   product.save({validateBeforeSave: false})
}


//delete orders -- admin

exports.deleteOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
 
  if(!order){
    return next(new ErrorHandler("Order not found with this id" , 404));
  }
  
   await order.remove();

  res.status(200).json({
    success: true,
 
  })
});
  



 