import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './updateProduct.css';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setstock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploading, setUploading] = useState(false);

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

  // ✅ Fetch product details & handle errors
  useEffect(() => {
    // Reset update status when component mounts
    dispatch({ type: UPDATE_PRODUCT_RESET });
    
    if (!product || product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setstock(product.stock);
      setOldImages(product.images || []);
      setImagesPreview([]);
      setImages([]);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
  }, [dispatch, productId, product, error, updateError, alert]);

  // ✅ Handle update success separately - SIMPLIFIED FIX
  useEffect(() => {
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      
      // Reset the update state
      dispatch({ type: UPDATE_PRODUCT_RESET });
      
      // Navigate after a short delay
      const timer = setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
      
      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [isUpdated, alert, navigate, dispatch]);

  // Function to compress image
  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              }));
            },
            'image/jpeg',
            0.7 // Quality
          );
        };
      };
    });
  };

  const updateProductImagesChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    setUploading(true);

    try {
      const compressedFiles = await Promise.all(
        files.map(file => compressImage(file))
      );

      setImages([]);
      setImagesPreview([]);

      compressedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, file]); // Store the compressed file
          }
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      alert.error("Error processing images");
      console.error("Image compression error:", error);
    } finally {
      setUploading(false);
    }
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    // Only append new images if they exist
    if (images.length > 0) {
      images.forEach((image) => {
        myForm.append("images", image);
      });
    }
    // Don't do anything if no new images - backend will keep old ones

    dispatch(updateProduct(productId, myForm));
  };

  // Function to remove an old image
  const removeOldImage = (index) => {
    const newOldImages = [...oldImages];
    newOldImages.splice(index, 1);
    setOldImages(newOldImages);
  };

  // Function to remove a new image preview
  const removeNewImage = (index) => {
    const newImages = [...images];
    const newImagesPreview = [...imagesPreview];
    
    newImages.splice(index, 1);
    newImagesPreview.splice(index, 1);
    
    setImages(newImages);
    setImagesPreview(newImagesPreview);
  };

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

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

            <div className="form-group">
              <AttachMoneyIcon className="form-icon" />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="form-input"
              />
            </div>

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

            <div className="form-group">
              <StorageIcon className="form-icon" />
              <input
                type="number"
                placeholder="stock"
                required
                onChange={(e) => setstock(e.target.value)}
                value={stock}
                className="form-input"
              />
            </div>

            <div className="file-upload-group">
              <label className="file-upload-label">
                {uploading ? "Processing Images..." : "Upload New Product Images"}
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                  className="file-upload-input"
                  disabled={uploading}
                />
              </label>
              {uploading && <div className="upload-progress">Processing images...</div>}
            </div>

            <div className="image-preview-container">
              <h3>Current Images (click to remove)</h3>
              <div className="image-preview-grid">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <div key={index} className="image-preview-item">
                      <img
                        src={image.url ? image.url : image}
                        alt="Old Product Preview"
                        className="preview-image"
                      />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeOldImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
              
              <h3>New Images (click to remove)</h3>
              <div className="image-preview-grid">
                {imagesPreview.map((image, index) => (
                  <div key={`new-${index}`} className="image-preview-item">
                    <img
                      src={image}
                      alt="New Product Preview"
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeNewImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/admin/products")}
                className="cancel-button"
              >
                Cancel
              </Button>
              <Button
                className={`submit-button ${loading ? 'disabled-button' : ''}`}
                type="submit"
                disabled={loading || uploading}
                variant="contained"
                color="primary"
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;