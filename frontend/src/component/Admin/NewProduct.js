import { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [shipping, setShipping] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setstock] = useState();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // ✅ category suggestion states
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        setAllCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);

    if (value.trim() === "") {
      setFilteredCategories(allCategories);
    } else {
      setFilteredCategories(
        allCategories.filter((c) =>
          c.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  // ✅ error/success handling
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("✅ Product Created Successfully!");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  // const createProductSubmitHandler = (e) => {
  //   e.preventDefault();

  //   const myForm = new FormData();
  //   myForm.set("name", name);
  //   myForm.set("price", price);
  //   myForm.set("description", description);
  //   myForm.set("category", category);
  //   myForm.set("stock", stock);
  //   myForm.set("shipping", shipping);

  //   images.forEach((image) => {
  //     myForm.append("images", image);
  //   });

  //   dispatch(createProduct(myForm));
  // };

  const createProductSubmitHandler = (e) => {
  e.preventDefault();

  const productData = {
    name,
    price,
    description,
    category,
    stock,
    shipping,
    images, // already base64 strings
  };

  dispatch(createProduct(productData));
};

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            {/* Product Name */}
            <div className="form-group">
              <SpellcheckIcon className="form-icon" />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Price */}
            <div className="form-group">
              <AttachMoneyIcon className="form-icon" />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Shipping */}
            <div className="form-group">
              <AttachMoneyIcon className="form-icon" />
              <input
                type="number"
                placeholder="Shipping Cost"
                required
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <DescriptionIcon className="form-icon" />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
              ></textarea>
            </div>

            {/* Category with suggestions */}
            <div className="form-group" style={{ position: "relative" }}>
              <AccountTreeIcon className="form-icon" />
              <input
                type="text"
                placeholder="Product Category"
                required
                value={category}
                onChange={handleCategoryChange}
                onFocus={() => {
                  setShowSuggestions(true);
                  setFilteredCategories(allCategories);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="form-input"
              />

              {showSuggestions && filteredCategories.length > 0 && (
                <ul className="suggestion-list">
                  {filteredCategories.map((cate, index) => (
                    <li
                      key={index}
                      onMouseDown={() => {
                        setCategory(cate);
                        setShowSuggestions(false);
                      }}
                      className="suggestion-item"
                    >
                      {cate}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* stock */}
            <div className="form-group">
              <StorageIcon className="form-icon" />
              <input
                type="number"
                placeholder="stock"
                required
                value={stock}
                onChange={(e) => setstock(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Images */}
            <div className="file-upload-group">
              <label className="file-upload-label">
                Upload Product Images
                <input
                  type="file"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                  className="file-upload-input"
                />
              </label>
            </div>

            <div className="image-preview-container">
              {imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Preview"
                  className="preview-image"
                />
              ))}
            </div>

            {/* Submit */}
            <Button className="submit-button" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
