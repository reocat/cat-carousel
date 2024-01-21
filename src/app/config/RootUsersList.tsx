import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, onSnapshot, query } from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";

type Users = Array<{
  id: string;
  data: string;
}>;

const Users:React.FC<{setLoading:(state:boolean)=>void}> = ({ setLoading }) => {
  const [users, setUsers] = useState<Users>([]);
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "rootUsers"));
    console.log(q);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users: Users = [];
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data().uid;
        users.push({ id, data });
      });
      setLoading(false);
      setUsers(users);
    });
  }, [setLoading]);

  const newUsers: React.ReactNode[] = [];
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

export const RootUsersList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col justify-start h-100  bg-white items-stretch p-2 rounded-md grow">
        <div className="mb-3 w-full">Root Users</div>
        {loading && (
          <div className="w-full flex flex-col justify-start h-100 bg-white items-stretch p-2 rounded-md justify">
            <Skeleton className="w-full" animation={'wave'}/>
            <Skeleton className="w-full" /> 
            <Skeleton className="w-full" />
          </div>
        )}
        <Users setLoading={setLoading} />
      </div>
    </>
  );
};
