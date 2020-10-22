import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import {getCurrentShows,getAllExtraShowInfos,updateExtraShowInfoDB} from "../database/database";
import ShowBox from "./components/show-box/show-box";

import "./showlist-index.less";

function ShowlistMain():JSX.Element
{
  // the current shows
  const [shows,setShows]=useState<ShowInfo[]>([]);
  // the extra infos
  const [extraInfos,setExtraInfos]=useState<ExtraShowInfos>({});

  // initial load of shows
  useEffect(()=>{
    (async ()=>{
      setShows(await getCurrentShows());
      setExtraInfos(await getAllExtraShowInfos());
    })();
  },[]);

  // update the extrashow info database
  async function updateExtraShowInfo(id:number,info:ExtraShowInfo):Promise<void>
  {
    var newExtraInfos:ExtraShowInfos=await updateExtraShowInfoDB(id,info);
    setExtraInfos(newExtraInfos);
  }

  const showBoxes:JSX.Element[]=_.map(shows,(x:ShowInfo,i:number)=>{
    return <ShowBox show={x} key={i} extraInfo={extraInfos[x.id]} updatedExtraInfo={updateExtraShowInfo}/>;
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