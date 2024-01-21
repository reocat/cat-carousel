"use client";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { db } from "../../../firebaseConfig";
type CreateUser = (
  userName: string,
  email: string,
  password: string,
  rootState: boolean | null
) => void;

const createUser: CreateUser = (userName, email, password, rootState) => {
  try {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const userUid = userCred.user.uid;
        console.log("rootState...", rootState);
        if (rootState) {
          setDoc(doc(db, "rootUsers", userName.toString()), {
            uid: userUid.toString(),
          });
        }
        alert('new user created')
      })
      .catch((error) => {
        alert(error.message);
      });
  } catch (e) {
    alert(e);
  }
};

export const NewUsersRegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isRoot, setIsRoot] = useState<boolean | null>(null);
  return (
    <div className="bg-white p-8 rounded-md shadow-md md:w-full">
      <h2 className="text-2xl font-semibold mb-4">Register new user</h2>
      <div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            User name
          </label>
          <input
            type="text"
            id="name"
            name="user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4 flex justify-center ">
          <label
            htmlFor="root"
            className="block text-sm font-medium text-gray-600"
          >
            Root
          </label>
          <input
            type="checkbox"
            id="root"
            name="root"
            value={""}
            onChange={(e) => setIsRoot(e.target.checked)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => {
            createUser(userName, email, password, isRoot);
          }}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create a new user
        </button>
      </div>
    </div>
  );
};
