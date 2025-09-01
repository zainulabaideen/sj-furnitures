const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandling");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const apiFeatures = require("../utils/apiFeatures");
const cloudinary = require("../config/cloudinary");

//create product -- admin 
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_ID: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});



// Reference for Image
//  "images": [
//     {
//       "public_ID": "products/abc123",
//       "url": "https://res.cloudinary.com/dup1kn9ji/image/upload/v16912345/abc123.jpg"
//     }
//    ]

// Get all unique categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Product.distinct("category"); // returns unique category names

  res.status(200).json({
    success: true,
    categories,
  });
});


// Get products by category
exports.getProductsByCategory = catchAsyncErrors(async (req, res, next) => {
  const { category } = req.params;
 
  const escapedCategory = category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const products = await Product.find({
    category: { $regex: new RegExp(escapedCategory, "i") }
  });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
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


// update products - admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  // Handle images - only if new images are provided in the request
  if (req.files && req.files.images) {
    let images = [];
    
    // Handle single file vs array of files
    if (Array.isArray(req.files.images)) {
      images = req.files.images;
    } else {
      images = [req.files.images];
    }

    // Delete old images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_ID);
    }

    // Upload new images
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
        folder: "products",
      });
      imagesLinks.push({
        public_ID: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  } else {
    // Keep old images if no new images are provided
    // Don't modify req.body.images at all, let it keep the existing value
    delete req.body.images; // This is the key fix - don't overwrite images
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
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

// exports.createProductReview = catchAsyncErrors (async(req,res,next) => {

//    const {rating , comment , productId} = req.body;
//    const review = {
//       user:req.user._id,
//       name:req.user.name,
//       rating:Number(rating),
//       comment,
//    }

//    const product = await Product.findById(productId);

//    const isReview = product.reviews.find(rev=> rev.user.toString()===req.user._id.toString());
//    if(isReview){
//         product.review.forEach(rev => {
//          if( rev.user.toString()===req.user._id.toString())
//          rev.rating=rating,
//          rev.comment=comment
//         })
//    }else{
//       product.reviews.push(review)
//       product.numOfReviews = product.reviews.lenght
//    }
//    let avg = 0

//  product.reviews.forEach(rev=> {
//       avg+=rev.rating;
//    })
//    product.ratings = avg
//    /product.reviews.length;

//    await product.save({validateBeforeSave : false});
//  res.status(200).json({
//   success: true,
//   reviews: product.reviews || [],
// });
// })



exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  // Check if user already reviewed
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Update product ratings
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: isReviewed ? "Review updated" : "Review added",
    product,
  });
});



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


// @desc Get related products
exports.getRelatedProducts = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  let related = await Product.find({
    category: product.category,
    _id: { $ne: id }, // exclude current product
  }).limit(3);

  // fallback: latest 3 products if none found
  if (related.length === 0) {
    related = await Product.find().sort({ createAt: -1 }).limit(3);
  }

  res.status(200).json({
    success: true,
    count: related.length,
    products: related,
  });
});
