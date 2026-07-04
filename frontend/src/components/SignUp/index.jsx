import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData,[name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.ok) {
        alert("Signup successful! Please log in. we are navigate you to login page");
        navigate("/login");
      } else {
        console.error("Signup failed:", data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="card bg-base-100 w-full max-w-md shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center">Create Account</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full mt-4"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full mt-4"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full mt-4"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full mt-4"
              />

              <button type="submit" className="btn btn-primary w-full mt-6">
                Create Account
              </button>
            </form>

            <p className="text-center mt-4">
              Already have an account?
              <Link  to="/" className="link link-primary ml-2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
