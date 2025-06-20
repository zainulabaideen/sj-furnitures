const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandling");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const apiFeatures = require("../utils/apiFeatures");
const Product = require("../models/productModel");
const { validate } = require("../models/userModel");

// create a new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    tacPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  const order = await Order.create({
    orderItems,
    paymentInfo,
    itemsPrice,
    tacPrice,
    shippingInfo,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  })

})


// get single order

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




 