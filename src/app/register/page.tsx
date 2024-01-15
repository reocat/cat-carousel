"use client";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
// Import necessary React, Tailwind CSS classes, and React Router
import React, { useState } from "react";
import Link from "next/link";
import { auth } from "../../../firebaseConfig";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null | undefined>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(auth, email, passwordOne)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((authUser) => {
          alert("user created successfully");
          router.push("/config");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message);
        });
    else setError("Password do not match");
    event.preventDefault();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setError(null);
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              onChange={(e) => {
                setError(null);
                setPasswordOne(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              onChange={(e) => {
                setError(null);
                setPasswordTwo(e.target.value);
              }}
              type="password"
              id="password2"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Confirm your password"
            />
          </div>
          {error  && <div className="mb-4 w-full bg-red-500 p-2 rounded-md">Error:{error}</div>}

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
