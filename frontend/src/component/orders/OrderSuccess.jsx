import { Link } from "react-router-dom"; 

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-green-600">🎉 Order Placed Successfully!</h1>
      <p className="mt-4">Thank you for your purchase.</p>
      <Link to="/orders" className="mt-6 px-4 py-2 bg-primary text-white rounded">
        View My Orders
      </Link>
    </div>
  )
}

export default OrderSuccess