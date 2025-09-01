import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./Product/ProductCard";
import Loader from "./layout/loader/Loader"; 

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (retries = 2) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(`/api/products/category/${category}`);
      setProducts(data.products);
    } catch (err) {
      console.error("Error fetching category products", err);

      if (retries > 0) {
        // 🔁 Retry after 1 second
        setTimeout(() => fetchProducts(retries - 1), 1000);
      } else {
        setError("Failed to load products. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  if (loading) return <Loader />; 

  if (error)
    return (
      <div className="p-5 text-center">
        <p className="text-red-500 mb-3">{error}</p>
        <button
          onClick={() => fetchProducts()}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">{category} Products</h2>
      {products.length > 0 ? (
        <ProductCard products={products} filter="all" />
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryProducts;
