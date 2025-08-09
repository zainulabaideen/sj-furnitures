import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleEditProfile = () => {
    navigate("/update-profile");
  };

  const handleResetPassword = () => {
    navigate("/resetPassword"); 
  };

  return (
    <div className="w-full min-h-screen py-10 flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-4xl w-full shadow-lg bg-white rounded-2xl px-6 md:px-12 py-10 space-y-10">
        <h2 className="text-2xl font-semibold text-secondary">My Profile</h2>

        <div className="flex flex-col items-center md:flex-row gap-10">
          <div className="flex flex-col items-center md:w-1/3 w-full gap-5">
            <img
              src={user?.avatar?.url}
              alt={user?.name}
              className="w-40 h-40 rounded-full object-cover shadow"
            />
            <button
              onClick={handleEditProfile}
              className="px-5 py-2 bg-primary text-white rounded-md hover:bg-opacity-80 transition"
            >
              Edit Profile
            </button>
          </div>

          <div className="md:w-2/3 w-full space-y-5 text-gray-700">
            <div>
              <p><strong>Full Name:</strong></p>
              <p>{user?.name}</p>
            </div>
            <div>
              <p><strong>Email:</strong></p>
              <p>{user?.email}</p>
            </div>
            <div>
              <p><strong>Phone:</strong></p>
              <p>+92 300 1234567</p>
            </div>
            <div>
              <p><strong>Address:</strong></p>
              <p>Lahore, Pakistan</p>
            </div>

            <div className="flex gap-4 mt-5">
              <button
                type="button"
                className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
              >
                My Orders
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                className="px-5 py-2 bg-primary/10 text-gray-800 rounded-md hover:bg-primary/20"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
