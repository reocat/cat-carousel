"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useDispatch } from "react-redux";
import { doLogin } from "@/app/redux/reducers";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [error, setError] = useState<string | null | undefined>("");
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    if (passwordOne)
      signInWithEmailAndPassword(auth, email, passwordOne)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          dispatch(doLogin(uid));
          router.push("/config");
        })
        .catch((error) => {
          setError(error.message);
        });
    event.preventDefault();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
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
                setPasswordOne(e.target.value);
                setError(null);
              }}
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="mb-4 w-full bg-red-500 p-2 rounded-md">
              Error:{error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don&apos;t have an account&#63;{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
