import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ToastProvider() {
  return <ToastContainer position="top-right" autoClose={3000} />;
}

// usage
// toast.success("Login successful!");
// toast.error("Invalid credentials.");
