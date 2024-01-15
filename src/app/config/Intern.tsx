"use client";
import "/public/globals.css";
import React, {useEffect, useState} from "react";
import "../styles/fonts.css";
import "./home.css";
import {useDispatch, useSelector} from "react-redux";
import {doLogout, selectApi, setColor} from "@/app/redux/reducers";
import {useRouter} from "next/navigation";
import {db} from "../../../firebaseConfig";
import {collection, doc, onSnapshot, query, setDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import { state } from "../types";


type CreateUser = (userName: string, email: string, password: string, rootState: boolean|null) => void;

const createUser:CreateUser = (userName, email, password, rootState) => {
  try {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
      const userUid = userCred.user.uid;
      console.log('rootState...',rootState)
      if (rootState) {
        setDoc(doc(db, 'rootUsers', userName.toString()), {
          uid: userUid.toString()
        })
      }
    }).catch((error) => {alert(error.message)});
  } catch (e) {
    alert(e);
  }


};

type Users = Array<{
  id:string,
  data:string
}>

export const Intern = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isRoot, setIsRoot] = useState<boolean|null>(null);
  const [users, setUsers] = useState<Users>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const apiVal = useSelector<state,state["selectedApi"]>((state) => state.selectedApi);
  const colorVal = useSelector<state,state["selectedColor"]>((state) => state.selectedColor);
  useEffect(() => {
    const q = query(collection(db, "rootUsers"));
    console.log(q)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users:Users = [];
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data().uid;
        users.push({ id, data });
      });
      setUsers(users);
    });
  }, []);

  const Users = () => {

    const newUsers:React.ReactNode[] = [];
    console.log(users)
    users.forEach((user) =>
      newUsers.push(
          <li key={user.id}>
            {" "}
            User <span className=" text-red-700 italic font-bold">
            name
          </span> is <span className="text-emerald-800">{user.id}</span>,{" "}
            <span className=" text-red-700 italic font-bold">UID</span> is{" "}
            {user.data}{" "}
          </li>
      )
    );
    return <ul className="flex flex-col justify-start gap-y-3">{newUsers}</ul>;
  };

  return (
    <div className="w-fit h-auto ml-auto mr-auto mt-40 bg-neutral-200 p-7 rounded-xl">
      <h1>Page Configurator</h1>
      <div className="form-group">
        <label htmlFor="apiSelect">Select API:</label>
        <select
          id="apiSelect"
          value={apiVal}
          onChange={(e) => {
            dispatch(selectApi(e.target.value));
          }}
        >
          <option value="">-- Select --</option>
          <option value="catapi">The Cat API</option>
          <option value="shibe">Shibe API</option>
          <option value="animality">Animality API</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="colorPicker">Select Color:</label>
        <input
          type="color"
          id="colorPicker"
          value={colorVal}
          onChange={(e) => {
            dispatch(setColor(e.target.value.toString()));
          }}
        />
      </div>
      <div
        className={"flex justify-between  md:flex-col gap-y-2 items-stretch"}
      >
        <div
          className={
            "flex flex-col items-center justify-center mx-3 p-3 rounded-md"
          }
          style={{ backgroundColor: `${colorVal}` }}
        >
          <div>Selected color:{colorVal}</div>
        </div>

        <button
          className={"rounded-md p-3 mx-3 bg-green-500"}
          onClick={() => {
            alert("Settings saved, nya~!");
            window.location.href = "/";
          }}
        >
          Save
        </button>

        <button
            className={" rounded-md p-3 mx-3 bg-default"}
            onClick={() => {
              dispatch(setColor("#ffdead"));
              alert("Default color nyappiled successfully, nya~!");
            }}
        >
          Reset background color
        </button>
        <button
            className={"rounded-md p-3 mx-3 bg-red-600"}
            onClick={() => {
              dispatch(doLogout());
              alert("Successfully logged out, nya~!");
              router.push("/");
            }}
        >
          Logout
        </button>
      </div>
      <div>
        <div className="flex items-start justify-start mt-4 p-5 gap-4 md:flex-col">
          <div className="bg-white p-8 rounded-md shadow-md md:w-full">
            <h2 className="text-2xl font-semibold mb-4">Register new user</h2>
            <div
            >
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
                    value={''}
                    onChange={(e) => setIsRoot(e.target.checked)}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"

                />
              </div>
              <button
                  onClick={() => {
                    createUser(userName, email, password, isRoot)
                  }}
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Create a new user
              </button>
            </div>
          </div>
          <div className="bg-white w-100 h-100 rounded-md">
            <div className="flex flex-col justify-start h-100  bg-white items-stretch p-2 rounded-md">
              <div className="mb-3">Root Users</div>
              <Users/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
