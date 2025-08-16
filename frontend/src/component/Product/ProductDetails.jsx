import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <div>  
      <h3 className="text-xl font-semibold mb-2 text-primary">Product Details</h3>
      <p className="text-gray-700 leading-relaxed">{product.description || "No description available."}</p>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa voluptate quae nesciunt unde molestias. Aperiam temporibus autem, voluptates delectus dolorum laboriosam incidunt amet quia esse hic voluptas repudiandae ad sit consequuntur eveniet alias minus nam deserunt ex eaque optio repellat repellendus vero! Modi eos, delectus tempore nisi quis molestias blanditiis.</p>
      {/* Optionally display specs/features list */}
    </div>
  );
};

export default ProductDetails;
