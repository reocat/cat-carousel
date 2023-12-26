import React from "react";
import "../styles/fonts.css";
import "../styles/index.css";
import "../../../public/globals.css";
import FetchCatApiImages from "@/app/api/catapi";
import {fetchImages} from "@/app/redux/actions";
import {fetchMultipleImages} from "@/app/redux/api/nekoapi";

function Home() {

  const data = fetchMultipleImages(10);
  console.log(data)
  return (
   <FetchCatApiImages vdata = {JSON.stringify(data)}/>
  );
}

export default Home;
