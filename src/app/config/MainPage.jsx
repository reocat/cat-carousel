'use client'
import {Intern} from "@/app/config/Intern";
import {getAuth} from "firebase/auth";
import {app} from "../../../firebaseConfig";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectUserIsLogged, selectUserUID} from "@/app/redux/reducers";
import {useRouter} from "next/navigation";





export const MainPage = ({whitelist}) => {
    const UserUid = useSelector(selectUserUID);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((selectUserIsLogged));
    const router = useRouter();


    if (!isLoggedIn || !whitelist.includes(UserUid)) {
        console.log(isLoggedIn);
        console.log(UserUid)
        console.log('wl',whitelist)
        router.push('/login')




    }
    if (isLoggedIn &&whitelist.includes(UserUid)) {
        return (
            <Intern/>
        )
    }

}