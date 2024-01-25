 
import React from 'react';
import { db } from '../../../firebaseConfig';
import {collection, getDocs} from "firebase/firestore";
import {MainPage} from "@/app/config/MainPage";

export default async function Home() {

    const getData = async () => {
        const rootUsers:string[] = [];
        const querySnapshot = await getDocs(collection(db, "rootUsers"));
        querySnapshot.forEach((doc) => {

            if (doc.data()) {
                rootUsers.push(doc.data().uid);
            }
        });
        return rootUsers

    }
    const whitelist = await getData();


    return <MainPage whitelist={whitelist}/>
}