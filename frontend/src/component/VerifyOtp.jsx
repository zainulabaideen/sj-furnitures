// In VerifyOtp.js
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get email from location state or prompt user
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(60);
    const [loading, setLoading] = useState(false);

    const { isAuthenticated, user } = useSelector((state) => state.user);

    // ✅ Set email from location state on component mount
    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    // ✅ Redirect if user is already authenticated and verified
    useEffect(() => {
        if (isAuthenticated && user?.isVerified) {
            navigate("/account");
        }
    }, [isAuthenticated, user, navigate]);

    // ✅ Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }
    }, [timer]);

    // ✅ Verify OTP
    const handleVerify = async (e) => {
        e.preventDefault();
        if (!email || !otp) {
            toast.error("Email and OTP required!");
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post("/api/verify-otp", { email, otp });
            toast.success("Your account is verified. You are now logged in!", {
                autoClose: 5000,
            });
            navigate("/account");
        } catch (error) {
            toast.error(error.response?.data?.message || "OTP verification failed");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Resend OTP
    const handleResend = async () => {
        if (!email) {
            toast.error("Email is required to resend OTP!");
            return;
        }

        try {
            const { data } = await axios.post("/api/resend-otp", { email });
            toast.success(data.message);
            setTimer(60);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>

                <p className="text-sm text-gray-600 mb-4">
                    Enter the OTP sent to your email
                </p>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                    placeholder="Enter your email"
                    required
                />

                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full mb-3 p-2 border rounded"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="6"
                />

                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="bg-primary text-white px-4 py-2 rounded w-full mb-2 disabled:opacity-50"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                    onClick={handleResend}
                    className="bg-gray-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
                    disabled={timer > 0}
                >
                    {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </button>

                <p className="mt-4 text-sm">
                    Didn't receive the OTP? Check your spam folder or try resending.
                </p>
            </div>
        </div>
    );
};

export default VerifyOtp;