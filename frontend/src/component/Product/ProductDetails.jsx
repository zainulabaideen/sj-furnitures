
const ProductDetails = ({ product }) => {
  return (
    <div>  
      <h3 className="text-xl font-semibold mb-2 text-primary">Product Details</h3>
      <p className="text-gray-700 leading-relaxed">{product.description || "No description available."}</p>

      {/* Optionally display specs/features list */}
    </div>
  );
};

export default ProductDetails;
