import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (Cookies.get("token")) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };

      const url = `${import.meta.env.VITE_API_URL}/auth/login`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.ok) {
        Cookies.set("token", data.token, { expires: 7 });
        return navigate("/", { replace: true });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-20">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-4">
              Welcome Back
            </h1>

            <form onSubmit={handleSubmit}>
              <label className="label">
                <span>Email</span>
              </label>

              <input
                type="email"
                placeholder="Enter email"
                className="input input-bordered w-full"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label className="label mt-3">
                <span>Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              <button className="btn btn-primary w-full mt-6" type="submit">
                Login
              </button>
            </form>

            <p className="text-center mt-4">
              Don't have an account?
              <Link to="/signup" className="link link-primary ml-2">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="text-5xl font-bold">AI Event Automation</h1>

          <p className="py-6 text-lg opacity-80">
            Upload event posters, extract event details using AI, and add them
            directly to your Google Calendar in one click.
          </p>
        </div>
      </div>
    </div>
  );
}
