import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, } from "react-router-dom";
import { loadUser, updateProfile } from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Loader from "../layout/loader/Loader";
import { clearErrors } from "../../actions/productAction"

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading, isAuthenticated } = useSelector((state) => state.profile);

  const [redirectAfterUpdate, setRedirectAfterUpdate] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect only when user has been updated and is authenticated




  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setImage(user.avatar.url);

    }

    if (isUpdated) {
      dispatch(loadUser());
      toast.success("Updated  Successful!");
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }


    if (error) {
      toast.error(error);
    }
  }, [isUpdated, error, user, navigate]);



  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "+92 300 1234567",
    address: "Lahore, Pakistan",
  });

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [tempImage, setTempImage] = useState(image);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };



  const handleSave = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", formData.fullName);
    myForm.set("email", formData.email);

    // Only add the file if a new image was selected
    const fileInput = document.getElementById("imageUpload");
    if (fileInput.files.length > 0) {
      myForm.set("avatar", fileInput.files[0]);
    }

    dispatch(updateProfile(myForm));
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "+92 300 1234567",
      address: "Lahore, Pakistan",
    });
    setImage(tempImage);
    navigate("/account");
  };

  return (
    <Fragment>
      {
        loading ? <Loader /> : <div className="w-full min-h-screen py-10 flex flex-col items-center justify-center bg-gray-50 px-4">
          <div className="max-w-4xl w-full shadow-lg bg-white rounded-2xl px-6 md:px-12 py-10 space-y-10">
            <h2 className="text-2xl font-semibold text-secondary">Update Profile</h2>

            <div className="flex flex-col items-center md:flex-row gap-10">
              <div className="flex flex-col items-center md:w-1/3 w-full gap-5">
                <img
                  src={user.avatar.url}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover shadow"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 cursor-pointer"
                >
                  Upload Image
                </label>
              </div>

              <form className="md:w-2/3 w-full space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700">Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="p-3 bg-gray-100 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-3 bg-gray-100 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="p-3 bg-gray-100 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="p-3 bg-gray-100 outline-none"
                  />
                </div>

                <div className="flex gap-4 mt-5">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-5 py-2 bg-primary/10 text-gray-800 rounded-md hover:bg-primary/20"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
};

export default UpdateProfile;
