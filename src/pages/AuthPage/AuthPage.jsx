import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../../firebaseConfig"; // تأكد من استيراد auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setError("");
    setIsSignup((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isSignup) {
          await createUserWithEmailAndPassword(auth, values.email, values.password);
          console.log("User registered successfully!");
          navigate("/home"); 
        } else {
          await signInWithEmailAndPassword(auth, values.email, values.password);
          console.log("User logged in successfully!");
          navigate("/home");
        }
      } catch (err) {
        setError(err.message);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">{isSignup ? "Signup" : "Login"}</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all"
            >
              {isSignup ? "Signup" : "Login"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
        </p>
        <button
          onClick={toggleMode}
          className="w-full py-2 mt-2 text-indigo-500 bg-transparent border border-indigo-500 rounded-md hover:bg-indigo-100 transition-all"
        >
          {isSignup ? "Login" : "Signup"}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AuthPage;
