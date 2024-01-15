"use client";
import { Intern } from "@/app/config/Intern";
import React from "react";
import {useSelector } from "react-redux";
import { selectUserIsLogged, selectUserUID } from "@/app/redux/reducers";
import { useRouter } from "next/navigation";

export const MainPage: React.FC<{ whitelist: string[] }> = ({ whitelist }) => {
  const UserUid = useSelector(selectUserUID);
  const isLoggedIn = useSelector(selectUserIsLogged);
  const router = useRouter();

  if (!isLoggedIn || !whitelist.includes(UserUid)) {
    console.log(isLoggedIn);
    console.log(UserUid);
    console.log("wl", whitelist);
    router.push("/login");
  }

  if (isLoggedIn && whitelist.includes(UserUid)) {
    return <Intern />;
  }
};
