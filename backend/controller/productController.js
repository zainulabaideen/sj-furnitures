const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandling");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const apiFeatures = require("../utils/apiFeatures");

//create product -- admin 
exports.createProduct = catchAsyncErrors(async (req,res,next) => {

    req.body.user = req.user.id;
   const product = await Product.create(req.body);
    res.status(201).json({
       success:true,
       product
    })
});


//get all products


exports.getAllProducts = catchAsyncErrors( async (req,res,next) => {

   // return next(new ErrorHandler("this is my temp error" , 500))

   const resultPerPage = 8;
   const productsCount = await Product.countDocuments();

   const apiFeature = new apiFeatures(Product.find(),req.query)
   .search().filter().pagination(resultPerPage);
   const products = await apiFeature.query;
   
    res.status(200).json({
       success:true,
       products,
       productsCount,
       resultPerPage
    })
   }); 

//update products - admin 

exports.updateProduct = catchAsyncErrors(async(req,res,next) => {
   let product = await Product.findById(req.params.id);
   if(!product){
      return res.status(500).json({
          success : false,
          message: "product not found"
      })
   }

   product = await Product.findByIdAndUpdate(req.params.id,req.body ,{
      new:true,
      runValidators: true,
      useFindAndModify: false,
   })

   res.status(200).json({
      success: true,
      product
   })
});


//delete product

exports.deleteProduct = catchAsyncErrors(async(req , res,next) => {
   const product = await Product.findById(req.params.id);

   if(!product){
      res.status(500).json({
         success: false,
         message : "product not found"
      })
   }

   await product.deleteOne();


  res.status(200).json({
   success: true,
   message: " product successfully delted"
})

})

//single product

exports.getProductDetails = catchAsyncErrors(async (req,res,next)=>{
   const product = await Product.findById(req.params.id);
   if(!product){
     return next(new ErrorHandler(  "Product not found  " ,404 ))
   }

   res.status(200).json({
      success: true,
      product
   })
 
});


//create new reviews or update the reviews

exports.createProductReview = catchAsyncErrors (async(req,res,next) => {

   const {rating , comment , productId} = req.body;
   const review = {
      user:req.user._id,
      name:req.user.name,
      rating:Number(rating),
      comment,
   }

   const product = await Product.findById(productId);

   const isReview = product.reviews.find(rev=> rev.user.toString()===req.user._id.toString());
   if(isReview){
        product.review.forEach(rev => {
         if( rev.user.toString()===req.user._id.toString())
         rev.rating=rating,
         rev.comment=comment
        })
   }else{
      product.reviews.push(review)
      product.numOfReviews = product.reviews.lenght
   }
   let avg = 0

 product.reviews.forEach(rev=> {
      avg+=rev.rating;
   })
   product.ratings = avg
   /product.reviews.length;

   await product.save({validateBeforeSave : false});
   res.status(200).json({
      success:true,
   })
})

//get All reviews of a product 

exports.getProductReviews = catchAsyncErrors(async(req,res,next) => {
   const product = await Product.findById(req.query.id);
   if(!product){
      return next (new ErrorHandler("Product not found" , 404));

   }
   res.status(200).json({
      success:true,
      reviews:product.reviews,
   })
})


//delet reviews

exports.deleteReviews = catchAsyncErrors(async(req,res,next) => {
   const product = await Product.findById(req.query.productId);
    if(!product){
      return next (new ErrorHandler("Product not found" , 404));

   }

   const review = product.reviews.filter(rev=> rev._id.toString() !== req.query.productId.toString());

 let avg = 0

 reviews.forEach(rev=> {
      avg+=rev.rating;
   })
   ratings = avg
   /reviews.length;
   const numOfReviews = reviews.length;
   await Product.findByIdAndUpdate(req.query.productId,{reviews,rating,numOfReviews},{new:true,runValidators:true , useFindAndModify: false})

     res.status(200).json({
      success:true,
    
   })

})

