import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import {getCurrentShows} from "../database/database";
import ShowBox from "./components/show-box/show-box";

import "./showlist-index.less";

function ShowlistMain():JSX.Element
{
  // the current shows
  const [shows,setShows]=useState<ShowInfo[]>([]);

  // initial load of shows
  useEffect(()=>{
    (async ()=>{
      setShows(await getCurrentShows());
    })();
  },[]);

  const showBoxes:JSX.Element[]=_.map(shows,(x:ShowInfo,i:number)=>{
    return <ShowBox show={x} key={i}/>;
  });

  return <>
    {showBoxes}
  </>;
}

function main()
{
  ReactDOM.render(<ShowlistMain/>,document.querySelector(".main"));
}

window.onload=main;