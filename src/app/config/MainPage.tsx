"use client";
import "/public/globals.css";
import "../styles/fonts.css";
import "./home.css";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserIsLogged, selectUserUID } from "@/app/redux/reducers";
import { useRouter } from "next/navigation";
import { Selectors } from "./Selectors";
import { Controls } from "./Controls";
import { NewUsersRegistrationForm } from "./NewUsersRegistrationForm";
import { RootUsersList } from "./RootUsersList";

export const MainPage: React.FC<{ whitelist: string[] }> = ({ whitelist }) => {
  const UserUid = useSelector(selectUserUID);
  const isLoggedIn = useSelector(selectUserIsLogged);
  const router = useRouter();

  if (!isLoggedIn || !whitelist.includes(UserUid)) {
    router.push("/login");
  }

  if (isLoggedIn && whitelist.includes(UserUid)) {
    return (
      <div className="w-fit h-auto ml-auto mr-auto mt-40 bg-neutral-200 p-7 rounded-xl">
        <h1>Page Configurator</h1>
        <Selectors />
        <Controls />
        <div className="flex items-start justify-start mt-4 p-5 gap-4 md:flex-col">
          <NewUsersRegistrationForm />
          <RootUsersList />
        </div>
      </div>
    );
  }
};
